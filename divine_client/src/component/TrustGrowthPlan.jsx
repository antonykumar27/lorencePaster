import React, { useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0 25px 35px -12px rgba(0,0,0,0.2)",
  transition: { type: "spring", stiffness: 300 },
};

// Re-optimized 6-Phase Roadmap with exact Traffic, Social Media & AI Integration
const phases = [
  {
    phase: "Phase 1",
    title: "ഡിജിറ്റൽ അടിത്തറ & സുതാര്യത",
    month: "Month 1",
    tasks: [
      "🌐 മെമ്പർ പോർട്ടൽ + വിട്ടുപോയവർക്കായി Rejoin സിസ്റ്റം",
      "💳 ഓൺലൈൻ ഡൊണേഷൻ ഗേറ്റ്‌വേ (UPI, Cards, NetBanking, International Pay)",
      "📑 ട്രസ്റ്റിന്റെ മുൻകാല പ്രവർത്തനങ്ങളുടെ ഇൻ്ററാക്ടീവ് ഗാലറി",
      "📊 സുതാര്യത ഉറപ്പാക്കുന്ന ഫിനാൻഷ്യൽ ഓഡിറ്റ് ഡാഷ്‌ബോർഡ്",
    ],
    icon: "🌐",
    color: "from-purple-600 to-indigo-600",
  },
  {
    phase: "Phase 2",
    title: "ആത്മീയ ഡിജിറ്റൽ അനുഭവം (Spiritual Engagement)",
    month: "Month 2",
    tasks: [
      "📡 24/7 ലൈവ് പ്രാർത്ഥനാ വാൾ & വെർച്വൽ പ്രെയർ റിക്വസ്റ്റ് കൗണ്ടർ",
      "📅 ആത്മീയ പരിപാടികളുടെയും കൺവെൻഷനുകളുടെയും ലൈവ് ഡിജിറ്റൽ കലണ്ടർ",
      "🎧 ഡെയ്‌ലി പോഡ്‌കാസ്റ്റ് / ഓഡിയോ വചന സിസ്റ്റം ഫോണിൽ കേൾക്കാനുള്ള സൗകര്യം",
    ],
    icon: "🙏",
    color: "from-cyan-500 to-blue-600",
  },
  {
    phase: "Phase 3",
    title: "വിദ്യാഭ്യാസം & തൊഴിൽ സഹായ വേദി",
    month: "Month 3",
    tasks: [
      "💼 Member Job Board: അംഗങ്ങൾക്കായി പ്രത്യേക ഒപ്പോർച്ചൂണിറ്റി പോർട്ടൽ",
      "📚 വിദ്യാ നിധി: സ്കോളർഷിപ്പുകളും കരിയർ ഗൈഡൻസും",
      "🛠️ സ്കിൽ ഹബ്ബ്: സൗജന്യ കമ്പ്യൂട്ടർ/തൊഴിലധിഷ്ഠിത ഓൺലൈൻ സർട്ടിഫിക്കേഷൻ",
      "🤝 സ്വയംസഹായ ഗ്രൂപ്പുകൾ (SHG) വഴി ചെറുകിട വരുമാന മാർഗ്ഗങ്ങൾ",
    ],
    icon: "💼",
    color: "from-blue-500 to-cyan-500",
  },
  {
    phase: "Phase 4",
    title: "ഗവൺമെന്റ് അംഗീകാരങ്ങളും CSR ഫണ്ടിംഗും",
    month: "Month 4",
    tasks: [
      "📜 12A & 80G രജിസ്ട്രേഷൻ (ദാതാക്കൾക്ക് നികുതി ഇളവ് നൽകാൻ)",
      "🏢 CSR-1 ഫയലിംഗ് വഴി വൻകിട കോർപ്പറേറ്റ് ഫണ്ട് ഉറപ്പാക്കൽ",
      "🏛️ NGO Darpan രജിസ്ട്രേഷൻ വഴി കേന്ദ്ര-സംസ്ഥാന ഗവൺമെന്റ് ഗ്രാന്റുകൾ",
      "🌍 NRI വിദേശ ഫണ്ടിംഗിന് ആവശ്യമായ ലീഗൽ കംപ്ലയൻസ് സപ്പോർട്ട്",
    ],
    icon: "🏛️",
    color: "from-violet-600 to-purple-800",
  },
  {
    phase: "Phase 5",
    title: "Traffic, Social Media & Analytics",
    month: "Month 3–6 (Ongoing)",
    tasks: [
      "📈 SEO & Content Marketing – 30+ prayer blogs, backlinks from 10+ directories",
      "📱 Social Media Management – Daily Reels/Shorts, Weekly Live, WhatsApp automation",
      "🤖 AI Prayer Bot (WhatsApp/Telegram) – 24/7 engagement",
      "📊 Monthly Dashboard – Traffic sources, new members, donation funnel analysis",
    ],
    icon: "📱",
    color: "from-pink-500 to-rose-500",
  },
  {
    phase: "Phase 6",
    title: "ആഗോള വളർച്ചയും സുസ്ഥിരതയും",
    month: "Month 6",
    tasks: [
      "📈 2,000+ സജീവ അംഗങ്ങൾ എന്ന ലക്ഷ്യം കൈവരിക്കൽ",
      "🌍 ഗ്ലോബൽ മലയാളി നെറ്റ്‌വർക്ക് (NRIs) പ്രാർത്ഥനാ സമിതികൾ",
      "🍛 പ്രതിമാസ അന്നദാനവും സൗജന്യ മെഡിക്കൽ ക്യാമ്പുകളും",
      "🔄 മാസം 50 രൂപ വരിസംഖ്യയിലൂടെ സ്ഥിര വരുമാന മോഡൽ",
    ],
    icon: "🚀",
    color: "from-emerald-500 to-teal-500",
  },
];

