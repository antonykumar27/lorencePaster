// src/pages/KidsMinistry.jsx (using safe icons)
import React from "react";
import { motion } from "framer-motion";
import {
  Church, // instead of Bible
  HeartHandshake, // instead of Heart (or use Heart)
  Users,
  Shield,
  Sparkles,
  BookOpen,
  Music,
  Smile,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const KidsMinistry = () => {
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

  const goals = [
    {
      icon: Church,
      title: "ബൈബിൾ പഠനം",
      description:
        "കുട്ടികൾക്ക് ബൈബിൾ സത്യങ്ങൾ രസകരമായ രീതിയിൽ (കളികൾ, പാട്ടുകൾ, വീഡിയോകൾ, കഥകൾ) പറഞ്ഞു കൊടുക്കുന്നു.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "ഭാവി തലമുറ",
      description: "ദൈവത്തെ സ്നേഹിക്കുന്ന ഒരു തലമുറയെ വളർത്തിയെടുക്കുന്നു.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: HeartHandshake,
      title: "സമ്പൂർണ്ണ വളർച്ച",
      description:
        "കുട്ടികളുടെ ശാരീരികവും, സാമൂഹികവും, വൈകാരികവും, ആത്മീയവുമായ വളർച്ചയ്ക്ക് സഹായിക്കുന്നു.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "സുരക്ഷിതമായ ഇടം",
      description:
        "കുട്ടികൾക്ക് പഠിക്കാനും വളരാനും സന്തോഷമായി ഇരിക്കാനും പറ്റിയ ഒരു സുരക്ഷിത സാഹചര്യം ഒരുക്കുന്നു.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const activities = [
    { name: "ബൈബിൾ കഥകൾ", icon: BookOpen, time: "Every Sunday, 9:30 AM" },
    { name: "ആരാധനാ പാട്ടുകൾ", icon: Music, time: "Saturday, 4:00 PM" },
    { name: "ക്രാഫ്റ്റ് & കളികൾ", icon: Smile, time: "Friday, 5:00 PM" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&auto=format"
            alt="Kids worship"
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
            <Sparkles size={14} /> K.I.D.S Ministry
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            K.I.D.S
            <span className="block text-amber-400 text-3xl md:text-4xl mt-2">
              (Kids in Divine Service)
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto"
          >
            കുട്ടികൾക്കായി പ്രത്യേകം രൂപകൽപ്പിച്ച ഒരു ശുശ്രൂഷാ വിഭാഗം – അവരുടെ
            വിശ്വാസത്തിൽ വളരാനും സന്തോഷിക്കാനും.
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
              Join Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Goals Section (4 pillars) */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              Our Focus
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              ലക്ഷ്യങ്ങൾ
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
            {goals.map((goal, idx) => (
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
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

      {/* Weekly Activities + Gallery Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Activities list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
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
                * എല്ലാ പ്രവർത്തനങ്ങളും സുരക്ഷിതവും മേൽനോട്ടത്തിലുമാണ്.
              </p>
            </motion.div>

            {/* Right side: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=300&auto=format"
                  alt="Kids praying"
                  className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1599058917765-a3b8750c16b9?w=300&auto=format"
                  alt="Kids singing"
                  className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=300&auto=format"
                  alt="Bible story"
                  className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&auto=format"
                  alt="Craft time"
                  className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">
              നിങ്ങളുടെ കുട്ടിയെ ചേർക്കൂ
            </h2>
            <p className="text-xl text-white/90">
              ഒരു സുരക്ഷിതവും ആത്മീയവുമായ അന്തരീക്ഷത്തിൽ വളരാൻ അവസരം നൽകൂ.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl"
            >
              Enroll Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default KidsMinistry;
