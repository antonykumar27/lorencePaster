// src/pages/MicMinistry.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  Users,
  Shield,
  HeartHandshake,
  Sparkles,
  Target,
  BookOpen,
  UsersRound,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const MicMinistry = () => {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const coreValues = [
    {
      icon: UsersRound,
      title: "പുരുഷന്മാരുടെ കൂട്ടായ്മ",
      description:
        "സജീവമായ സമീപനത്തിലൂടെ പുരുഷന്മാരെ ശുശ്രൂഷിക്കുകയും പരസ്പരം പിന്തുണയ്ക്കുകയും ചെയ്യുന്നു.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "ദൈവിക ലക്ഷ്യം",
      description:
        "ദൈവം ഉദ്ദേശിച്ച രീതിയിൽ ജീവിക്കാൻ പുരുഷന്മാരെ പിന്തുണയ്ക്കുകയും സഹായിക്കുകയും ചെയ്യുന്നു.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: HeartHandshake,
      title: "ആത്മീയ പക്വത",
      description:
        "ദൈവത്തിന്റെ പുരുഷന്മാരായി എങ്ങനെ ജീവിക്കണമെന്ന് പഠിക്കുമ്പോൾ വ്യക്തിപരവും ആത്മീയവുമായ വളർച്ച.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "ദൈവിക ശക്തി",
      description:
        "അവരുടെ ജീവിതത്തിൽ ദൈവത്തിന്റെ ഉദ്ദേശ്യവും ശക്തിയും സജീവമായി കണ്ടെത്താൻ സഹായിക്കുന്നു.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const activities = [
    {
      name: "പുരുഷ ബൈബിൾ പഠനം",
      icon: BookOpen,
      time: "Every Wednesday, 7:00 PM",
    },
    { name: "പ്രാർത്ഥനാ യോഗം", icon: Church, time: "Saturday, 6:00 AM" },
    { name: "ഫെലോഷിപ്പ് & ഔട്ട്റീച്ച്", icon: Users, time: "Sunday, 4:00 PM" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&auto=format"
            alt="Men in Christ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm font-semibold mb-6"
          >
            <Sparkles size={14} /> Men's Ministry
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            M.I.C
            <span className="block text-amber-400 text-3xl md:text-4xl mt-2">
              (Men in Christ)
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto"
          >
            പുരുഷന്മാരെ ദൈവത്തിലേക്ക് നയിക്കാനും, ആത്മീയ പക്വത പ്രാപിക്കാൻ
            സഹായിക്കാനും ലക്ഷ്യമിടുന്നു.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              Join the Brotherhood <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section (4 pillars) */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              പ്രധാന ലക്ഷ്യങ്ങൾ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bible Verse & Activities Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Bible verse */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider">
                Key Scripture
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                ബൈബിൾ പ്രചോദനം
              </h2>
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/30 shadow-md">
                <p className="text-xl md:text-2xl italic text-slate-800 dark:text-slate-200 leading-relaxed">
                  “ദൈവത്തിന്റെ മനുഷ്യൻ സകല സൽപ്രവൃത്തിക്കും ഒരുങ്ങി
                  തികഞ്ഞവനായിരിക്കേണ്ടതിന്നു തന്നേ”
                </p>
                <p className="mt-3 text-sm font-bold text-amber-700 dark:text-amber-400">
                  — 2 തിമൊഥെയൊസ് 3:17
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ഓരോ പുരുഷന്റെയും തനതായ കാഴ്ചപ്പാടിൽ നിന്നും ഉത്തരവാദിത്തങ്ങളിൽ
                നിന്നും അവരുടെ ലക്ഷ്യങ്ങൾ മനസ്സിലാക്കാനും പ്രയോഗിക്കാനും
                സഹായിക്കുക എന്നതാണ് ഞങ്ങളുടെ ദൗത്യം. പരസ്പരം ശ്രദ്ധിച്ചുകൊണ്ടും
                ദൈവീകമായ രീതിയിൽ പിന്തുണ നൽകിക്കൊണ്ടും ഞങ്ങൾ മുന്നോട്ട്
                പോകുന്നു.
              </p>
            </motion.div>

            {/* Right side: Weekly Activities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider">
                Weekly Schedule
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                പ്രവർത്തനങ്ങൾ
              </h2>
              <div className="space-y-4">
                {activities.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <act.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
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
                * എല്ലാ യോഗങ്ങളും പുരുഷന്മാർക്ക് തുറന്നിരിക്കുന്നു – സുരക്ഷിതവും
                സ്വാഗതാർഹവുമായ അന്തരീക്ഷം.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery / Image Section */}
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
              Fellowship, Worship, Outreach
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format"
              alt="Men praying"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&auto=format"
              alt="Men fellowship"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1564648351416-3ca0f04fd023?w=400&auto=format"
              alt="Bible study"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&auto=format"
              alt="Men gathering"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">
              ഒരു പുരുഷനായി ഉയർത്തപ്പെടൂ
            </h2>
            <p className="text-xl text-white/90">
              ദൈവത്തിന്റെ ഉദ്ദേശ്യങ്ങൾ കണ്ടെത്താനും നിറവേറ്റാനും ഈ സഹവാസത്തിൽ
              ചേരൂ.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl"
            >
              Join M.I.C Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MicMinistry;
