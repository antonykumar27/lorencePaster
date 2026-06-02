import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ഇംപോർട്ട് ചെയ്ത് ഉറപ്പുവരുത്തുക
import { useAuth } from "../context/AuthContext";
import { useGetDonationHistoryQuery } from "../store/PrayerRequestApi";

const DonationDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDonationHistoryQuery();
  // 🛡️ Admin Security Check: അഡ്മിൻ അല്ലെങ്കിൽ മാത്രം ഹോം പേജിലേക്ക് വിടുക
  useEffect(() => {
    // യൂസർ ലോഗിൻ ചെയ്തില്ലെങ്കിൽ അല്ലെങ്കിൽ അഡ്മിൻ അല്ലെങ്കില്‍
    if (!user || user.isAdmin !== true) {
      navigate("/");
    }
  }, [user, navigate]);
  // ടോട്ടൽ തുക കണക്കുകൂട്ടാൻ
  const totalDonation =
    data?.donations?.reduce((sum, item) => sum + item.amount, 0) || 0;

  if (isLoading)
    return (
      <div className="text-center py-12 dark:text-white">
        Loading Dashboard...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-500">Error loading data!</div>
    );

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto space-y-8">
      {/* ഹെഡർ & ടോട്ടൽ കാർഡ് (Bento Style) */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#050522] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-center">
          <span className="text-red-500 font-bold text-xs tracking-widest uppercase">
            Overview
          </span>
          <h2 className="text-3xl font-extrabold mt-1 tracking-tight">
            Donation Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            ലഭിച്ച സംഭാവനകളുടെയും അതിന്റെ സ്റ്റാറ്റസുകളുടെയും പൂർണ്ണവിവരങ്ങൾ
            ഇവിടെ കാണാം.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100/60 dark:from-slate-950 dark:to-slate-900 border border-red-100 dark:border-slate-800 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
          <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
            Total Received
          </span>
          <div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">
              ₹{totalDonation.toLocaleString("en-IN")}
            </h3>
            <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
              ✨ {data?.count || 0} Successful Transactions
            </p>
          </div>
        </div>
      </div>

      {/* ഹിസ്റ്ററി ടേബിൾ കാർഡ് */}
      <div className="bg-white dark:bg-slate-950/60 dark:backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-900 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Transaction History
          </h3>
          <span className="bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">
            Live
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase border-b border-gray-100 dark:border-slate-900">
                <th className="p-4 pl-6">Donor</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-900 text-sm text-gray-600 dark:text-gray-300">
              {data?.donations?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <td className="p-4 pl-6">
                    <p className="font-bold text-slate-900 dark:text-white capitalize">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.phone}</p>
                  </td>
                  <td className="p-4 font-medium">{item.purpose}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-white">
                    ₹{item.amount}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <span className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 px-3 py-1.5 rounded-xl font-bold text-xs border border-green-200/40 dark:border-green-900/30">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
              {data?.donations?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    സംഭാവനകൾ ഒന്നും തന്നെ നിലവിലില്ല.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationDashboard;