const stats = [
  { value: "2000+", label: "അംഗങ്ങൾ (Target)", icon: "👥" },
  { value: "100%", label: "സുതാര്യത (80G/CSR)", icon: "📜" },
  { value: "10x", label: "ട്രാഫിക് ഗ്രോത്ത് (SEO)", icon: "📈" },
  { value: "₹50/മാസം", label: "സുസ്ഥിര മൈക്രോ ഫണ്ട്", icon: "💰" },
];

const TrustGrowthPlan = () => {
  const [hoveredPhase, setHoveredPhase] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg"
          >
            ✨ Divine Charitable Trust — Next-Gen Vision 2026 ✨
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent mb-4 leading-tight">
            പ്രാർത്ഥന, സേവനം, ഉന്നമനം
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ഡിജിറ്റൽ സാങ്കേതികവിദ്യയിലൂടെയും സോഷ്യൽ മീഡിയ മാർക്കറ്റിംഗിലൂടെയും
            സമൂഹത്തെ ഒന്നിപ്പിക്കാനും ട്രസ്റ്റിനെ പുതിയ
            ഉയരങ്ങളിലെത്തിക്കാനുമുള്ള 360° മാസ്റ്റർ പ്ലാൻ.
          </p>
        </motion.div>

        {/* Highlighted Core Vision Statement Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-0.5 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-xl mb-16 max-w-4xl mx-auto overflow-hidden"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] p-6 md:p-10 text-center relative z-10">
            <span className="text-4xl md:text-5xl block mb-4">🎯</span>
            <h2 className="text-indigo-900 font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
              നമ്മുടെ ലക്ഷ്യം (Our Core Vision)
            </h2>
            <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed md:leading-loose">
              "നമ്മൾ വെറുമൊരു ചാരിറ്റി വെബ്സൈറ്റ് അല്ല ഉണ്ടാക്കുന്നത്. നമ്മുടെ
              സഭയിലെ/ട്രസ്റ്റിലെ പ്രാർത്ഥനകൾക്കൊപ്പം തന്നെ, നമ്മുടെ കുട്ടികൾക്ക്
              നല്ല{" "}
              <span className="text-purple-700 underline decoration-purple-300 decoration-wavy">
                വിദ്യാഭ്യാസവും
              </span>
              , യുവാക്കൾക്ക് നല്ല{" "}
              <span className="text-indigo-700 underline decoration-indigo-300 decoration-wavy">
                ജോലിയും
              </span>{" "}
              ഉറപ്പാക്കുന്ന, അതോടൊപ്പം വൻകിട കമ്പനികളുടെ{" "}
              <span className="text-blue-700 font-extrabold">CSR ഫണ്ടും</span>{" "}
              ഗവൺമെന്റ് ഗ്രാന്റുകളും വാങ്ങാൻ തക്ക സുതാര്യതയുള്ള ഒരു{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-black">
                'Digital Empowerment Platform'
              </span>{" "}
              ആണ് നമ്മൾ നിർമ്മിക്കുന്നത്."
            </p>
          </div>
          <div className="absolute -inset-10 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full blur-2xl opacity-30 -z-10 pointer-events-none" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center shadow-md border border-indigo-50"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-indigo-900">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Roadmap */}
        <div className="relative mb-20">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-indigo-400 to-emerald-400 h-full z-0" />
          <div className="space-y-12 relative">
            {phases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-md z-10" />

                <div
                  className={`w-full md:w-5/12 ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                >
                  <motion.div
                    whileHover={cardHover}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer"
                    onMouseEnter={() => setHoveredPhase(idx)}
                    onMouseLeave={() => setHoveredPhase(null)}
                  >
                    <div
                      className={`bg-gradient-to-r ${phase.color} p-4 text-white`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-2xl">{phase.icon}</div>
                        <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                          {phase.month}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mt-2">
                        {phase.phase} : {phase.title}
                      </h3>
                    </div>
                    <div className="p-5 bg-white">
                      <ul className="space-y-3">
                        {phase.tasks.map((task, tIdx) => (
                          <motion.li
                            key={tIdx}
                            className="flex items-start gap-2 text-gray-700 text-sm md:text-base"
                          >
                            <span className="text-indigo-500 mt-1 text-xs">
                              🔹
                            </span>
                            <span className="leading-snug">{task}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Digital Growth & Social Media Strategy - Integrated New Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white rounded-3xl p-8 mb-16 shadow-xl border border-purple-100"
        >
          <div className="text-center mb-8">
            <span className="text-5xl">📈📱</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
              Traffic, Social Media & Modern Trends
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-2">
              Trust വളരണമെങ്കിൽ website traffic, social media engagement, and
              current digital trends ഒഴിവാക്കാൻ പറ്റില്ല. ഞങ്ങളുടെ
              research‑based plan ഇതാണ്.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Traffic + SEO */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔍</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Website Traffic & SEO
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-1.5">
                    <li>
                      Prayer‑based keywords (“നോവേന”, “പ്രാർത്ഥനാ അഭ്യർത്ഥന”) –
                      Google rank ചെയ്യും
                    </li>
                    <li>
                      Blog posts: “How to pray”, “Charity success stories” –
                      weekly 2 posts
                    </li>
                    <li>
                      Backlinks from church directories & local NGO listing
                      sites
                    </li>
                    <li>
                      Google Search Console + Analytics 4 setup – realtime
                      tracking
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Monthly Performance Dashboard
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-1.5">
                    <li>New members joined, donation growth, page views</li>
                    <li>Top traffic sources (YouTube, WhatsApp, Google)</li>
                    <li>Client‑friendly PDF report every month</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Social Media + Trends */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Social Media Marketing
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-1.5">
                    <li>
                      <span className="font-semibold text-purple-900">
                        YouTube:
                      </span>{" "}
                      Daily 2‑min prayer shorts + live Sunday prayer
                    </li>
                    <li>
                      <span className="font-semibold text-purple-900">
                        Instagram/FB:
                      </span>{" "}
                      Reels of charity events, donor shoutouts
                    </li>
                    <li>
                      <span className="font-semibold text-purple-900">
                        WhatsApp Channel:
                      </span>{" "}
                      Daily verse, urgent prayer alerts, donation link
                    </li>
                    <li>
                      <span className="font-semibold text-purple-900">
                        LinkedIn:
                      </span>{" "}
                      Corporate CSR proposals & trustee articles
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Modern Prayer & Charity Trends
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-1.5">
                    <li>24/7 WhatsApp Prayer Bot (auto‑reply with prayers)</li>
                    <li>Virtual prayer rooms (Zoom) – 3 sessions per week</li>
                    <li>
                      Crowdfunding milestones (Milaap/Ketto) – live progress bar
                    </li>
                    <li>
                      Digital donation receipts with QR code – share on social
                      media
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Extra tip for client */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl text-center border border-indigo-100">
            <p className="text-indigo-800 text-sm">
              💡 <span className="font-bold">Did you know?</span> Trusts that
              actively post prayer content on YouTube get
              <span className="font-bold text-purple-700">
                {" "}
                3x more donations{" "}
              </span>{" "}
              and
              <span className="font-bold text-purple-700">
                {" "}
                50% higher member retention{" "}
              </span>{" "}
              than those who don’t.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 shadow-2xl border border-indigo-100"
        >
          <span className="text-5xl">🚀</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 text-slate-900">
            ഒരു പുതിയ ഡിജിറ്റൽ വിപ്ലവത്തിന് തുടക്കം കുറിക്കാം
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
            പ്രാർത്ഥനയും ആത്മീയതയും ഡിജിറ്റൽ യുഗത്തിന്റെ മാർക്കറ്റിംഗ്
            തന്ത്രങ്ങളുമായി ഒത്തുപോകുമ്പോൾ ഈ ട്രസ്റ്റ് കേരളത്തിലെ തന്നെ ഏറ്റവും
            വലിയ പ്ലാറ്റ്‌ഫോം ആയി മാറും.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-300 hover:shadow-xl transition-all transform hover:scale-105">
              🚀 ഈ അപ്ഡേറ്റഡ് പ്ലാൻ കൺഫേം ചെയ്യൂ
            </button>
            <button className="border-2 border-indigo-700 text-indigo-800 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition">
              📑 കംപ്ലീറ്റ് സ്ട്രാറ്റജി ഡൗൺലോഡ് ചെയ്യുക
            </button>
          </div>
        </motion.div>

        <div className="text-center text-gray-400 text-xs mt-12">
          <p>
            © 2026 Divine Charitable Trust 360° Omnichannel Growth Plan |
            Confident Client Presentation
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustGrowthPlan;
