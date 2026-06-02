// src/pages/PrayerRequest.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreatePrayerRequestMutation } from "../store/PrayerRequestApi";
const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [createPrayerRequest, { isLoading }] = useCreatePrayerRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // മുന്നേ ചെയ്തതുപോലെ ട്രിം ചെയ്ത് വാലിഡേറ്റ് ചെയ്യുന്നു 👍
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("ദയവായി പേരും പ്രാർത്ഥനാ വിവരങ്ങളും രേഖപ്പെടുത്തുക");
      return;
    }

    try {
      // 🚀 ഇവിടെയാണ് യഥാർത്ഥ ബാക്ക്എൻഡ് API കോൾ നടക്കുന്നത്!
      // .unwrap() ഉപയോഗിക്കുന്നത് ട്രൈ-ക്യാച്ചിന് എറർ കൃത്യമായി പിടിക്കാൻ സഹായിക്കും.
      await createPrayerRequest(formData).unwrap();

      toast.success(
        "✨ നിങ്ങളുടെ പ്രാർത്ഥന അഭ്യർത്ഥന സ്വീകരിച്ചു. ഞങ്ങൾ നിങ്ങൾക്കായി പ്രാർത്ഥിക്കും!",
      );

      // ഫോം റീസെറ്റ് ചെയ്യുന്നു
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "General",
        message: "",
      });
    } catch (error) {
      // എന്തെങ്കിലും സർവർ എറർ ഉണ്ടായാൽ ഇവിടെ കാണിക്കും
      console.error("Prayer request error:", error);
      toast.error(
        error?.data?.message ||
          "ക്ഷമിക്കണം, സബ്മിറ്റ് ചെയ്യാൻ സാധിച്ചില്ല. വീണ്ടും ശ്രമിക്കുക!",
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left – Inspirational Glass Card (from first design) */}
        <div className="relative order-2 md:order-1">
          <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-4 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                പ്രാർത്ഥനാ കൂട്ടായ്മ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-6 text-gray-800 dark:text-white leading-tight">
                നിങ്ങളുടെ ഭാരങ്ങൾ <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ഞങ്ങളുമായി പങ്കുവെക്കൂ
                </span>
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
                <p className="flex items-start gap-3">
                  <span className="text-indigo-500 text-xl">🕊️</span>
                  "രണ്ടോ മൂന്നോ പേർ എന്റെ നാമത്തിൽ ഒരുമിച്ചു കൂടുന്നിടത്ത് ഞാനും
                  അവരുടെ മധ്യേ ഉണ്ട്." – മത്തായി 18:20
                </p>
                <p className="text-sm opacity-80">
                  നിങ്ങൾക്കായി പ്രാർത്ഥിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്. ജീവിതത്തിലെ ഏത്
                  പ്രതിസന്ധി ഘട്ടത്തിലും നിങ്ങൾ ഒറ്റപ്പെട്ടവരോ നിസ്സഹായരോ
                  ആണെന്ന് ഒരിക്കലും തോന്നരുത്. പ്രാർത്ഥനയുടെ ശക്തി ഞങ്ങൾ
                  നേരിട്ട് അനുഭവിച്ചിട്ടുള്ളതാണ്. നമ്മുടെ പ്രാർത്ഥനകൾ കേൾക്കുന്ന
                  സർവ്വശക്തനായ ഒരു ദൈവമുണ്ട് നമുക്കുണ്ട്. കുരിശിലെ നാഥന്റെ
                  (Eucharistic Lord) സന്നിധിയിൽ അടിയുറച്ച വിശ്വാസത്തോടും
                  സ്നേഹത്തോടും കൂടിയാണ് ഞങ്ങൾ പ്രാർത്ഥിക്കുന്നത്. നിങ്ങളുടെ
                  പ്രാർത്ഥനാ വിഷയങ്ങൾ 'ഡിവൈൻ പ്രയർ ടീമിന്' (Divine Ministry
                  Prayer Team) അയച്ചുതരൂ, ഞങ്ങൾ ഓരോ പ്രാർത്ഥനാ വിഷയത്തിനായും
                  പ്രത്യേകം പ്രാർത്ഥിക്കുന്നതാണ്.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-2xl backdrop-blur-sm">
                  <span className="text-lg">🙏</span>{" "}
                  <span>1000+ പ്രാർത്ഥനകൾ</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-2xl backdrop-blur-sm">
                  <span className="text-lg">⏳</span>{" "}
                  <span>24/7 പ്രാർത്ഥന</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Modern Glass Form (with enhanced fields: phone, email, subject dropdown) */}
        <div className="order-1 md:order-2">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700/70 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-3xl mb-3">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                പ്രാർത്ഥന അഭ്യർത്ഥിക്കുക
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                നിങ്ങളുടെ വിവരങ്ങൾ സ്വകാര്യമാണ്
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  പൂർണ്ണപേര് <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="ഉദാ: സാറാ മാത്യു"
                />
              </div>

              {/* Phone & Email - grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ഫോൺ നമ്പർ
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ഇമെയിൽ
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Prayer subject dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  പ്രാർത്ഥനാ വിഷയം
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none cursor-pointer"
                >
                  <option value="General">പൊതുവായ പ്രാർത്ഥന</option>
                  <option value="Health">ആരോഗ്യം / രോഗശാന്തി</option>
                  <option value="Family">കുടുംബ സമാധാനം</option>
                  <option value="Financial">സാമ്പത്തിക കാര്യങ്ങൾ</option>
                  <option value="Education">പഠനം / ജോലി / കരിയർ</option>
                </select>
              </div>

              {/* Prayer message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  പ്രാർത്ഥനാ വിശദാംശങ്ങൾ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  placeholder="നിങ്ങളുടെ പ്രാർത്ഥനാ ആവശ്യം വിശദമായി എഴുതാം..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    സമർപ്പിക്കുന്നു...
                  </span>
                ) : (
                  "✝️ പ്രാർത്ഥന സമർപ്പിക്കുക"
                )}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                * ഫോം സമർപ്പിക്കുന്നത് ഞങ്ങളുടെ സ്വകാര്യതാ നയം അംഗീകരിക്കുന്നു.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequest;
