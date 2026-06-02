// src/pages/Sponsor.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // useNavigate ഇമ്പോർട്ട് ചെയ്തു ബ്രോ
import { ArrowLeft, GraduationCap, Utensils } from "lucide-react";

const Sponsor = () => {
  const navigate = useNavigate();

  // കാർഡിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ ഡാറ്റ സ്റ്റേറ്റായി പാസ്സ് ചെയ്ത് റീഡയറക്ട് ചെയ്യുന്നു
  const handleSponsorClick = (type) => {
    if (type === "meal") {
      navigate("/donate", {
        state: {
          amount: "500",
          purpose: "Poor Support", // അല്ലെങ്കിൽ ബാക്ക്എൻഡിലുള്ള നിന്റെ അനുയോജ്യമായ വാല്യൂ
        },
      });
    } else if (type === "education") {
      navigate("/donate", {
        state: {
          amount: "5000",
          purpose: "Poor Support",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/help"
          className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={16} /> Back to Help
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black text-center text-slate-900 dark:text-white uppercase">
            Sponsor a Cause
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-3 rounded-full" />
          <p className="text-center text-slate-500 dark:text-slate-400 mt-3 mb-12 text-sm sm:text-base">
            Choose an option and make a difference. You will be redirected to
            our secure payment page.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Meal Sponsorship */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => handleSponsorClick("meal")}
              className="cursor-pointer p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm transition-all hover:border-emerald-500/40 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Utensils size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Feed a Day at RCC
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed-]+">
                Provide one day's meal for 200+ patients & caregivers.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
                  Suggested: ₹500
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                  Sponsor Now →
                </span>
              </div>
            </motion.div>

            {/* Child Education */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => handleSponsorClick("education")}
              className="cursor-pointer p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm transition-all hover:border-amber-500/40 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Sponsor Child's Education
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Yearly study materials + fees for a prisoner's or poor child.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
                  Suggested: ₹5000
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                  Sponsor Now →
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sponsor;
