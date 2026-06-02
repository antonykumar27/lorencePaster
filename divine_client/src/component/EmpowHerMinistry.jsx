// src/pages/EmpowHerMinistry.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Shield,
  Sparkles,
  Target,
  BookOpen,
  Flower2,
  HandHeart,
  ArrowRight,
  UserCog,
  HeartHandshake,
  Handshake,
  Lightbulb,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const EmpowHerMinistry = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const coreGoals = [
    {
      icon: Target,
      title: "ദർശനം",
      description:
        "എല്ലാ പശ്ചാത്തലങ്ങളിൽ നിന്നുമുള്ള സ്ത്രീകളെ വാർത്തെടുക്കുക, ജീവിതങ്ങളിൽ മാറ്റം കൊണ്ടുവരിക, കുടുംബങ്ങളെയും സമൂഹങ്ങളെയും സംരക്ഷിക്കുക, രാഷ്ട്രങ്ങളിൽ സ്വാധീനം ചെലുത്തുക.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: HandHeart,
      title: "ആത്മീയ വളർച്ച",
      description:
        "ക്രിസ്തു കേന്ദ്രീകൃതമായ ആത്മീയ വളർച്ചയും പ്രോത്സാഹനവും നൽകുക, അതുവഴി ദൈവവുമായുള്ള ബന്ധം ആഴപ്പെടുത്തുക.",
      color: "from-rose-500 to-red-500",
    },
    {
      icon: Users,
      title: "സമൂഹവും പിന്തുണയും",
      description:
        "സ്നേഹവും അംഗീകാരവും നിറഞ്ഞ ഒരു ഇടം സ്ത്രീകൾക്ക് നൽകുകയും, പരസ്പരം പിന്തുണച്ചുകൊണ്ട് ജീവിതയാത്രയിൽ ഒരുമിച്ച് നടക്കുകയും ചെയ്യുക.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: HeartHandshake,
      title: "പ്രയാസഘട്ടങ്ങളിലെ സഹായം",
      description:
        "ഗാർഹിക പീഡനം, ദുരുപയോഗം, വിവാഹമോചനം, ഭവനരഹിതാവസ്ഥ, ആരോഗ്യപ്രശ്നങ്ങൾ, കടുത്ത സാമ്പത്തിക പ്രതിസന്ധി എന്നിവയിലൂടെ കടന്നുപോകുന്ന സ്ത്രീകൾക്കായി പ്രത്യേക പ്രാർത്ഥനാ പരിപാടികൾ.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Flower2,
      title: "പുതിയ തുടക്കം",
      description:
        "ജീവിതത്തിൽ പ്രയാസങ്ങൾ അനുഭവിക്കുന്ന സ്ത്രീകൾക്ക് സ്വയം പര്യാപ്തരാകാൻ ലൈഫ് കോച്ചിംഗും, മെഡിക്കൽ സഹായങ്ങളും നൽകി പുതിയൊരു തുടക്കം നൽകുന്നു.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Lightbulb,
      title: "ആത്മവിശ്വാസം വളർത്തൽ",
      description:
        "പരിശുദ്ധാത്മാവിന്റെ പാതയിലൂടെ സ്ത്രീകളിൽ ആത്മവിശ്വാസവും ആത്മാഭിമാനവും വളർത്തുന്നു.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: UserCog,
      title: "കൗൺസിലിംഗ്",
      description:
        "വിശ്വാസത്തെ അടിസ്ഥാനമാക്കിയുള്ള കൗൺസിലിംഗ് സേവനങ്ങൾ നൽകിക്കൊണ്ട് ജീവിതത്തിൽ മാറ്റങ്ങൾ വരുത്താനും ദൈവീക ജീവിതശൈലി കാത്തുസൂക്ഷിക്കാനും സഹായിക്കുന്നു.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const weeklyActivities = [
    { name: "Women's Bible Study", icon: BookOpen, time: "Tuesday, 10:00 AM" },
    { name: "Prayer & Intercession", icon: Heart, time: "Thursday, 7:00 PM" },
    {
      name: "Life Coaching & Counseling",
      icon: Handshake,
      time: "Saturday, 11:00 AM",
    },
    { name: "Empowerment Workshops", icon: Activity, time: "Sunday, 5:00 PM" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&auto=format"
            alt="Women ministry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-rose-300 text-sm font-semibold mb-6"
          >
            <Sparkles size={14} /> Women's Ministry
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            EmpowHer
            <span className="block text-rose-400 text-3xl md:text-4xl mt-2">
              (Empowering Women in Christ)
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto"
          >
            സ്ത്രീകൾക്ക് വേണ്ടിയുള്ള ഒരു പ്രത്യേക ശുശ്രൂഷാ വിഭാഗം – ജീവിതങ്ങളിൽ
            മാറ്റം, പിന്തുണ, പുനരുദ്ധാരണം.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              Join EmpowHer <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Goals Section (7 pillars) */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-600 dark:text-rose-400 text-sm font-bold tracking-wider uppercase">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              പ്രധാന ലക്ഷ്യങ്ങൾ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {coreGoals.map((goal, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <goal.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {goal.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Weekly Activities + Encouragement */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Activities */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-rose-600 dark:text-rose-400 text-sm font-bold tracking-wider">
                Weekly Schedule
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                പ്രവർത്തനങ്ങൾ
              </h2>
              <div className="space-y-4">
                {weeklyActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
                      <act.icon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {act.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                * എല്ലാ പരിപാടികളും ക്രിസ്തീയ മൂല്യങ്ങളിലും സുരക്ഷിത
                അന്തരീക്ഷത്തിലും നടത്തപ്പെടുന്നു.
              </p>
            </motion.div>

            {/* Right: Bible Verse & Promise */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200 dark:border-rose-800/30 shadow-md"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-300 mb-4">
                  നിങ്ങൾക്കായുള്ള വാഗ്ദത്തം
                </h3>
                <p className="text-xl md:text-2xl italic text-slate-800 dark:text-slate-200 leading-relaxed">
                  “ഞാൻ ബലം വരുത്തുന്നവനാൽ സകലത്തിന്നും കഴിയും.”
                </p>
                <p className="mt-3 text-sm font-bold text-rose-700 dark:text-rose-400">
                  — ഫിലിപ്പിയർ 4:13
                </p>
                <div className="mt-6 pt-4 border-t border-rose-200/50 dark:border-rose-800/30">
                  <p className="text-slate-600 dark:text-slate-300">
                    പ്രയാസങ്ങളിൽ വീഴാതെ, നിങ്ങളുടെ ആത്മവിശ്വാസം ദൈവത്തിൽ
                    ഉറപ്പിക്കുക. EmpowHer നിങ്ങളോടൊപ്പം ഉണ്ട്.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery (Women fellowship images) */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              നമ്മുടെ സഹവാസ നിമിഷങ്ങൾ
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Fellowship, Worship, Empowerment
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?w=400&auto=format"
              alt="Women praying"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&auto=format"
              alt="Women fellowship"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format"
              alt="Women conference"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&auto=format"
              alt="Women worship"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">
              നിങ്ങളുടെ യാത്രയിൽ ഞങ്ങൾ കൂടെയുണ്ട്
            </h2>
            <p className="text-xl text-white/90">
              പ്രാർത്ഥന, കൗൺസിലിംഗ്, പുനരുദ്ധാരണം – EmpowHer-ൽ ചേരൂ.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-rose-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl"
            >
              Join EmpowHer Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EmpowHerMinistry;
