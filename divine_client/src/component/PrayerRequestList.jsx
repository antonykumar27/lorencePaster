// src/pages/PrayerRequestList.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetPrayerRequestsQuery,
  useUpdatePrayerRequestMutation,
} from "../store/PrayerRequestApi";
import { toast } from "react-toastify";
import {
  Search,
  User,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Tag,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";

const PrayerRequestList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetPrayerRequestsQuery();
  const [updatePrayerRequest, { isLoading: isUpdating }] =
    useUpdatePrayerRequestMutation();

  // Extract array from response
  const prayerRequests = response?.data || [];
  console.log("prayerRequests array:", prayerRequests);

  // Filtered requests
  const filteredRequests = React.useMemo(() => {
    if (!Array.isArray(prayerRequests)) return [];
    let filtered = [...prayerRequests];

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.phone?.includes(searchTerm) ||
          req.message?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    return filtered;
  }, [prayerRequests, searchTerm, statusFilter]);

  // Mark as Prayed handler
  const handleMarkAsPrayed = async (id, currentStatus) => {
    if (currentStatus === "prayed") {
      toast.info("Already marked as prayed.");
      return;
    }
    try {
      await updatePrayerRequest({ id, status: "prayed" }).unwrap();
      toast.success("✅ Prayer request marked as prayed!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
          icon: Clock,
          label: "Pending",
        };
      case "prayed":
        return {
          color: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
          icon: Eye,
          label: "Prayed",
        };
      case "completed":
        return {
          color: "bg-green-500/20 text-green-600 dark:text-green-400",
          icon: CheckCircle,
          label: "Completed",
        };
      default:
        return {
          color: "bg-gray-500/20 text-gray-600 dark:text-gray-400",
          icon: Clock,
          label: "New",
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-300">
            Loading prayer requests...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
            Error Loading Data
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            {error?.data?.message || "Failed to fetch prayer requests"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Header */}
      <section className="relative py-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            Prayer Requests
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
            Manage and pray for the requests submitted by our community
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, phone or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                statusFilter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                statusFilter === "pending"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("prayed")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                statusFilter === "prayed"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
              }`}
            >
              Prayed
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Total: {filteredRequests.length} prayer requests
        </p>
      </div>

      {/* Prayer Requests Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No prayer requests found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredRequests.map((request, idx) => {
                const statusInfo = getStatusBadge(request.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.div
                    key={request._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="font-bold text-slate-800 dark:text-white">
                            {request.name || "Anonymous"}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusInfo.color}`}
                        >
                          <StatusIcon size={12} />
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {request.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-slate-400" />
                            <span>{request.phone}</span>
                          </div>
                        )}
                        {request.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" />
                            <span className="truncate">{request.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-xs">
                            {formatDate(request.createdAt)}
                          </span>
                        </div>
                        {request.subject && (
                          <div className="flex items-center gap-2">
                            <Tag size={14} className="text-slate-400" />
                            <span className="capitalize">
                              {request.subject}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ✅ Scrollable message box (fix 1) */}
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-h-40 overflow-y-auto scrollbar-thin pr-1">
                          {request.message}
                        </p>
                      </div>

                      {/* ✅ Functional Mark as Prayed button (fix 2) */}
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() =>
                            handleMarkAsPrayed(request._id, request.status)
                          }
                          disabled={isUpdating || request.status === "prayed"}
                          className={`text-xs flex items-center gap-1 transition ${
                            request.status === "prayed"
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-indigo-600 dark:text-indigo-400 hover:underline"
                          }`}
                        >
                          <CheckCircle size={12} />
                          {request.status === "prayed"
                            ? "Already Prayed"
                            : "Mark as Prayed"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerRequestList;
