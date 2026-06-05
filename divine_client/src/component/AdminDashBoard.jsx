// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetDashboardStatsQuery } from "../store/PrayerRequestApi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();
  const statsData = dashboardData?.data || {};

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return (
        saved === "dark" ||
        (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Build stats array from real data
  const stats = [
    {
      title: "Total Members",
      value: statsData.totalAllMembers?.toLocaleString("en-IN") || "0",
      change: "+12%",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      onClick: () => navigate("/getAllMembers"),
    },
    {
      title: "Active Volunteers",
      value: statsData.approvedVolunteers?.toLocaleString("en-IN") || "0",
      change: "+5%",
      icon: "🙌",
      color: "from-green-500 to-green-600",
      onClick: () => navigate("/volunteers"),
    },
    {
      title: "New Registrations (Week)",
      value: statsData.newRegistrationsThisWeek?.toLocaleString("en-IN") || "0",
      change: "+8%",
      icon: "📝",
      color: "from-purple-500 to-purple-600",
      onClick: () => navigate("/getAllMembers?filter=new"),
    },
    {
      title: "Total Donations",
      value: `₹${(statsData.totalDonations || 0).toLocaleString("en-IN")}`,
      change: "+23%",
      icon: "💰",
      color: "from-yellow-500 to-yellow-600",
      onClick: () => navigate("/donation-dashboard"),
    },
    {
      title: "This Month's Collection",
      value: `₹${(statsData.thisMonthCollection || 0).toLocaleString("en-IN")}`,
      change: "+6%",
      icon: "📆",
      color: "from-indigo-500 to-indigo-600",
      onClick: () => navigate("/donation-dashboard?month=current"),
    },
    {
      title: "Pending Actions",
      value:
        (statsData.pendingPrayers || 0) + (statsData.pendingVolunteers || 0),
      change: "",
      icon: "⏳",
      color: "from-pink-500 to-pink-600",
      onClick: () => navigate("/admin/approvals"),
    },
  ];

  // Upcoming Programs
  const upcomingPrograms = [
    {
      name: "ഞായറാഴ്ച പ്രാർത്ഥന",
      date: "2026-06-07",
      time: "10:00 AM",
      type: "Worship",
    },
    {
      name: "യൂത്ത് മീറ്റിംഗ്",
      date: "2026-06-08",
      time: "6:00 PM",
      type: "Youth",
    },
    {
      name: "ബൈബിൾ പഠനം (ഓൺലൈൻ)",
      date: "2026-06-09",
      time: "7:30 PM",
      type: "Online",
    },
  ];

  const prayerRequestsCount = statsData.pendingPrayers || 0;
  const helpRequestsCount = statsData.pendingHelpRequests || 0;
  const unreadMessages = statsData.unreadMessages || 0;

  const fundBreakdown = [
    { name: "Building Fund", percentage: 60, color: "bg-cyan-500" },
    { name: "Poor Support", percentage: 25, color: "bg-emerald-500" },
    { name: "Mission Fund", percentage: 15, color: "bg-amber-500" },
  ];

  const teamAttendance = [
    { team: "Prayer Team", present: 28, total: 35 },
    { team: "Worship Team", present: 12, total: 15 },
    { team: "Media Team", present: 8, total: 10 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center dark:text-white">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center text-red-600">
          Error loading dashboard data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          📊 Divine Ministry Admin
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            2026 ജൂൺ 05, വെള്ളി
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-800 px-3 py-2 rounded-full">
            <span className="text-xl">👤</span>
            <span className="font-medium dark:text-white">അഡ്മിൻ</span>
          </div>
        </div>
      </header>

      <main className="py-10 px-4 max-w-7xl mx-auto space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Bento Grid Top */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              variants={cardVariants}
              className="md:col-span-2 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] dark:from-[#050522] dark:via-[#0f0c2c] dark:to-[#1a1a3a] text-white p-8 rounded-3xl shadow-xl"
            >
              <span className="text-red-400 font-bold text-xs tracking-widest uppercase">
                Admin Overview
              </span>
              <h2 className="text-3xl font-extrabold mt-1">
                Welcome Back, അഡ്മിൻ
              </h2>
              <p className="text-gray-300 text-sm mt-2">
                ഇന്നത്തെ മിനിസ്ട്രിയുടെ സ്ഥിതിവിവരങ്ങൾ, പ്രാർത്ഥനാപേക്ഷകൾ,
                വരാനിരിക്കുന്ന പരിപാടികൾ എല്ലാം ഒറ്റനോട്ടത്തിൽ കാണുക.
              </p>
            </motion.div>

            {/* Top Donation Banner - Fixed Mobile Touch */}
            <motion.div
              variants={cardVariants}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-red-50 to-red-100/60 dark:from-slate-900 dark:to-slate-800/60 border border-red-100 dark:border-slate-700 p-8 rounded-3xl flex flex-col justify-between shadow-sm cursor-pointer select-none active:opacity-90 hover:shadow-md transition"
              onClick={() => navigate("/donation-dashboard")}
            >
              <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                Total Donations
              </span>
              <div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">
                  ₹{(statsData.totalDonations || 0).toLocaleString("en-IN")}
                </h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
                  ✨ Lifetime
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Statistics Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              📊 പ്രധാന കണക്കുകൾ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={stat.onClick}
                  className="bg-white dark:bg-slate-900/60 dark:backdrop-blur-sm border border-gray-100 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer select-none active:opacity-90"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider breakdown-words">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                      {stat.change && (
                        <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                          {stat.change}
                        </p>
                      )}
                    </div>
                    <div
                      className={`bg-gradient-to-br ${stat.color} p-2 rounded-full text-white text-xl shadow-md flex-shrink-0`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Financial Overview & Fund Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-slate-900/60 rounded-3xl p-6"
            >
              <h3 className="font-bold text-lg mb-3">💰 ഈ മാസത്തെ ട്രെൻഡ്</h3>
              <div className="flex items-baseline justify-between border-b pb-3">
                <span className="text-3xl font-black text-indigo-600">
                  ₹
                  {(statsData.thisMonthCollection || 0).toLocaleString("en-IN")}
                </span>
                <span className="text-green-600 text-sm font-semibold">
                  +6% than last month
                </span>
              </div>
              <div className="mt-5 h-16 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="bg-indigo-500 h-full w-2/3 text-white text-xs flex items-center justify-center">
                  ₹1.2L (20 days)
                </div>
                <div className="bg-indigo-300 dark:bg-indigo-700 h-full w-1/3 text-white text-xs flex items-center justify-center">
                  ₹0.62L
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                *കഴിഞ്ഞ മാസത്തെ അപേക്ഷിച്ച് 6% വർദ്ധന
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-slate-900/60 rounded-3xl p-6"
            >
              <h3 className="font-bold text-lg mb-4">📊 ഫണ്ട് വിതരണം</h3>
              <div className="space-y-4">
                {fundBreakdown.map((fund, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{fund.name}</span>
                      <span>{fund.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mt-1">
                      <div
                        className={`${fund.color} h-2.5 rounded-full`}
                        style={{ width: `${fund.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-3 border-t text-center text-gray-600 text-sm">
                🏦 Building: ₹7,47,468 | Poor: ₹3,11,445
              </div>
            </motion.div>
          </div>

          {/* Programs & Action Required */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-slate-900/60 rounded-3xl p-6"
            >
              <h3 className="font-bold text-lg mb-4">
                📅 വരാനിരിക്കുന്ന പരിപാടികൾ
              </h3>
              <ul className="space-y-3">
                {upcomingPrograms.map((prog, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{prog.name}</p>
                      <p className="text-xs text-gray-500">
                        {prog.date} • {prog.time}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {prog.type}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/admin/programs")}
                className="mt-4 text-indigo-600 text-sm font-semibold hover:underline"
              >
                + എല്ലാം കാണുക
              </button>
            </motion.div>

            <motion.div variants={cardVariants} className="space-y-6">
              {/* Pending Prayer Requests */}
              <div
                className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 cursor-pointer active:opacity-90"
                onClick={() => navigate("/prayer-requestList")}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">🙏 പെൻഡിംഗ് പ്രാർത്ഥനകൾ</h3>
                  <span className="bg-red-100 dark:bg-red-950/60 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                    {prayerRequestsCount} പുതിയത്
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  കാണാനും അപ്രൂവ് ചെയ്യാനും ക്ലിക്ക് ചെയ്യുക
                </p>
              </div>

              {/* New Help Requests */}
              <div
                className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 cursor-pointer active:opacity-90"
                onClick={() => navigate("/help_request")}
              >
                <h3 className="font-bold text-lg mb-2">
                  🆘 പുതിയ സഹായ അഭ്യർത്ഥനകൾ
                </h3>
                <p className="text-gray-600 text-sm">
                  {helpRequestsCount} pending requests
                </p>
              </div>
            </motion.div>
          </div>

          {/* Additional Widgets: Messages & Attendance */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 cursor-pointer active:opacity-90"
              onClick={() => navigate("/admin/messages")}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">📩 വായിക്കാത്ത സന്ദേശങ്ങൾ</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadMessages}
                </span>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Contact Form വഴി വന്ന പുതിയ {unreadMessages} സന്ദേശങ്ങൾ
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white dark:bg-slate-900/60 rounded-3xl p-6"
            >
              <h3 className="font-bold text-lg mb-3">📋 ഇന്നത്തെ ടീം ഹാജർ</h3>
              {teamAttendance.map((team, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{team.team}</span>
                    <span>
                      {team.present}/{team.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(team.present / team.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Quick Export Buttons */}
          <motion.div
            variants={cardVariants}
            className="bg-gray-50 dark:bg-slate-900/40 rounded-3xl p-5 flex flex-wrap gap-3 justify-between items-center"
          >
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              ⚡ പെട്ടെന്നുള്ള റിപ്പോർട്ടുകൾ
            </span>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-white dark:bg-slate-800 border px-4 py-2 rounded-xl text-sm shadow-sm">
                📄 ഈ മാസത്തെ ഡൊണേഷൻ PDF
              </button>
              <button className="bg-white dark:bg-slate-800 border px-4 py-2 rounded-xl text-sm shadow-sm">
                👥 അംഗങ്ങളുടെ CSV
              </button>
              <button className="bg-white dark:bg-slate-800 border px-4 py-2 rounded-xl text-sm shadow-sm">
                📊 വാർഷിക താരതമ്യം
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
