// src/components/PrayerSchedule.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  Bell,
  Sparkles,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";

const PrayerSchedule = () => {
  // Schedule data – you can easily modify times and days
  const schedule = [
    {
      day: "Monday",
      morning: "6:00 AM",
      evening: "6:00 PM",
      special: "Bible Study (7:00 PM)",
    },
    {
      day: "Tuesday",
      morning: "6:00 AM",
      evening: "6:00 PM",
      special: "Intercessory Prayer (7:00 PM)",
    },
    {
      day: "Wednesday",
      morning: "6:00 AM",
      evening: "6:00 PM",
      special: "Youth Service (7:00 PM)",
    },
    {
      day: "Thursday",
      morning: "6:00 AM",
      evening: "6:00 PM",
      special: "Worship Practice (7:00 PM)",
    },
    {
      day: "Friday",
      morning: "6:00 AM",
      evening: "6:00 PM",
      special: "Fasting Prayer (10:00 AM – 12:00 PM)",
    },
    {
      day: "Saturday",
      morning: "7:00 AM",
      evening: "5:00 PM",
      special: "Outreach / Evangelism (9:00 AM)",
    },
    {
      day: "Sunday",
      morning: "8:30 AM",
      evening: "6:00 PM",
      special: "Main Service (10:00 AM)",
    },
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 300 },
    },
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium border border-indigo-200 dark:border-indigo-800">
            <Sparkles size={16} />
            Join us in prayer
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Weekly Prayer Schedule
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">
            "Pray without ceasing" – 1 Thessalonians 5:17. Join our community in
            daily prayer and spiritual growth.
          </p>
        </motion.div>

        {/* Schedule Cards / Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {schedule.map((item, idx) => {
            const isToday = item.day === today;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
                  isToday
                    ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 border-indigo-400/50 shadow-xl shadow-indigo-500/10"
                    : "bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 hover:shadow-lg"
                }`}
              >
                {isToday && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Today
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <h3
                    className={`text-xl font-bold ${isToday ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-white"}`}
                  >
                    {item.day}
                  </h3>
                  <CalendarDays size={20} className="text-indigo-400" />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Sunrise size={18} className="text-amber-500" />
                    <span className="text-sm font-medium">Morning Prayer</span>
                    <span className="ml-auto font-mono text-indigo-600 dark:text-indigo-400">
                      {item.morning}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Sunset size={18} className="text-orange-500" />
                    <span className="text-sm font-medium">Evening Prayer</span>
                    <span className="ml-auto font-mono text-indigo-600 dark:text-indigo-400">
                      {item.evening}
                    </span>
                  </div>
                  {item.special && (
                    <div className="flex items-start gap-3 pt-2 mt-2 border-t border-indigo-200/30 dark:border-white/10">
                      <Bell size={18} className="text-purple-500 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Special
                        </span>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {item.special}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note / encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-white/10">
            <Clock size={18} className="text-indigo-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              All times are in{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                IST
              </strong>{" "}
              – Join via Zoom or in‑person
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            * Schedule subject to change during special events or holidays.
            Check announcements for updates.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerSchedule;
