// src/pages/Donate.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useCreateDonationMutation,
  useVerifyDonationMutation,
} from "../store/PrayerRequestApi";
import { toast } from "react-toastify";

const Donate = () => {
  const location = useLocation();

  const [amount, setAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "General Donation",
  });

  // വെരിഫിക്കേഷൻ സമയത്ത് ബട്ടൺ ഡിസേബിൾ ചെയ്യാൻ ഒരു ലോക്കൽ സ്റ്റേറ്റ്
  const [isVerifying, setIsVerifying] = useState(false);

  const [createDonation, { isLoading: isCreatingOrder }] =
    useCreateDonationMutation();
  const [verifyDonation] = useVerifyDonationMutation();

  const quickAmounts = ["500", "1000", "2000", "5000"];

  // 💡 Sponsor പേജിൽ നിന്നോ മറ്റോ സ്റ്റേറ്റ് വന്നിട്ടുണ്ടെങ്കിൽ അത് ഓട്ടോമാറ്റിക് ആയി ഫോമിലേക്ക് സെറ്റ് ചെയ്യുന്നു.
  // ഡയറക്ട് വരുന്നവർക്ക് ഡിഫോൾട്ട് വാല്യൂസ് കൃത്യമായി നിലനിൽക്കും.
  useEffect(() => {
    if (location.state) {
      if (location.state.amount) {
        setAmount(location.state.amount);
      }
      if (location.state.purpose) {
        setFormData((prev) => ({
          ...prev,
          purpose: location.state.purpose,
        }));
      }
      // ലോഡ് ചെയ്തുകഴിഞ്ഞാൽ ഹിസ്റ്ററി സ്റ്റേറ്റ് ക്ലിയർ ചെയ്യുന്നു (റീലോഡ് ചെയ്യുമ്പോൾ പഴയ വാല്യൂസ് വരാതിരിക്കാൻ)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDonateSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("ദയവായി സാധുവായ ഒരു തുക രേഖപ്പെടുത്തുക!");
      return;
    }
    if (!formData.name || !formData.phone) {
      toast.error("പേരും ഫോൺ നമ്പറും നിർബന്ധമാണ്!");
      return;
    }

    try {
      const donationPayload = { ...formData, amount: Number(amount) };

      // 1. ബാക്ക്എൻഡിൽ നിന്ന് Razorpay KEY ഫെച്ച് ചെയ്യുന്നു 🔑
      const keyRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/razorpay-key`,
      );
      const { key } = await keyRes.json();

      // 2. ബാക്ക്എൻഡിലെ 'createDonationOrder' വഴി ഓർഡർ ഐഡി വാങ്ങുന്നു 📦
      const orderResponse = await createDonation(donationPayload).unwrap();

      // 3. Razorpay ഒഫീഷ്യൽ ഓപ്ഷൻസ് സെറ്റ് ചെയ്യുന്നു
      const options = {
        key: key,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "Divine Ministries",
        description: "Thank you for your donation",
        order_id: orderResponse.order.id,

        // പേയ്‌മെന്റ് സക്സസ് ആയാൽ Razorpay ഈ ഫങ്ഷൻ ട്രിഗർ ചെയ്യും
        handler: async function (response) {
          setIsVerifying(true); // ലോഡിങ് സ്റ്റാർട്ട് ചെയ്യുന്നു
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            // 4. ബാക്ക്എൻഡ് വെരിഫിക്കേഷൻ API കോൾ ചെയ്യുന്നു 🔄
            const verificationResult =
              await verifyDonation(verifyPayload).unwrap();

            if (verificationResult.success) {
              toast.success("✨ സംഭാവന വിജയകരമായി പൂർത്തിയായി. നന്ദി!");
              setAmount("");
              setFormData({
                name: "",
                email: "",
                phone: "",
                purpose: "General Donation",
              });
            }
          } catch (err) {
            console.error("Verification API Error:", err);
            toast.error(
              err?.data?.error || "പേയ്‌മെന്റ് വെരിഫിക്കേഷൻ പരാജയപ്പെട്ടു!",
            );
          } finally {
            setIsVerifying(false); // ലോഡിങ് അവസാനിപ്പിക്കുന്നു
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#b30021",
        },
        modal: {
          // യൂസർ പേയ്‌മെന്റ് വിൻഡോ വെറുതെ ക്ലോസ് ചെയ്താൽ ലോഡിങ് മാറ്റാൻ
          onDismiss: function () {
            setIsVerifying(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Donation Error:", error);
      toast.error(error?.data?.error || "പ്രക്രിയ പൂർത്തിയാക്കാൻ സാധിച്ചില്ല!");
    }
  };

  // രണ്ട് ലോഡിങ് സ്റ്റേറ്റുകളും ഒന്നിച്ച് ചെക്ക് ചെയ്യുന്നു
  const isActionLoading = isCreatingOrder || isVerifying;

  return (
    <div className="py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        {/* ഇടതുവശം: ബാങ്ക് വിവരങ്ങളും ക്യുആർ കോഡും */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#050522] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-2xl"></div>
            <span className="text-red-500 font-bold text-xs tracking-widest uppercase">
              Support Us
            </span>
            <h2 className="text-3xl font-extrabold mt-2 tracking-tight">
              Divine needs your hand!
            </h2>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              ദൈവരാജ്യത്തിന്റെ വ്യാപ്തിക്കായും പാവപ്പെട്ടവരുടെ ഉന്നമനത്തിക്കായും
              നിങ്ങളുടെ കൈത്താങ്ങ് ഞങ്ങൾ പ്രതീക്ഷിക്കുന്നു.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-md space-y-4">
            <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
              🏦 <span className="text-base">Direct Bank Transfer</span>
            </h3>
            <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
                <span>Account Name:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  DIVINE MINISTRIES TRUST
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
                <span>Account No:</span>
                <span className="font-semibold text-slate-900 dark:text-white tracking-wider">
                  9210100XXXX7890
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
                <span>Bank:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  Axis Bank Ltd
                </span>
              </div>
              <div className="flex justify-between">
                <span>IFSC Code:</span>
                <span className="font-semibold text-red-600 dark:text-red-400 tracking-wider">
                  UTIB0001234
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-slate-950/40 dark:to-slate-950/80 border border-red-100 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                Scan & Pay via UPI
              </p>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
                divine@axisbank
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-200 dark:border-slate-700">
              <span className="text-3xl">📱</span>
            </div>
          </div>
        </div>

        {/* വലതുവശം: ഡൊണേഷൻ ഫോം */}
        <div className="md:col-span-7 bg-white dark:bg-slate-950/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-xl">
          <form onSubmit={handleDonateSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-200">
                Select or Enter Amount (₹) *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                      amount === amt
                        ? "bg-[#b30021] text-white border-transparent shadow-md"
                        : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-800 hover:border-red-400"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Other Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl font-bold text-lg focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
                />
              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-900" />

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                Donor Details
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Purpose of Donation
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all cursor-pointer"
                  >
                    <option value="General Donation">
                      General Donation (പൊതുവായ സംഭാവന)
                    </option>
                    <option value="Poor Support">
                      Poor Support (പാവപ്പെട്ടവർക്കുള്ള സഹായം)
                    </option>
                    <option value="Ministry Support">
                      Ministry Support (സുവിശേഷ പ്രവർത്തനം)
                    </option>
                    <option value="Building Fund">
                      Building Fund (കെട്ടിട നിർമ്മാണം)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isActionLoading}
                className="w-full bg-[#b30021] hover:bg-red-700 text-white font-bold text-base py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreatingOrder && "Processing..."}
                {isVerifying && "Verifying Payment..."}
                {!isActionLoading && `Proceed to Pay ₹${amount || "0"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;

// import React, { useState } from "react";
// // 💡 verifyDonation ഹുക്ക് കൂടി ഇമ്പോർട്ട് ചെയ്യുന്നു
// import {
//   useCreateDonationMutation,
//   useVerifyDonationMutation,
// } from "../store/PrayerRequestApi";
// import { toast } from "react-toastify";

// const Donate = () => {
//   const [amount, setAmount] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     purpose: "General Donation",
//   });

//   // 💡 വെരിഫിക്കേഷൻ സമയത്ത് ബട്ടൺ ഡിസേബിൾ ചെയ്യാൻ ഒരു ലോക്കൽ സ്റ്റേറ്റ്
//   const [isVerifying, setIsVerifying] = useState(false);

//   const [createDonation, { isLoading: isCreatingOrder }] =
//     useCreateDonationMutation();
//   const [verifyDonation] = useVerifyDonationMutation(); // 💡 വെരിഫിക്കേഷൻ ഹുക്ക് ആക്റ്റീവ് ആക്കി

//   const quickAmounts = ["500", "1000", "2000", "5000"];

//   const handleDonateSubmit = async (e) => {
//     e.preventDefault();

//     if (!amount || amount <= 0) {
//       toast.error("ദയവായി സാധുവായ ഒരു തുക രേഖപ്പെടുത്തുക!");
//       return;
//     }
//     if (!formData.name || !formData.phone) {
//       toast.error("പേരും ഫോൺ നമ്പറും നിർബന്ധമാണ്!");
//       return;
//     }

//     try {
//       const donationPayload = { ...formData, amount: Number(amount) };

//       // 1. ബാക്ക്എൻഡിൽ നിന്ന് Razorpay KEY ഫെച്ച് ചെയ്യുന്നു 🔑
//       const keyRes = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/razorpay-key`,
//       );
//       const { key } = await keyRes.json();

//       // 2. ബാക്ക്എൻഡിലെ 'createDonationOrder' വഴി ഓർഡർ ഐഡി വാങ്ങുന്നു 📦
//       const orderResponse = await createDonation(donationPayload).unwrap();

//       // 3. Razorpay ഒഫീഷ്യൽ ഓപ്ഷൻസ് സെറ്റ് ചെയ്യുന്നു
//       const options = {
//         key: key,
//         amount: orderResponse.order.amount,
//         currency: orderResponse.order.currency,
//         name: "Divine Ministries",
//         description: "Thank you for your donation",
//         order_id: orderResponse.order.id,

//         // 💡 പേയ്‌മെന്റ് സക്സസ് ആയാൽ Razorpay ഈ ഫങ്ഷൻ ട്രിഗർ ചെയ്യും
//         handler: async function (response) {
//           setIsVerifying(true); // ലോഡിങ് സ്റ്റാർട്ട് ചെയ്യുന്നു
//           try {
//             const verifyPayload = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             // 4. ബാക്ക്എൻഡ് വെരിഫിക്കേഷൻ API കോൾ ചെയ്യുന്നു 🔄
//             const verificationResult =
//               await verifyDonation(verifyPayload).unwrap();

//             if (verificationResult.success) {
//               toast.success("✨ സംഭാവന വിജയകരമായി പൂർത്തിയായി. നന്ദി!");
//               setAmount("");
//               setFormData({
//                 name: "",
//                 email: "",
//                 phone: "",
//                 purpose: "General Donation",
//               });
//             }
//           } catch (err) {
//             console.error("Verification API Error:", err);
//             toast.error(
//               err?.data?.error || "പേയ്‌മെന്റ് വെരിഫിക്കേഷൻ പരാജയപ്പെട്ടു!",
//             );
//           } finally {
//             setIsVerifying(false); // ലോഡിങ് അവസാനിപ്പിക്കുന്നു
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: {
//           color: "#b30021",
//         },
//         modal: {
//           // യൂസർ പേയ്‌മെന്റ് വിൻഡോ വെറുതെ ക്ലോസ് ചെയ്താൽ ലോഡിങ് മാറ്റാൻ
//           onDismiss: function () {
//             setIsVerifying(false);
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Donation Error:", error);
//       toast.error(error?.data?.error || "പ്രക്രിയ പൂർത്തിയാക്കാൻ സാധിച്ചില്ല!");
//     }
//   };

//   // രണ്ട് ലോഡിങ് സ്റ്റേറ്റുകളും ഒന്നിച്ച് ചെക്ക് ചെയ്യുന്നു
//   const isActionLoading = isCreatingOrder || isVerifying;

//   return (
//     <div className="py-12 px-4 transition-colors duration-300">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
//         {/* ഇടതുവശം: ബാങ്ക് വിവരങ്ങളും ക്യുആർ കോഡും */}
//         <div className="md:col-span-5 space-y-6">
//           <div className="bg-[#050522] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-2xl"></div>
//             <span className="text-red-500 font-bold text-xs tracking-widest uppercase">
//               Support Us
//             </span>
//             <h2 className="text-3xl font-extrabold mt-2 tracking-tight">
//               Divine needs your hand!
//             </h2>
//             <p className="text-gray-300 text-sm mt-4 leading-relaxed">
//               ദൈവരാജ്യത്തിന്റെ വ്യാപ്തിക്കായും പാവപ്പെട്ടവരുടെ ഉന്നമനത്തിക്കായും
//               നിങ്ങളുടെ കൈത്താങ്ങ് ഞങ്ങൾ പ്രതീക്ഷിക്കുന്നു.
//             </p>
//           </div>

//           <div className="bg-white dark:bg-slate-950/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-md space-y-4">
//             <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
//               🏦 <span className="text-base">Direct Bank Transfer</span>
//             </h3>
//             <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
//               <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
//                 <span>Account Name:</span>
//                 <span className="font-semibold text-slate-900 dark:text-white">
//                   DIVINE MINISTRIES TRUST
//                 </span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
//                 <span>Account No:</span>
//                 <span className="font-semibold text-slate-900 dark:text-white tracking-wider">
//                   9210100XXXX7890
//                 </span>
//               </div>
//               <div className="flex justify-between border-b border-gray-100 dark:border-slate-900 pb-1.5">
//                 <span>Bank:</span>
//                 <span className="font-semibold text-slate-900 dark:text-white">
//                   Axis Bank Ltd
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>IFSC Code:</span>
//                 <span className="font-semibold text-red-600 dark:text-red-400 tracking-wider">
//                   UTIB0001234
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-slate-950/40 dark:to-slate-950/80 border border-red-100 dark:border-slate-800 p-5 rounded-3xl flex items-center justify-between shadow-sm">
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
//                 Scan & Pay via UPI
//               </p>
//               <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
//                 divine@axisbank
//               </p>
//             </div>
//             <div className="bg-white p-2 rounded-xl border border-gray-200 dark:border-slate-700">
//               <span className="text-3xl">📱</span>
//             </div>
//           </div>
//         </div>

//         {/* വലതുവശം: ഡൊണേഷൻ ഫോം */}
//         <div className="md:col-span-7 bg-white dark:bg-slate-950/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-xl">
//           <form onSubmit={handleDonateSubmit} className="space-y-6">
//             <div className="space-y-3">
//               <label className="text-sm font-bold text-gray-700 dark:text-gray-200">
//                 Select or Enter Amount (₹) *
//               </label>
//               <div className="grid grid-cols-4 gap-3">
//                 {quickAmounts.map((amt) => (
//                   <button
//                     key={amt}
//                     type="button"
//                     onClick={() => setAmount(amt)}
//                     className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
//                       amount === amt
//                         ? "bg-[#b30021] text-white border-transparent shadow-md"
//                         : "bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-800 hover:border-red-400"
//                     }`}
//                   >
//                     ₹{amt}
//                   </button>
//                 ))}
//               </div>

//               <div className="relative mt-2">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
//                   ₹
//                 </span>
//                 <input
//                   type="number"
//                   placeholder="Other Amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl font-bold text-lg focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
//                 />
//               </div>
//             </div>

//             <hr className="border-gray-100 dark:border-slate-900" />

//             <div className="space-y-4">
//               <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
//                 Donor Details
//               </h4>

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                     Your Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     placeholder="9876543210"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="name@example.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
//                     Purpose of Donation
//                   </label>
//                   <select
//                     value={formData.purpose}
//                     onChange={(e) =>
//                       setFormData({ ...formData, purpose: e.target.value })
//                     }
//                     className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-white transition-all cursor-pointer"
//                   >
//                     <option value="General Donation">
//                       General Donation (പൊതുവായ സംഭാവന)
//                     </option>
//                     <option value="Poor Support">
//                       Poor Support (പാവപ്പെട്ടവർക്കുള്ള സഹായം)
//                     </option>
//                     <option value="Ministry Support">
//                       Ministry Support (സുവിശേഷ പ്രവർത്തനം)
//                     </option>
//                     <option value="Building Fund">
//                       Building Fund (കെട്ടിട നിർമ്മാണം)
//                     </option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={isActionLoading}
//                 className="w-full bg-[#b30021] hover:bg-red-700 text-white font-bold text-base py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isCreatingOrder && "Processing..."}
//                 {isVerifying && "Verifying Payment..."}
//                 {!isActionLoading && `Proceed to Pay ₹${amount || "0"}`}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donate;
