// src/pages/Home.jsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Calendar,
  Music,
  Heart,
  Users,
  Star,
  Shield,
  Flame,
  GraduationCap,
  Utensils,
  HeartPulse,
} from "lucide-react";
import { useYouTubeVideos } from "./useYouTubeVideos";
import PasterLorence from "../assets/paster1.jpg";
const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { videos } = useYouTubeVideos(); // dynamic YouTube videos

  // Smooth scroll to YouTube section
  const smoothScrollToYouTube = () => {
    const section = document.getElementById("youtube-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Animation variants
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

  const ministries = [
    {
      title: "K.I.D.S & Youth",
      description:
        "Nurturing the next generation with faith, fun, and fellowship. Weekly activities and mentoring.",
      icon: Users,
      link: "/ministries/kids",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "M.I.C",
      description:
        "Men In Christ – building strong spiritual leaders through Bible study and accountability.",
      icon: Shield,
      link: "/ministries/mic",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "EmpowHer",
      description:
        "Women's ministry empowering ladies through prayer, workshops, and community outreach.",
      icon: Heart,
      link: "/ministries/empowher",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const events = [
    {
      title: "SHINUI FAMILY BLESSING MEETING",
      date: "June 15, 2026 | 6:00 PM",
      description:
        "A special gathering for families to receive blessings and prophetic prayers.",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format",
      watchLink: "/watch/shinui",
    },
    {
      title: "21 DAYS FASTING PRAYER",
      date: "July 1 – July 21, 2026",
      description:
        "Join us daily for corporate prayer and fasting. Live on YouTube & Zoom.",
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format",
      watchLink: "/watch/fasting",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&auto=format"
            alt="Bible background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />

        <motion.div
          style={{ opacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm font-semibold mb-6"
          >
            <Star size={14} /> Welcome to Divine Ministries
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            ENRICHING & <br />
            <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
              EMPOWERING PEOPLE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto">
            A very warm welcome – experience God's love, grow in faith, and make
            a difference.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            {/* Watch Online button now scrolls to YouTube section */}
            <button
              onClick={smoothScrollToYouTube}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Play size={20} fill="white" />
              Watch Online
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* PRAYER & CHARITY BENTO GRID */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              Our Vision & Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              PRAYER & CHARITY
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm sm:text-base">
              ആത്മീയ വളർച്ചയ്ക്കും സാമൂഹിക നന്മയ്ക്കുമായി ഞങ്ങൾ ചെയ്യുന്ന പ്രധാന
              രണ്ട് ശുശ്രൂഷകൾ.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* PRAYER MINI-BLOCK */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div>
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/50 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <Flame size={28} className="animate-pulse" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
                  Divine Prayer <br />
                  Ministries
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  ആത്മീയ അഭി വൃദ്ധി ലക്ഷ്യമാക്കി മുക്കോല ജംഗ്ഷന് സമീപമുള്ള ഡിവൈൻ
                  ചർച്ച് ഹാളിൽ കൺവെൻഷനുകളും കുടുംബ പ്രാർത്ഥനകളും നടക്കുന്നു.
                  നിങ്ങളുടെ പ്രാർത്ഥനാ വിഷയങ്ങൾ ഞങ്ങളെ അറിയിക്കുക.
                </p>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <Calendar size={14} className="text-amber-500" />
                  എല്ലാ ശനിയാഴ്ച രാവിലെ 10:00 മണിക്ക്
                </div>
                <Link
                  to="/prayer-request"
                  className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:gap-3 transition-all text-sm group-hover:text-amber-700"
                >
                  Submit Prayer Request <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* CHARITY GRID BLOCK */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400">
                    <Heart size={28} className="fill-current" />
                  </div>
                  <span className="text-xs font-bold tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    SINCE 2010
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Divine Charity Trust
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-8">
                  കഴിഞ്ഞ 18 വർഷക്കാലമായി ജയിൽ തടവുകാർ, രോഗികൾ, തീരദേശവാസികൾ
                  എന്നിവർക്കിടയിൽ പ്രവർത്തിക്കുന്ന ചാരിറ്റി സംഘടന.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <GraduationCap className="text-amber-400 w-6 h-6 mb-2" />
                    <h5 className="font-bold text-xs text-slate-200">
                      Prison Outreach
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      കുട്ടികൾക്ക് പഠനോപകരണങ്ങൾ
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <Utensils className="text-emerald-400 w-6 h-6 mb-2" />
                    <h5 className="font-bold text-xs text-slate-200">
                      RCC Food Drive
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      മാസത്തിൽ 200 പേർക്ക് ഭക്ഷണം
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <HeartPulse className="text-rose-400 w-6 h-6 mb-2" />
                    <h5 className="font-bold text-xs text-slate-200">
                      Patient Care
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      സൗജന്യ ഹോം കെയർ, മരുന്ന്
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Join hands to support
                </span>
                <div className="flex gap-3">
                  <Link
                    to="/charity"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-lg transition-all"
                  >
                    View All Projects <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/viewAllHelp"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    View All Help <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
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
              OUR MINISTRIES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {ministries.map((ministry, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${ministry.color}`}
                />
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ministry.icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {ministry.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {ministry.description}
                  </p>
                  <Link
                    to={ministry.link}
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* ബാക്ക്ഗ്രൗണ്ടിലുള്ള ഗ്ലോ എഫക്റ്റ് */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-3xl blur-2xl" />

              {/* 2. ഇവിടെ src-ലേക്ക് നമ്മൾ ഇമ്പോർട്ട് ചെയ്ത വേരിയബിൾ (PasterLorence) കൊടുക്കുക */}
              <img
                src={PasterLorence}
                alt="Pr. Lorence Joseph"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
                ഞങ്ങളുടെ സ്ഥാപകൻ
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Pr. ലോറൻസ് ജോസഫ്
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />

              {/* 2026 Trending Catchy Text Logic */}
              <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent leading-relaxed">
                "കഴിഞ്ഞ 18 വർഷമായി, ഇരുളടഞ്ഞ ജയിൽ അറകൾ മുതൽ ഹോസ്പിറ്റൽ വാർഡുകൾ
                വരെ പ്രത്യാശയുടെ വെളിച്ചമെത്തിക്കുന്ന കാരുണ്യവഴി."
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                അശരണരായ തടവുകാരുടെ പുനരധിവാസം, അവരുടെ മക്കളുടെ വിദ്യാഭ്യാസം,
                RCC-യിലെ രോഗികൾക്കുള്ള ഭക്ഷണവിതരണം, വിധവകൾക്കുള്ള ആശ്വാസകിറ്റുകൾ
                തുടങ്ങി സമൂഹത്തിന്റെ ഏറ്റവും താഴേത്തട്ടിലുള്ളവർക്കായി **Divine
                Ministry Charitable Trust**-ലൂടെ അദ്ദേഹം നടത്തുന്ന പ്രവർത്തനങ്ങൾ
                ആയിരങ്ങളുടെ ജീവിതമാണ് മാറ്റിമറിച്ചത്.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-600/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
              >
                കൂടുതൽ അറിയുക <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider">
              Join Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              Special Events & Announcements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm mb-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-5">
                    {event.description}
                  </p>
                  <Link
                    to={event.watchLink}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-2.5 px-5 rounded-full transition-all group-hover:shadow-lg"
                  >
                    Watch Now <Play size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music / Media Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-slate-900 dark:bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Music className="w-16 h-16 text-amber-400 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Experience the message of Christ through music
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let worship fill your home. Our music ministry brings you original
              songs, hymns, and live sessions that uplift your spirit.
            </p>
            <Link
              to="/media"
              className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-2xl"
            >
              <Play size={20} fill="white" />
              Listen Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* YouTube Videos Section (Dynamic, with id for smooth scroll) */}
      <section
        id="youtube-section"
        className="py-24 px-6 bg-white dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
              Watch & Be Blessed
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
              LATEST YOUTUBE VIDEOS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 max-w-xl mx-auto mt-4">
              ഞങ്ങളുടെ ഏറ്റവും പുതിയ പ്രസംഗങ്ങളും ആരാധന ഗാനങ്ങളും കാണുക
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {video.date} • {video.views}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buttons: Subscribe & Admin Add Video */}
          <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.youtube.com/c/YourChannelID" // change to your channel link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
            >
              <Play size={18} fill="white" />
              Subscribe on YouTube
            </a>
            <Link
              to="/createYoutube"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
            >
              <Play size={18} fill="white" />
              Admin: Add Video
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// // src/pages/Home.jsx
// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Play,
//   ArrowRight,
//   Calendar,
//   Music,
//   Heart,
//   Users,
//   Star,
//   Shield,
//   Flame,
//   GraduationCap,
//   Utensils,
//   HeartPulse,
// } from "lucide-react";
// const youtubeVideos = [
//   {
//     id: "dQw4w9WgXcQ", // നിങ്ങളുടെ ആദ്യത്തെ വീഡിയോ
//     title: "ശക്തമായ പ്രാർത്ഥന സമ്മേളനം",
//     date: "2 days ago",
//     views: "1.2k views",
//   },
//   {
//     id: "abc123xyz",
//     title: "കുടുംബ അനുഗ്രഹ യോഗം",
//     date: "1 week ago",
//     views: "3.4k views",
//   },
//   {
//     id: "pqr789uvw",
//     title: "സ്തുതി ആരാധന – Live Session",
//     date: "3 weeks ago",
//     views: "852 views",
//   },
//   // 👇 നിങ്ങൾ ചോദിച്ച പുതിയ വീഡിയോ (Devadoothan 4K Remastered) ഇവിടെ ആഡ് ചെയ്തിട്ടുണ്ട്
//   {
//     id: "HOafjOSRcso",
//     title: "Devadoothan 4K Remastered Version Full Movie",
//     date: "5 days ago",
//     views: "205k views",
//   },
// ];
// const Home = () => {
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   // Animation variants
//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
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

//   const ministries = [
//     {
//       title: "K.I.D.S & Youth",
//       description:
//         "Nurturing the next generation with faith, fun, and fellowship. Weekly activities and mentoring.",
//       icon: Users,
//       link: "/ministries/kids",
//       color: "from-amber-500 to-orange-500",
//     },
//     {
//       title: "M.I.C",
//       description:
//         "Men In Christ – building strong spiritual leaders through Bible study and accountability.",
//       icon: Shield,
//       link: "/ministries/mic",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       title: "EmpowHer",
//       description:
//         "Women's ministry empowering ladies through prayer, workshops, and community outreach.",
//       icon: Heart,
//       link: "/ministries/empowher",
//       color: "from-pink-500 to-rose-500",
//     },
//   ];

//   const events = [
//     {
//       title: "SHINUI FAMILY BLESSING MEETING",
//       date: "June 15, 2026 | 6:00 PM",
//       description:
//         "A special gathering for families to receive blessings and prophetic prayers.",
//       image:
//         "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format",
//       watchLink: "/watch/shinui",
//     },
//     {
//       title: "21 DAYS FASTING PRAYER",
//       date: "July 1 – July 21, 2026",
//       description:
//         "Join us daily for corporate prayer and fasting. Live on YouTube & Zoom.",
//       image:
//         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format",
//       watchLink: "/watch/fasting",
//     },
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&auto=format"
//             alt="Bible background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
//         </div>

//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />

//         <motion.div
//           style={{ opacity }}
//           className="relative z-10 text-center px-6 max-w-4xl mx-auto"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm font-semibold mb-6"
//           >
//             <Star size={14} /> Welcome to Divine Ministries
//           </motion.div>
//           <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
//             ENRICHING & <br />
//             <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
//               EMPOWERING PEOPLE
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto">
//             A very warm welcome – experience God's love, grow in faith, and make
//             a difference.
//           </p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-10"
//           >
//             <Link
//               to="/watch"
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
//             >
//               <Play size={20} fill="white" />
//               Watch Online
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* --- CORE PILLARS: PRAYER & CHARITY BENTO GRID (from first version) --- */}
//       <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
//               Our Vision & Mission
//             </span>
//             <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
//               PRAYER & CHARITY
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
//             <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm sm:text-base">
//               ആത്മീയ വളർച്ചയ്ക്കും സാമൂഹിക നന്മയ്ക്കുമായി ഞങ്ങൾ ചെയ്യുന്ന പ്രധാന
//               രണ്ട് ശുശ്രൂഷകൾ.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-12 gap-8 items-stretch">
//             {/* PRAYER MINI-BLOCK */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between group relative overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
//               <div>
//                 <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/50 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
//                   <Flame size={28} className="animate-pulse" />
//                 </div>
//                 <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
//                   Divine Prayer <br />
//                   Ministries
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
//                   ആത്മീയ അഭി വൃദ്ധി ലക്ഷ്യമാക്കി മുക്കോല ജംഗ്ഷന് സമീപമുള്ള ഡിവൈൻ
//                   ചർച്ച് ഹാളിൽ കൺവെൻഷനുകളും കുടുംബ പ്രാർത്ഥനകളും നടക്കുന്നു.
//                   നിങ്ങളുടെ പ്രാർത്ഥനാ വിഷയങ്ങൾ ഞങ്ങളെ അറിയിക്കുക.
//                 </p>
//               </div>
//               <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
//                   <Calendar size={14} className="text-amber-500" />
//                   എല്ലാ ശനിയാഴ്ച രാവിലെ 10:00 മണിക്ക്
//                 </div>
//                 <Link
//                   to="/prayer-request"
//                   className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:gap-3 transition-all text-sm group-hover:text-amber-700"
//                 >
//                   Submit Prayer Request <ArrowRight size={16} />
//                 </Link>
//               </div>
//             </motion.div>

//             {/* CHARITY GRID BLOCK */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between group relative overflow-hidden"
//             >
//               <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
//               <div>
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//                   <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400">
//                     <Heart size={28} className="fill-current" />
//                   </div>
//                   <span className="text-xs font-bold tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
//                     SINCE 2010
//                   </span>
//                 </div>
//                 <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
//                   Divine Charity Trust
//                 </h3>
//                 <p className="text-slate-400 text-xs sm:text-sm mb-8">
//                   കഴിഞ്ഞ 18 വർഷക്കാലമായി ജയിൽ തടവുകാർ, രോഗികൾ, തീരദേശവാസികൾ
//                   എന്നിവർക്കിടയിൽ പ്രവർത്തിക്കുന്ന ചാരിറ്റി സംഘടന.
//                 </p>

//                 {/* Micro Bento Features */}
//                 <div className="grid sm:grid-cols-3 gap-4 mb-8">
//                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
//                     <GraduationCap className="text-amber-400 w-6 h-6 mb-2" />
//                     <h5 className="font-bold text-xs text-slate-200">
//                       Prison Outreach
//                     </h5>
//                     <p className="text-[11px] text-slate-400 mt-1">
//                       കുട്ടികൾക്ക് പഠനോപകരണങ്ങൾ
//                     </p>
//                   </div>
//                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
//                     <Utensils className="text-emerald-400 w-6 h-6 mb-2" />
//                     <h5 className="font-bold text-xs text-slate-200">
//                       RCC Food Drive
//                     </h5>
//                     <p className="text-[11px] text-slate-400 mt-1">
//                       മാസത്തിൽ 200 പേർക്ക് ഭക്ഷണം
//                     </p>
//                   </div>
//                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
//                     <HeartPulse className="text-rose-400 w-6 h-6 mb-2" />
//                     <h5 className="font-bold text-xs text-slate-200">
//                       Patient Care
//                     </h5>
//                     <p className="text-[11px] text-slate-400 mt-1">
//                       സൗജന്യ ഹോം കെയർ, മരുന്ന്
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
//                 <span className="text-xs font-medium text-slate-400">
//                   Join hands to support
//                 </span>
//                 <div className="flex gap-3">
//                   <Link
//                     to="/charity"
//                     className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-lg transition-all"
//                   >
//                     View All Projects <ArrowRight size={14} />
//                   </Link>
//                   {/* New button: View All Help -> redirects to /viewAllHelp */}
//                   <Link
//                     to="/viewAllHelp"
//                     className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all"
//                   >
//                     View All Help <ArrowRight size={14} />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Ministries Section (from second version) */}
//       <section className="py-24 px-6 bg-white dark:bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
//               Our Focus
//             </span>
//             <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
//               OUR MINISTRIES
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
//           </motion.div>

//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid md:grid-cols-3 gap-8"
//           >
//             {ministries.map((ministry, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={fadeUp}
//                 whileHover={{ y: -10 }}
//                 className="group relative bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
//               >
//                 <div
//                   className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${ministry.color}`}
//                 />
//                 <div className="p-8">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                     <ministry.icon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
//                     {ministry.title}
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-300 mb-6">
//                     {ministry.description}
//                   </p>
//                   <Link
//                     to={ministry.link}
//                     className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3 transition-all"
//                   >
//                     Read More <ArrowRight size={16} />
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Founder Section */}
//       <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-3xl blur-2xl" />
//               <img
//                 src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&auto=format"
//                 alt="Pr. Lorence Joseph"
//                 className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
//               />
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-6"
//             >
//               <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider">
//                 ഞങ്ങളുടെ സ്ഥാപകൻ
//               </span>
//               <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
//                 പ്രൈ. ലോറൻസ് ജോസഫ്
//               </h2>
//               <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />
//               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
//                 18 വർഷത്തിലധികം ശുശ്രൂഷാ പരിചയമുള്ള ദീർഘവീക്ഷണമുള്ള നേതാവും,
//                 എഴുത്തുകാരനും, പ്രസംഗകനുമാണ് പ്രൈ. ലോറൻസ് ജോസഫ്. അദ്ദേഹത്തിന്റെ
//                 കരുണാനിർഭരമായ പ്രബോധനങ്ങളിലൂടെയും, പ്രവാചക ഉൾക്കാഴ്ചകളിലൂടെയും,
//                 കുടുംബങ്ങളുടെ പുനഃസ്ഥാപനത്തിന് നൽകുന്ന പ്രാധാന്യത്തിലൂടെയും
//                 ആയിരക്കണക്കിന് ആളുകളെ അദ്ദേഹം സ്വാധീനിച്ചിട്ടുണ്ട്.
//               </p>
//               <p className="text-slate-600 dark:text-slate-300">
//                 തകർന്നവരോടും നഷ്ടപ്പെട്ടവരോടുമുള്ള അദ്ദേഹത്തിന്റെ തീക്ഷ്ണമായ
//                 സ്നേഹം, രാജ്യമെമ്പാടും നിരവധി കമ്മ്യൂണിറ്റി ഔട്ട്‌റീച്ച്
//                 പ്രോഗ്രാമുകൾക്കും, സഭകൾ സ്ഥാപിക്കുന്നതിനും, നേതൃത്വ
//                 പരിശീലനങ്ങൾക്കും വഴിയൊരുക്കി.
//               </p>
//               <Link
//                 to="/about"
//                 className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-full transition-all"
//               >
//                 കൂടുതൽ അറിയുക <ArrowRight size={18} />
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Special Events Section */}
//       <section className="py-24 px-6 bg-gradient-to-br from-slate-100 to-amber-50 dark:from-slate-900 dark:to-slate-800/50">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider">
//               Join Us
//             </span>
//             <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
//               Special Events & Announcements
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {events.map((event, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.2 }}
//                 whileHover={{ y: -8 }}
//                 className="group bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
//               >
//                 <div className="relative h-56 overflow-hidden">
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm mb-2">
//                     <Calendar size={16} />
//                     <span>{event.date}</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
//                     {event.title}
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-300 mb-5">
//                     {event.description}
//                   </p>
//                   <Link
//                     to={event.watchLink}
//                     className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold py-2.5 px-5 rounded-full transition-all group-hover:shadow-lg"
//                   >
//                     Watch Now <Play size={16} />
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Music / Media Section */}
//       <section className="py-32 px-6 relative overflow-hidden bg-slate-900 dark:bg-black">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
//         </div>
//         <div className="relative max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <Music className="w-16 h-16 text-amber-400 mx-auto" />
//             <h2 className="text-4xl md:text-5xl font-black text-white">
//               Experience the message of Christ through music
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Let worship fill your home. Our music ministry brings you original
//               songs, hymns, and live sessions that uplift your spirit.
//             </p>
//             <Link
//               to="/media"
//               className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-2xl"
//             >
//               <Play size={20} fill="white" />
//               Listen Now
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//       {/* --- YouTube Videos Section (Dynamic) --- */}
//       <section className="py-24 px-6 bg-white dark:bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase">
//               Watch & Be Blessed
//             </span>
//             <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">
//               LATEST YOUTUBE VIDEOS
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
//             <p className="text-slate-500 max-w-xl mx-auto mt-4">
//               ഞങ്ങളുടെ ഏറ്റവും പുതിയ പ്രസംഗങ്ങളും ആരാധന ഗാനങ്ങളും കാണുക
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {youtubeVideos.map((video, index) => (
//               <motion.div
//                 key={video.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
//               >
//                 <div className="relative pb-[56.25%] h-0">
//                   <iframe
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={`https://www.youtube.com/embed/${video.id}?rel=0`}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">
//                     {video.title}
//                   </h3>
//                   <p className="text-sm text-slate-500 dark:text-slate-400">
//                     {video.date} • {video.views}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* YouTube Channel Button */}
//           <div className="text-center mt-12">
//             <a
//               href="https://www.youtube.com/c/YourChannelID" // ഇവിടെ നിങ്ങളുടെ ചാനൽ ലിങ്ക് ഇടുക
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
//             >
//               <Play size={18} fill="white" />
//               Subscribe on YouTube
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
