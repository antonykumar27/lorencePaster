import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Loader2,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  FileText,
} from "lucide-react";
import {
  useGetHelpRequestsQuery,
  useUpdateHelpStatusMutation,
  useDeleteHelpRequestMutation,
} from "../store/VolunteerApi";

// Status color mapping (case‑insensitive)
const getStatusColor = (status) => {
  const s = status?.toLowerCase();
  if (s === "pending")
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  if (s === "approved")
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  if (s === "rejected")
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  return "bg-gray-100 text-gray-700";
};

const HelpRequestList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetHelpRequestsQuery({
    status: statusFilter,
    page,
    limit: 10,
  });
  const [updateStatus, { isLoading: updating }] = useUpdateHelpStatusMutation();
  const [deleteRequest, { isLoading: deleting }] =
    useDeleteHelpRequestMutation();

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus({ id, status: newStatus });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this help request?")) {
      await deleteRequest(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-amber-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load help requests.{" "}
        <button onClick={refetch} className="underline">
          Retry
        </button>
      </div>
    );
  }

  const requests = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-amber-600" />
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              Help Requests
            </h1>
          </div>
          <button
            onClick={() => refetch()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow border hover:shadow-md transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {["", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status || "all"}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                statusFilter === status
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              {status === ""
                ? "All Requests"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          <AnimatePresence>
            {requests.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No requests found.
              </div>
            ) : (
              requests.map((req) => (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                        {req.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar size={12} />{" "}
                        {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(req._id)}
                      disabled={deleting}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm border-t border-b py-3">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" /> {req.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> {req.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      <span className="font-medium">Subject:</span>{" "}
                      {req.subject}
                    </p>
                  </div>

                  <div className="text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-xl italic">
                    <MessageSquare
                      size={14}
                      className="inline mr-2 text-slate-400"
                    />
                    {req.message}
                  </div>

                  <div className="flex justify-end">
                    <select
                      value={req.status?.toLowerCase()}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                      disabled={updating}
                      className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border-0 ${getStatusColor(
                        req.status,
                      )} focus:ring-2 focus:ring-amber-500 cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-xl border">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Name / Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold">{req.name}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{req.email}</div>
                    <div className="text-xs text-slate-400">{req.phone}</div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm max-w-[200px] truncate"
                    title={req.subject}
                  >
                    {req.subject}
                  </td>
                  <td
                    className="px-6 py-4 text-sm max-w-[250px] truncate"
                    title={req.message}
                  >
                    {req.message}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status?.toLowerCase()}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                      disabled={updating}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border-0 ${getStatusColor(
                        req.status,
                      )} focus:ring-2 focus:ring-amber-500 cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(req._id)}
                      disabled={deleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestList;
