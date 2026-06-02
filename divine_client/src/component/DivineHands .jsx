// src/pages/DivineHands.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  HandHeart,
  Users,
  Globe,
  Target,
  Eye,
  Sparkles,
  UtensilsCrossed,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Home,
  Heart,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const DivineHands = () => {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const services = [
    {
      icon: UtensilsCrossed,
      title: "അടിയന്തര ഭക്ഷണ സഹായം",
      description:
        "പ്രാദേശികമായി ആളുകൾ നേരിടുന്ന പ്രതിസന്ധികളിൽ അടിയന്തര ഭക്ഷണവും സഹായവും നൽകുന്നു.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Briefcase,
      title: "വ്യക്തിപരവും കുടുംബപരവുമായ സഹായം",
      description: "ആവശ്യങ്ങൾ ഉള്ളവരെയും പ്രതിസന്ധിയിലായവരെയും സഹായിക്കുന്നു.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "വിദ്യാഭ്യാസ & ആരോഗ്യ പിന്തുണ",
      description:
        "കുട്ടികളുടെ വിദ്യാഭ്യാസം, വൈദ്യസഹായം, മാനസിക പിന്തുണ എന്നിവ നൽകുന്നു.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const goals = [
    {
      icon: Target,
      title: "നല്ല സ്വാധീനം",
      description:
        "വിശ്വാസത്തിനപ്പുറം സമൂഹത്തിലെ എല്ലാ വിഭാഗം ആളുകളിലും നല്ല സ്വാധീനം ചെലുത്താൻ പ്രതിജ്ഞാബദ്ധം.",
    },
    {
      icon: TrendingUp,
      title: "കഴിവുകളുടെ വികസനം",
      description:
        "ദുർബലരായ ആളുകൾക്ക് അവരുടെ കഴിവുകൾ പൂർണ്ണമായി ഉപയോഗിക്കാൻ സാഹചര്യം ഒരുക്കുന്നു.",
    },
    {
      icon: Home,
      title: "കമ്മ്യൂണിറ്റി പ്രോജക്റ്റുകൾ",
      description:
        "അയൽപക്കങ്ങളിലെ പ്രത്യേക ആവശ്യങ്ങൾ നിറവേറ്റുന്നതിനായി സജീവമായി പ്രവർത്തിക്കുന്നു.",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format"
            alt="Community helping hands"
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
            <Sparkles size={14} /> Community Outreach
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Divine Hands
            <span className="block text-amber-400 text-2xl md:text-3xl mt-2">
              (Hands of Hope & Service)
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto"
          >
            ക്രിസ്തീയ സ്നേഹം പ്രവൃത്തിയിലൂടെ കാണിച്ചുകൊണ്ട് സമൂഹത്തിൽ നല്ല
            മാറ്റങ്ങൾ വരുത്തുക.
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
              Join Our Mission <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/30"
          >
            <HeartHandshake className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              ദൗത്യം
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              ക്രിസ്തീയ സ്നേഹം പ്രവൃത്തിയിലൂടെ കാണിച്ചുകൊണ്ട് സമൂഹത്തിൽ നല്ല
              മാറ്റങ്ങൾ വരുത്തുക. ആവശ്യക്കാർക്ക് ഭക്ഷണം, വസ്ത്രം, വിദ്യാഭ്യാസം,
              ആരോഗ്യ പരിരക്ഷ എന്നിവ എത്തിക്കുക.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30"
          >
            <Eye className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              കാഴ്ചപ്പാട്
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              ക്രിസ്തു നമ്മെ സ്വതന്ത്രരാക്കിയത് ഏതൊരു സാഹചര്യത്തിലും ആളുകളെ
              സ്നേഹിക്കാനും കരുതാനും വേണ്ടിയാണ്. സമൂഹത്തിലെ എല്ലാ
              വിഭാഗത്തിലുമുള്ളവർക്കും പ്രത്യാശയും സഹായവും എത്തിക്കുന്ന ഒരു
              സംവിധാനം സൃഷ്ടിക്കുക.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              പ്രധാന സേവനങ്ങൾ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              Our Objectives
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              ലക്ഷ്യങ്ങൾ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {goals.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-to-br from-slate-100 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700"
              >
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                  <goal.icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Gallery (Community service images) */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              Divine Hands in Action
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              സേവനത്തിന്റെ ചിത്രങ്ങൾ
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649a6b?w=400&auto=format"
              alt="Food distribution"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1559027615-5c6f5c17d0a6?w=400&auto=format"
              alt="Medical camp"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1577563908411-1727d2f3bfbc?w=400&auto=format"
              alt="Children support"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&auto=format"
              alt="Community meeting"
              className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white">
              നിങ്ങളുടെ സഹായക്കൈ നീട്ടൂ
            </h2>
            <p className="text-xl text-white/90">
              സമൂഹത്തിൽ മാറ്റം സൃഷ്ടിക്കാൻ Divine Hands-നൊപ്പം ചേരൂ.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-all"
              >
                Volunteer Now <HeartHandshake size={18} />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-6 rounded-full transition-all"
              >
                Support Financially <HandHeart size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DivineHands;
