// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  Heart,
  Users,
  Sparkles,
  Calendar,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Award, // ✅ added for legacy stats
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const ministriesList = [
    {
      name: "യൂത്ത് മിനിസ്ട്രി",
      icon: Users,
      desc: "ആരാധന, ശിഷ്യത്വം, രസകരമായ പരിപാടികൾ വഴി യുവതലമുറയെ ശാക്തീകരിക്കുന്നു.",
    },
    {
      name: "K.I.D.S മിനിസ്ട്രി",
      icon: BookOpen,
      desc: "സുരക്ഷിതവും സർഗ്ഗാത്മകവുമായ അന്തരീക്ഷത്തിൽ കുട്ടികളെ ദൈവവചനം പഠിപ്പിക്കുന്നു.",
    },
    {
      name: "വനിതാ മിനിസ്ട്രി (EmpowHer)",
      icon: Heart,
      desc: "പ്രാർത്ഥന, കൗൺസിലിംഗ്, കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ച് വഴി സ്ത്രീകളെ പിന്തുണയ്ക്കുന്നു.",
    },
    {
      name: "പുരുഷ മിനിസ്ട്രി (M.I.C)",
      icon: Shield,
      desc: "സത്യസന്ധത, നേതൃത്വം, ലക്ഷ്യബോധം എന്നിവയുള്ള ദൈവിക പുരുഷന്മാരെ വാർത്തെടുക്കുന്നു.",
    },
  ];

  const outreachList = [
    "രോഗികൾക്കും പ്രായമായവർക്കും വൈദ്യസഹായം",
    "ഭവനരഹിതർക്ക് ഭക്ഷണവും പാർപ്പിടവും",
    "വിധവകൾക്കും ഏകാകിനികൾക്കും പിന്തുണ",
    "പിന്നോക്ക കുട്ടികൾക്ക് വിദ്യാഭ്യാസ സഹായം",
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={14} /> ഞങ്ങളുടെ കഥ
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
            ഡിവൈൻ മിനിസ്ട്രീസ്
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            ഒരു ചടുലവും, ബൈബിൾ അടിസ്ഥാനമാക്കിയുള്ള കുടുംബ സഭ – ജനങ്ങളെ
            സൗഖ്യത്തിലേക്കും മാറ്റത്തിലേക്കും നയിക്കുന്നു.
          </p>
        </div>
      </section>

      {/* ✅ NEW: 15+ Years Trust Legacy Stats Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-indigo-100 dark:border-indigo-950 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <span className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Award size={20} />
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              18+
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              വർഷത്തെ കാരുണ്യ പാരമ്പര്യം
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <span className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded-lg text-amber-600 dark:text-amber-400">
                <Users size={20} />
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              1000+
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              തുണച്ച കുടുംബങ്ങൾ
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <span className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded-lg text-rose-600 dark:text-rose-400">
                <Heart size={20} />
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              5+
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              സജീവ മിനിസ്ട്രികൾ
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <span className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Church size={20} />
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              2011
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              സ്ഥാപിത വർഷം
            </p>
          </div>
        </div>
      </section>

      {/* Church Identity (updated text) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/30 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
                <Church size={16} /> ഞങ്ങൾ ആരാണ്?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                ഡിവൈൻ മിനിസ്ട്രീസ് – വിശ്വാസത്തിന്റെ കുടുംബം
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ഡിവൈൻ മിനിസ്ട്രീസ് ഒരു ചടുലവും, ആത്മീയവുമായ, ബൈബിളിനെ
                വിശ്വസിക്കുന്ന കുടുംബ സഭയാണ്. ക്രിസ്തുവിന്റെ മാതൃക പിന്തുടർന്ന്,
                കഴിഞ്ഞ <strong>18-ലധികം വർഷങ്ങളായി</strong> ജീവകാരുണ്യ ട്രസ്റ്റ്
                പ്രവർത്തനങ്ങളിലൂടെയും ആത്മീയ ശുശ്രൂഷകളിലൂടെയും ഒട്ടനവധി
                ജനങ്ങൾക്ക് ഞങ്ങൾ തണലായി നിലകൊള്ളുന്നു. ദൈവസ്നേഹം അനുഭവിക്കാനും,
                സൗഖ്യവും രൂപാന്തരവും കണ്ടെത്താനും കഴിയുന്ന അന്തരീക്ഷം
                സൃഷ്ടിക്കാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്. തീക്ഷ്ണമായ ആരാധന, ആധികാരിക
                ബന്ധങ്ങൾ, പ്രായോഗിക പഠനം എന്നിവയിലൂടെ ശിഷ്യരെ വാർത്തെടുത്ത്
                ലോകത്തിൽ മാറ്റമുണ്ടാക്കുക ഞങ്ങളുടെ ലക്ഷ്യം.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format"
                alt="സഭ ആരാധന"
                className="rounded-2xl shadow-2xl w-full max-w-sm object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Founder & Co-founder Section (unchanged) */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
              ഞങ്ങളുടെ നേതൃത്വം
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Rev. Jones Devakumar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&auto=format"
                    alt="Rev. Jones Devakumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Fr. ലോറൻസ് ജോസഫ്
                </h3>
                <p className="text-amber-600 dark:text-amber-400 font-semibold">
                  സ്ഥാപകൻ & പ്രസിഡൻ്റ്
                </p>
                <div className="mt-4 text-slate-600 dark:text-slate-300 space-y-2">
                  <p className="flex items-center gap-2 justify-center text-sm">
                    <Calendar size={16} /> ഒരു അപ്പസ്തോലനായി വിളിക്കപ്പെട്ടു –{" "}
                    <strong>2011 മാർച്ച് 11</strong> സഭ ആരംഭിക്കാൻ ദർശനം
                    ലഭിച്ചു.
                  </p>
                  <p className="text-sm">
                    നഷ്ടപ്പെട്ടവരോടും തകർന്നവരോടുമുള്ള ഹൃദയത്തോടെ, റവ. ജോൺസ്
                    പ്രവാചക ഉൾക്കാഴ്ചയോടും കരുണയോടും കൂടി നേതൃത്വം നൽകുകയും
                    കുടുംബങ്ങൾ പുനഃസ്ഥാപിക്കപ്പെടാൻ ആഗ്രഹിക്കുകയും ചെയ്യുന്നു.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sister Christy Jones */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-rose-500 shadow-xl mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&auto=format"
                    alt="Sister Christy Jones"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  സിസ്റ്റർ ഐറിൻ . G
                </h3>
                <p className="text-rose-600 dark:text-rose-400 font-semibold">
                  പ്രാർത്ഥനാ യോദ്ധാവ് & ആരാധനാ നേതാവ്
                </p>
                <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm space-y-2">
                  <p>
                    Pr. ലോറൻസ് ജോസഫിന്റെ ശുശ്രൂഷ പങ്കാളി എന്ന നിലയിൽ, ഐറിൻ
                    പ്രാർത്ഥനയിലും ആരാധനയിലും ആഴമായ അഭിഷേകം കൊണ്ടുവരുന്നു.
                  </p>
                  <p>
                    സഭയുടെ വളർച്ച, ഇടയപരിചരണം, ദൈവസന്നിധിയിലേക്ക് ജനങ്ങളെ
                    നയിക്കുന്നതിൽ അവർ നിർണായക പങ്ക് വഹിക്കുന്നു.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Ministries Grid (unchanged) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            ഞങ്ങൾ ചെയ്യുന്ന കാര്യങ്ങൾ
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            ഞങ്ങളുടെ ശുശ്രൂഷകളും കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ചും
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Ministries Cards */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <Users className="text-amber-500" /> സഭാ ശുശ്രൂഷകൾ
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {ministriesList.map((min, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-800/40 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
                >
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <min.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">
                      {min.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {min.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Outreach & Care */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <Heart className="text-rose-500" /> കമ്മ്യൂണിറ്റി സേവനങ്ങൾ
            </h3>
            <div className="space-y-3">
              {outreachList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/30 dark:bg-slate-800/30 rounded-lg"
                >
                  <CheckCircle size={18} className="text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/20 dark:to-rose-950/20 border border-amber-200 dark:border-amber-800/30">
              <p className="text-slate-700 dark:text-slate-300 italic">
                “വിശ്വാസം പ്രവൃത്തികളില്ലാതെ മരിച്ചതാണെന്നു ഞങ്ങൾ
                വിശ്വസിക്കുന്നു. രോഗികൾക്കും, വൃദ്ധർക്കും, വിധവകൾക്കും
                ദരിദ്രർക്കും ക്രിസ്തു പഠിപ്പിച്ചതുപോലെ ശുശ്രൂഷിക്കാൻ ഞങ്ങളുടെ
                വാതിലും ഹൃദയവും തുറന്നിരിക്കുന്നു.”
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 mt-3 text-amber-600 hover:text-amber-700 font-semibold"
              >
                പങ്കാളിയാകൂ <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Banner (unchanged) */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ഞങ്ങളുടെ ദർശനം
          </h2>
          <p className="text-xl opacity-95">
            ജീവിതങ്ങൾ രൂപാന്തരപ്പെടുന്ന, കുടുംബങ്ങൾ പുനഃസ്ഥാപിക്കപ്പെടുന്ന,
            ക്രിസ്തുവിന്റെ അളവറ്റ സ്നേഹത്താൽ സമൂഹങ്ങൾ സ്വാധീനിക്കപ്പെടുന്ന ഒരു
            ലോകം.
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} /> ആത്മീയ ആരാധന
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} /> ശിഷ്യത്വം
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} /> പ്രവൃത്തിയിലുള്ള സ്നേഹം
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

// // src/pages/About.jsx (corrected – no duplicate CheckCircle)
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Church,
//   Heart,
//   Users,
//   Sparkles,
//   Calendar,
//   Shield,
//   BookOpen,
//   ArrowRight,
//   CheckCircle, // ✅ Import directly from lucide-react
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const About = () => {
//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
//   };

//   const ministriesList = [
//     {
//       name: "യൂത്ത് മിനിസ്ട്രി",
//       icon: Users,
//       desc: "ആരാധന, ശിഷ്യത്വം, രസകരമായ പരിപാടികൾ വഴി യുവതലമുറയെ ശാക്തീകരിക്കുന്നു.",
//     },
//     {
//       name: "K.I.D.S മിനിസ്ട്രി",
//       icon: BookOpen,
//       desc: "സുരക്ഷിതവും സർഗ്ഗാത്മകവുമായ അന്തരീക്ഷത്തിൽ കുട്ടികളെ ദൈവവചനം പഠിപ്പിക്കുന്നു.",
//     },
//     {
//       name: "വനിതാ മിനിസ്ട്രി (EmpowHer)",
//       icon: Heart,
//       desc: "പ്രാർത്ഥന, കൗൺസിലിംഗ്, കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ച് വഴി സ്ത്രീകളെ പിന്തുണയ്ക്കുന്നു.",
//     },
//     {
//       name: "പുരുഷ മിനിസ്ട്രി (M.I.C)",
//       icon: Shield,
//       desc: "സത്യസന്ധത, നേതൃത്വം, ലക്ഷ്യബോധം എന്നിവയുള്ള ദൈവിക പുരുഷന്മാരെ വാർത്തെടുക്കുന്നു.",
//     },
//   ];

//   const outreachList = [
//     "രോഗികൾക്കും പ്രായമായവർക്കും വൈദ്യസഹായം",
//     "ഭവനരഹിതർക്ക് ഭക്ഷണവും പാർപ്പിടവും",
//     "വിധവകൾക്കും ഏകാകിനികൾക്കും പിന്തുണ",
//     "പിന്നോക്ക കുട്ടികൾക്ക് വിദ്യാഭ്യാസ സഹായം",
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 px-6 text-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
//         <div className="relative max-w-3xl mx-auto">
//           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800">
//             <Sparkles size={14} /> ഞങ്ങളുടെ കഥ
//           </span>
//           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
//             ഡിവൈൻ മിനിസ്ട്രീസ്
//           </h1>
//           <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
//             ഒരു ചടുലവും, ബൈബിൾ അടിസ്ഥാനമാക്കിയുള്ള കുടുംബ സഭ – ജനങ്ങളെ
//             സൗഖ്യത്തിലേക്കും മാറ്റത്തിലേക്കും നയിക്കുന്നു.
//           </p>
//         </div>
//       </section>

//       {/* Church Identity */}
//       <section className="py-16 px-6 max-w-7xl mx-auto">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//           className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/30 shadow-xl"
//         >
//           <div className="flex flex-col md:flex-row gap-8 items-center">
//             <div className="flex-1 text-center md:text-left">
//               <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
//                 <Church size={16} /> ഞങ്ങൾ ആരാണ്?
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
//                 ഡിവൈൻ മിനിസ്ട്രീസ് – വിശ്വാസത്തിന്റെ കുടുംബം
//               </h2>
//               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
//                 ഡിവൈൻ മിനിസ്ട്രീസ് ഒരു ചടുലവും, ആത്മീയവുമായ, ബൈബിളിനെ
//                 വിശ്വസിക്കുന്ന കുടുംബ സഭയാണ്. ഞങ്ങൾ ക്രിസ്തുവിന്റെ മാതൃക
//                 പിന്തുടരുന്നു. ദൈവസ്നേഹം അനുഭവിക്കാനും, സൗഖ്യവും രൂപാന്തരവും
//                 കണ്ടെത്താനും കഴിയുന്ന അന്തരീക്ഷം സൃഷ്ടിക്കാൻ ഞങ്ങൾ
//                 പ്രതിജ്ഞാബദ്ധരാണ്. തീക്ഷ്ണമായ ആരാധന, ആധികാരിക ബന്ധങ്ങൾ,
//                 പ്രായോഗിക പഠനം എന്നിവയിലൂടെ ശിഷ്യരെ വാർത്തെടുത്ത് ലോകത്തിൽ
//                 മാറ്റമുണ്ടാക്കുക ഞങ്ങളുടെ ലക്ഷ്യം.
//               </p>
//             </div>
//             <div className="flex-1 flex justify-center">
//               <img
//                 src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format"
//                 alt="സഭ ആരാധന"
//                 className="rounded-2xl shadow-2xl w-full max-w-sm object-cover"
//               />
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Founder & Co-founder Section (Large Images) */}
//       <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
//               ഞങ്ങളുടെ നേതൃത്വം
//             </h2>
//             <div className="w-24 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-10">
//             {/* Rev. Jones Devakumar */}
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl mb-5">
//                   <img
//                     src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&auto=format"
//                     alt="Rev. Jones Devakumar"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
//                   റവ. ജോൺസ് ദേവകുമാർ
//                 </h3>
//                 <p className="text-amber-600 dark:text-amber-400 font-semibold">
//                   സ്ഥാപകൻ & പ്രസിഡൻ്റ്
//                 </p>
//                 <div className="mt-4 text-slate-600 dark:text-slate-300 space-y-2">
//                   <p className="flex items-center gap-2 justify-center text-sm">
//                     <Calendar size={16} /> ഒരു അപ്പസ്തോലനായി വിളിക്കപ്പെട്ടു –{" "}
//                     <strong>2011 മാർച്ച് 11</strong> സഭ ആരംഭിക്കാൻ ദർശനം
//                     ലഭിച്ചു.
//                   </p>
//                   <p className="text-sm">
//                     നഷ്ടപ്പെട്ടവരോടും തകർന്നവരോടുമുള്ള ഹൃദയത്തോടെ, റവ. ജോൺസ്
//                     പ്രവാചക ഉൾക്കാഴ്ചയോടും കരുണയോടും കൂടി നേതൃത്വം നൽകുകയും
//                     കുടുംബങ്ങൾ പുനഃസ്ഥാപിക്കപ്പെടാൻ ആഗ്രഹിക്കുകയും ചെയ്യുന്നു.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Sister Christy Jones */}
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-rose-500 shadow-xl mb-5">
//                   <img
//                     src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&auto=format"
//                     alt="Sister Christy Jones"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
//                   സിസ്റ്റർ ക്രിസ്റ്റി ജോൺസ്
//                 </h3>
//                 <p className="text-rose-600 dark:text-rose-400 font-semibold">
//                   പ്രാർത്ഥനാ യോദ്ധാവ് & ആരാധനാ നേതാവ്
//                 </p>
//                 <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm space-y-2">
//                   <p>
//                     റവ. ജോൺസിൻ്റെ ശുശ്രൂഷ പങ്കാളി എന്ന നിലയിൽ, ക്രിസ്റ്റി
//                     പ്രാർത്ഥനയിലും ആരാധനയിലും ആഴമായ അഭിഷേകം കൊണ്ടുവരുന്നു.
//                   </p>
//                   <p>
//                     സഭയുടെ വളർച്ച, ഇടയപരിചരണം, ദൈവസന്നിധിയിലേക്ക് ജനങ്ങളെ
//                     നയിക്കുന്നതിൽ അവർ നിർണായക പങ്ക് വഹിക്കുന്നു.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Services & Ministries Grid */}
//       <section className="py-20 px-6 max-w-7xl mx-auto">
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
//             ഞങ്ങൾ ചെയ്യുന്ന കാര്യങ്ങൾ
//           </h2>
//           <p className="text-slate-600 dark:text-slate-300 mt-2">
//             ഞങ്ങളുടെ ശുശ്രൂഷകളും കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ചും
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Left: Ministries Cards */}
//           <div>
//             <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
//               <Users className="text-amber-500" /> സഭാ ശുശ്രൂഷകൾ
//             </h3>
//             <motion.div
//               variants={staggerContainer}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               {ministriesList.map((min, idx) => (
//                 <motion.div
//                   key={idx}
//                   variants={fadeUp}
//                   className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-800/40 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
//                 >
//                   <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
//                     <min.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-slate-800 dark:text-white">
//                       {min.name}
//                     </h4>
//                     <p className="text-sm text-slate-600 dark:text-slate-300">
//                       {min.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Right: Outreach & Care */}
//           <div>
//             <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
//               <Heart className="text-rose-500" /> കമ്മ്യൂണിറ്റി സേവനങ്ങൾ
//             </h3>
//             <div className="space-y-3">
//               {outreachList.map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="flex items-center gap-3 p-3 bg-white/30 dark:bg-slate-800/30 rounded-lg"
//                 >
//                   <CheckCircle size={18} className="text-green-500" />
//                   <span className="text-slate-700 dark:text-slate-300">
//                     {item}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//             <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/20 dark:to-rose-950/20 border border-amber-200 dark:border-amber-800/30">
//               <p className="text-slate-700 dark:text-slate-300 italic">
//                 “വിശ്വാസം പ്രവൃത്തികളില്ലാതെ മരിച്ചതാണെന്നു ഞങ്ങൾ
//                 വിശ്വസിക്കുന്നു. രോഗികൾക്കും, വൃദ്ധർക്കും, വിധവകൾക്കും
//                 ദരിദ്രർക്കും ക്രിസ്തു പഠിപ്പിച്ചതുപോലെ ശുശ്രൂഷിക്കാൻ ഞങ്ങളുടെ
//                 വാതിലും ഹൃദയവും തുറന്നിരിക്കുന്നു.”
//               </p>
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center gap-1 mt-3 text-amber-600 hover:text-amber-700 font-semibold"
//               >
//                 പങ്കാളിയാകൂ <ArrowRight size={14} />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision & Mission Banner */}
//       <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             ഞങ്ങളുടെ ദർശനം
//           </h2>
//           <p className="text-xl opacity-95">
//             ജീവിതങ്ങൾ രൂപാന്തരപ്പെടുന്ന, കുടുംബങ്ങൾ പുനഃസ്ഥാപിക്കപ്പെടുന്ന,
//             ക്രിസ്തുവിന്റെ അളവറ്റ സ്നേഹത്താൽ സമൂഹങ്ങൾ സ്വാധീനിക്കപ്പെടുന്ന ഒരു
//             ലോകം.
//           </p>
//           <div className="mt-8 flex justify-center gap-6 flex-wrap">
//             <div className="flex items-center gap-2">
//               <CheckCircle size={20} /> ആത്മീയ ആരാധന
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle size={20} /> ശിഷ്യത്വം
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle size={20} /> പ്രവൃത്തിയിലുള്ള സ്നേഹം
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
