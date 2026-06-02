// src/pages/Help.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ added Link
import {
  Heart,
  GraduationCap,
  Utensils,
  HeartPulse,
  Users,
  Send,
  CheckCircle2,
  Gift,
  DollarSign,
  Smartphone,
} from "lucide-react";

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "rcc-food",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log("Volunteer Registration:", formData);
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-16 transition-colors duration-500">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto text-center px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase bg-red-50 dark:bg-red-950/40 px-3 py-1.5 rounded-full">
            Make an Impact
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 text-slate-900 dark:text-white uppercase">
            ഞങ്ങളോടൊപ്പം പങ്കാളിയാകൂ
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            ഡിവൈൻ ചാരിറ്റി ട്രസ്റ്റിന്റെ ജീവകാരുണ്യ പ്രവർത്തനങ്ങളിൽ നിങ്ങൾക്ക്
            പല രീതിയിൽ പങ്കാളികളാകാം. ഒരു കുട്ടിയുടെ പഠനം ഏറ്റെടുക്കാനും
            വിശക്കുന്നവന് ഭക്ഷണം നൽകാനും നിങ്ങളുടെ കൈകൾ നീട്ടുക.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: SPONSORSHIP OPTIONS (BENTO GRID - 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Gift size={14} className="text-amber-500" /> Option 1: Sponsor a
            Project
          </div>

          <div className="grid sm:grid-cols-2 gap-6 h-full">
            {/* Meal Sponsorship Card - wrapped with Link */}
            <Link to="/sponsor" className="block no-underline">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full cursor-pointer transition-all hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                    <Utensils size={24} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Sponsor a Day's Meal
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                    തിരുവനന്തപുരം RCC-യിലെ ക്യാൻസർ രോഗികൾക്കും അവരുടെ
                    കൂട്ടിരിപ്പുകാർക്കുമായി നൽകുന്ന സൗജന്യ ഉച്ചഭക്ഷണ പദ്ധതിയിൽ
                    ഒരു ദിവസത്തെ ചെലവ് നിങ്ങൾക്ക് ഏറ്റെടുക്കാം.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400">
                    Monthly Target: 200 People
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Child Education Sponsorship Card - wrapped with Link */}
            <Link to="/sponsor" className="block no-underline">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full cursor-pointer transition-all hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Sponsor Education Support
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                    ജയിൽ തടവുകാരുടെ മക്കൾക്കും തീരദേശത്തെ നിർധനരായ
                    കുട്ടികൾക്കുമായി നൽകുന്ന പഠനോപകരണങ്ങളും സ്കൂൾ ഫീസും നൽകി ഒരു
                    കുട്ടിയുടെ ഭാവി സുരക്ഷിതമാക്കാം.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400">
                    Yearly Target: 100+ Kids
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Bank & Financial Transparency Block (unchanged) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden mt-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4 mb-4">
              <div>
                <h4 className="text-base font-black text-white">
                  Direct Bank Transfer
                </h4>
                <p className="text-[11px] text-slate-400">
                  ബാങ്ക് വഴി നേരിട്ട് സംഭാവനകൾ അയക്കാം
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Smartphone size={12} className="text-amber-400" /> IMPS / NEFT
                / UPI AVAILABLE
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <span className="block text-[10px] font-sans text-slate-500">
                  Account Name
                </span>
                <span className="text-slate-200 font-bold">
                  DIVINE CHARITY TRUST
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-sans text-slate-500">
                  Account Number
                </span>
                <span className="text-white font-bold tracking-wider">
                  XXXXXXXXXXXXX
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[10px] font-sans text-slate-500">
                  Bank & Branch
                </span>
                <span className="text-slate-200">Federal Bank, TVM</span>
              </div>
              <div>
                <span className="block text-[10px] font-sans text-slate-500">
                  IFSC Code
                </span>
                <span className="text-amber-400 font-bold">FDRL00XXXXX</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] font-sans text-slate-500">
                  Remark Info
                </span>
                <span className="text-slate-400 font-sans text-[11px]">
                  Sponsorship തുകയയച്ച ശേഷം ഓഫീസ് നമ്പറിൽ വാട്സാപ്പ് ചെയ്യുക.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BECOME A VOLUNTEER FORM (unchanged) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Users size={14} className="text-red-500" /> Option 2: Become a
              Volunteer
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              സന്നദ്ധസേവകരാകാം
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed mb-6">
              പാലിയേറ്റീവ് ഹോം കെയർ, ആശുപത്രികളിലെ ഭക്ഷണ വിതരണം എന്നിവയ്ക്ക്
              നിങ്ങളുടെ സമയവും സേവനവും നൽകി സഹായിക്കാൻ താല്പര്യമുണ്ടെങ്കിൽ താഴെ
              രജിസ്റ്റർ ചെയ്യുക.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 p-6 rounded-2xl text-center my-8"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായി!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  ട്രസ്റ്റ് ഭാരവാഹികൾ നിങ്ങളെ ഉടൻ തന്നെ ഫോണിൽ
                  ബന്ധപ്പെടുന്നതായിരിക്കും. നന്ദി.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    നിങ്ങളുടെ പേര് *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    ഫോൺ നമ്പർ *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile number"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    ഇമെയിൽ വിലാസം
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address (optional)"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    സഹായിക്കാൻ താല്പര്യമുള്ള മേഖല *
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="rcc-food">
                      RCC ഉച്ചഭക്ഷണ വിതരണം (Food Drive)
                    </option>
                    <option value="palliative">
                      പാലിയേറ്റീവ് ഹോം കെയർ (Patient Care)
                    </option>
                    <option value="education">
                      വിദ്യാഭ്യാസ സഹായ പ്രവർത്തനങ്ങൾ
                    </option>
                    <option value="events">
                      കൺവെൻഷൻ & ഇവന്റ് മാനേജ്‌മെന്റ്
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Submit Application
                </button>
              </form>
            )}
          </div>

          <div className="text-[10px] text-slate-400 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
            Your data is fully secure and will only be used for charity
            coordination.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
