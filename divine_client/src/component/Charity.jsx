// src/pages/Charity.jsx (Updated with Donate & Help Projects)
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Calendar,
  Award,
  Users,
  GraduationCap,
  Utensils,
  HeartPulse,
  Home as HomeIcon,
  ArrowRight,
  Sparkles,
  CheckCircle,
  HandHelping,
  Droplet,
  Phone,
  DollarSign,
} from "lucide-react";

const Charity = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Timeline Data
  const timelineData = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "മനസ്താപമുള്ള ഒരു ഹൃദയത്തോടെ ജയിൽ തടവുകാർക്കിടയിലും അവരുടെ കുടുംബങ്ങൾക്കിടയിലും ചെറിയ രീതിയിലുള്ള ആശ്വാസപ്രവർത്തനങ്ങളോടെ തുടക്കം കുറിച്ചു.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      year: "2015",
      title: "Prison Fellowship & Education Support",
      description:
        "തടവുകാരുടെ മക്കൾക്ക് പഠനോപകരണങ്ങളും യൂണിഫോമും നൽകുന്ന പദ്ധതി വിപുലീകരിച്ചു. തീരദേശ മേഖലകളിലെ പാവപ്പെട്ട കുടുംബങ്ങളിലേക്ക് സഹായഹസ്തം എത്തിക്കാൻ തുടങ്ങി.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      year: "2020",
      title: "RCC Food Drive Launch",
      description:
        "തിരുവനന്തപുരം ആർ.സി.സി (RCC) ആശുപത്രിയിലെ രോഗികൾക്കും കൂട്ടിരിപ്പുകാർക്കുമായി മാസത്തിൽ 200 പേർക്ക് സൗജന്യ ഉച്ചഭക്ഷണം നൽകുന്ന പദ്ധതിക്ക് തുടക്കം കുറിച്ചു.",
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      year: "2024 - 2026",
      title: "Medical & Home Care Growth",
      description:
        "കിടപ്പിലായ രോഗികൾക്ക് മരുന്നുകൾ, വീൽചെയറുകൾ, വാട്ടർ ബെഡ്ഡുകൾ എന്നിവ വിതരണം ചെയ്യുന്നതിനൊപ്പം സാമ്പത്തികമായി പിന്നോക്കം നിൽക്കുന്ന കുടുംബങ്ങളിലെ പെൺകുട്ടികളുടെ വിവാഹ സഹായനിധി രൂപീകരിച്ചു.",
      icon: <HeartPulse className="w-5 h-5" />,
    },
  ];

  // Main Charity Projects (from original Charity.jsx)
  const projects = [
    {
      title: "ആർ.സി.സി ഉച്ചഭക്ഷണ പദ്ധതി",
      subtitle: "RCC Food Distribution",
      desc: "ക്യാൻസർ രോഗബാധിതർക്കും അവരുടെ കുടുംബങ്ങൾക്കും പ്രതിമാസം സ്നേഹത്തോടെയുള്ള ഉച്ചഭക്ഷണം എത്തിക്കുന്നു.",
      icon: <Utensils className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/10 to-teal-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "വിദ്യാഭ്യാസ പ്രോത്സാഹന നിധി",
      subtitle: "Education Fund",
      desc: "അർഹരായ വിദ്യാർത്ഥികൾക്ക് ഫീസ്, പുസ്തകങ്ങൾ, ഡിജിറ്റൽ പഠനോപകരണങ്ങൾ എന്നിവ നൽകി പിന്തുണയ്ക്കുന്നു.",
      icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
      color: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "സൗജന്യ മരുന്ന് വിതരണം",
      subtitle: "Medical Aid",
      desc: "മാറാവ്യാധികളാൽ ബുദ്ധിമുട്ടുന്ന നിർധനരായ രോഗികൾക്ക് പ്രതിമാസ മരുന്നുകളും ഹോം കെയർ സൗകര്യങ്ങളും ഉറപ്പാക്കുന്നു.",
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      color: "from-rose-500/10 to-red-500/10",
      border: "border-rose-500/20",
    },
    {
      title: "ഭവന നിർമ്മാണ പദ്ധതി (Future Project)",
      subtitle: "Divine Shelter Project",
      desc: "തീരദേശ-മലയോര മേഖലകളിൽ സ്വന്തമായി ഭൂമിയുണ്ടായിട്ടും വീടില്ലാത്ത നിർധന കുടുംബങ്ങൾക്ക് സുരക്ഷിതമായ ഭവനം ഒരുക്കുക.",
      icon: <HomeIcon className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-500/10 to-blue-500/10",
      border: "border-indigo-500/20",
      isFuture: true,
    },
  ];

  // Additional Help Projects (merged from ViewAllHelp)
  const helpProjects = [
    {
      id: 1,
      title: "Prison Outreach",
      description:
        "Educational support for children of prisoners, legal aid, and spiritual counseling.",
      icon: GraduationCap,
      color: "from-amber-500 to-orange-500",
      stats: "320+ families supported",
    },
    {
      id: 2,
      title: "Disaster Relief",
      description:
        "Emergency supplies, shelter, and rehabilitation during floods and cyclones.",
      icon: HandHelping,
      color: "from-blue-500 to-cyan-500",
      stats: "5 disaster responses",
    },
    {
      id: 3,
      title: "Orphanage Support",
      description:
        "Sponsorship for education, nutrition, and vocational training for orphans.",
      icon: HomeIcon,
      color: "from-purple-500 to-indigo-500",
      stats: "45 children sponsored",
    },
    {
      id: 4,
      title: "Clean Water Initiative",
      description:
        "Borewells and water filters for villages facing water scarcity.",
      icon: Droplet,
      color: "from-sky-500 to-blue-600",
      stats: "12 villages benefited",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-16 transition-colors duration-500">
      {/* Hero Section with Donate Button */}
      <section className="relative py-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format"
            alt="Charity Banner"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Heart size={12} className="fill-current" /> Divine Charity Trust
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              കരുണയോടെ <br />
              <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                കൂടെയുണ്ടാകാം
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-300 max-w-xl">
              കഴിഞ്ഞ 18 വർഷക്കാലമായി ജയിൽ തടവുകാർ, രോഗികൾ, തീരദേശവാസികൾ
              എന്നിവർക്കിടയിൽ യേശുക്രിസ്തുവിന്റെ സ്നേഹം പ്രവൃത്തിയിലൂടെ
              വെളിപ്പെടുത്തുന്ന ഒരു കാരുണ്യ പ്രസ്ഥാനം.
            </p>
            {/* Donate Button - Added here */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                <DollarSign size={18} /> Donate Now
              </Link>
              <Link
                to="/viewAllHelp"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all"
              >
                <Heart size={16} /> View All Help
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <h3 className="text-3xl font-black text-amber-400">18+</h3>
              <p className="text-xs text-slate-400 mt-1">Years of Service</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <h3 className="text-3xl font-black text-red-400">200+</h3>
              <p className="text-xs text-slate-400 mt-1">RCC Monthly Meals</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <h3 className="text-3xl font-black text-emerald-400">500+</h3>
              <p className="text-xs text-slate-400 mt-1">Students Helped</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
              <h3 className="text-3xl font-black text-indigo-400">1000+</h3>
              <p className="text-xs text-slate-400 mt-1">Families Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Projects Section (Original) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            പ്രധാന പദ്ധതികൾ & പ്രവർത്തനങ്ങൾ
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            നിങ്ങളുടെ പങ്കാളിത്തത്തോടെ ഞങ്ങൾ മുന്നോട്ട് കൊണ്ടുപോകുന്ന ജീവകാരുണ്യ
            പ്രവർത്തനങ്ങൾ
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-lg flex flex-col justify-between transition-all ${proj.border}`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${proj.color} mb-6`}
                >
                  {proj.icon}
                </div>
                {proj.isFuture && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full mb-2">
                    <Sparkles size={10} /> Upcoming Project
                  </span>
                )}
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {proj.title}
                </h3>
                <h5 className="text-xs text-slate-400 font-medium tracking-wider mt-0.5 mb-3 uppercase">
                  {proj.subtitle}
                </h5>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {proj.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-400">
                <CheckCircle size={14} className="text-emerald-500" /> Active
                Ministry Work
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Help Projects (merged from ViewAllHelp) */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              More Ways We Help
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Additional outreach programs supported by Divine Charity Trust
            </p>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} bg-opacity-10 flex items-center justify-center mb-4`}
                >
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  {project.description}
                </p>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              ചരിത്രവഴികൾ (Our Journey)
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              2010 മുതൽ ഇന്നുവരെയുള്ള കാരുണ്യപ്രവർത്തനങ്ങളുടെ ഒരു ലഘുചിത്രം
            </p>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
            {timelineData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 group"
              >
                <div className="absolute -left-4 md:-left-36 top-1 md:text-right w-24 hidden md:block">
                  <span className="text-xl font-black bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                    {item.year}
                  </span>
                </div>
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-amber-500 flex items-center justify-center text-amber-500 shadow-md group-hover:bg-amber-500 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400 md:hidden block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support / Bank Details + Donate CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 fill-current animate-pulse" />
            <h2 className="text-2xl md:text-4xl font-black mb-4">
              ഈ നന്മയിൽ പങ്കാളിയാകൂ!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed">
              ഡിവൈൻ ചാരിറ്റി ട്രസ്റ്റിന്റെ പ്രവർത്തനങ്ങൾ പൂർണ്ണമായും ജനങ്ങളുടെ
              സ്നേഹസഹകരണങ്ങൾ കൊണ്ടാണ് നടന്നുപോകുന്നത്. നിങ്ങളുടെ ഒരു ചെറിയ സഹായം
              പോലും ഒരു കുടുംബത്തിന് വലിയ പ്രത്യാശയായി മാറും.
            </p>

            {/* Bank Details */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3 font-mono text-xs sm:text-sm max-w-md mx-auto backdrop-blur-md">
              <div className="text-amber-400 font-bold tracking-wider uppercase border-b border-white/10 pb-2 mb-2 font-sans">
                Bank Account Details
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Account Name:</span>{" "}
                <span className="text-white font-bold">
                  DIVINE CHARITY TRUST
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Account No:</span>{" "}
                <span className="text-white font-bold tracking-wider">
                  XXXXXXXXXXXXX
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Bank:</span>{" "}
                <span className="text-white">Federal Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">IFSC Code:</span>{" "}
                <span className="text-amber-300 font-bold">FDRL00XXXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Branch:</span>{" "}
                <span className="text-white">Thiruvananthapuram</span>
              </div>
            </div>

            {/* Donate Button again */}
            <div className="mt-8">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                <DollarSign size={20} /> Donate Now
              </Link>
            </div>

            <div className="mt-6 text-[11px] text-slate-400">
              * എല്ലാ സംഭാവനകൾക്കും കൃത്യമായ രസീതുകൾ നൽകുന്നതായിരിക്കും. കൂടുതൽ
              വിവരങ്ങൾക്ക് ഓഫീസുമായി ബന്ധപ്പെടുക.
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Charity;
