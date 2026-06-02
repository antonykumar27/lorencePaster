import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Heart,
  Users,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { useGetProgramAttendeesQuery } from "../store/ProgrammsApi";

const ProgramAttendees = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProgramAttendeesQuery(id);
  const [copiedEmail, setCopiedEmail] = React.useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(type);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950/20">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950/20 px-4">
        <div className="text-center">
          <p className="font-semibold text-lg text-red-600 dark:text-red-400">
            Failed to load attendees.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {error?.message || "Please try again later."}
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeft size={18} /> Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const joinedUsers = data?.joinedUsers || [];
  const interestedUsers = data?.interestedUsers || [];
  const joinCount = data?.joinCount ?? joinedUsers.length;
  const interestCount = data?.interestCount ?? interestedUsers.length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button with modern pill */}
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all mb-8 border border-indigo-100 dark:border-indigo-800"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to Programs</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with bento style */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">
                  Program Participants
                </h1>
                <div className="flex gap-4 mt-3 text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-sm">
                    <Users size={16} className="text-green-500" /> Joined:{" "}
                    {joinCount}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Heart size={16} className="text-rose-500" /> Interested:{" "}
                    {interestCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Joined Users - takes 2/3 on large screens */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 backdrop-blur-sm bg-white/40 dark:bg-slate-800/30 rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/60 rounded-2xl">
                    <Users
                      className="text-green-600 dark:text-green-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                      Joined Participants
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {joinCount} {joinCount === 1 ? "person" : "people"}{" "}
                      confirmed
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {joinedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                      <Users className="text-gray-400" size={28} />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No joined participants yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {joinedUsers.map((user) => (
                      <div
                        key={user._id}
                        className="group bg-white/70 dark:bg-slate-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                                {user.name || "Anonymous"}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Mail size={14} />
                              <span className="truncate">
                                {user.email || "No email"}
                              </span>
                            </div>
                            {user.email && (
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    user.email,
                                    `email-${user._id}`,
                                  )
                                }
                                className="text-indigo-500 hover:text-indigo-700 transition"
                              >
                                {copiedEmail === `email-${user._id}` ? (
                                  <Check size={14} />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Phone size={14} />
                              <span>
                                {user.mobileNumber || user.phone || "No phone"}
                              </span>
                            </div>
                            {(user.mobileNumber || user.phone) && (
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    user.mobileNumber || user.phone,
                                    `phone-${user._id}`,
                                  )
                                }
                                className="text-indigo-500 hover:text-indigo-700 transition"
                              >
                                {copiedEmail === `phone-${user._id}` ? (
                                  <Check size={14} />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Interested Users - takes 1/3 on large screens */}
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/40 dark:bg-slate-800/30 rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-950/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/60 rounded-2xl">
                    <Heart
                      className="text-rose-500 dark:text-rose-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                      Interested
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {interestCount}{" "}
                      {interestCount === 1 ? "person" : "people"} shown interest
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {interestedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-3">
                      <Heart className="text-gray-400" size={28} />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No interests yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {interestedUsers.map((user) => (
                      <div
                        key={user._id}
                        className="bg-white/60 dark:bg-slate-800/40 rounded-xl p-4 border border-rose-100 dark:border-rose-900/30 hover:border-rose-200 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-200 dark:bg-rose-800/50 flex items-center justify-center text-rose-700 dark:text-rose-300 font-bold text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 dark:text-white">
                              {user.name || "Anonymous"}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Mail size={12} />
                                <span>{user.email || "—"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone size={12} />
                                <span>
                                  {user.mobileNumber || user.phone || "—"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer note with glass style */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 dark:bg-slate-800/40 backdrop-blur-sm text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <Copy size={12} />
              <span>Click on ✨ copy icon to copy email/phone</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles - add to global CSS or use tailwind plugin */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ProgramAttendees;
