// src/pages/VolunteersRequestList.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Loader2,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Heart,
  MessageSquare,
} from "lucide-react";
import {
  useGetVolunteersQuery,
  useUpdateVolunteerStatusMutation,
  useDeleteVolunteerMutation,
} from "../store/VolunteerApi";

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const VolunteersRequestList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetVolunteersQuery({
    status: statusFilter,
    page,
    limit: 10,
  });
  const [updateStatus, { isLoading: updating }] =
    useUpdateVolunteerStatusMutation();
  const [deleteVolunteer, { isLoading: deleting }] =
    useDeleteVolunteerMutation();

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus({ id, status: newStatus });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      await deleteVolunteer(id);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-amber-600" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 p-8">
        Failed to load volunteers.{" "}
        <button onClick={refetch} className="underline">
          Retry
        </button>
      </div>
    );

  const volunteers = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-amber-600" />
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
              Volunteer Applications
            </h1>
          </div>
          <button
            onClick={() => refetch()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl shadow border border-slate-200/60 dark:border-slate-700 hover:shadow-md transition active:scale-95"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {["", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status || "all"}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 shrink-0 ${
                statusFilter === status
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {status === ""
                ? "All Applications"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* 📱 Mobile View: Grid Card Layout (Visible on Small Screens Only) */}
        <div className="block lg:hidden space-y-4">
          <AnimatePresence>
            {volunteers.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No applications found.
              </div>
            ) : (
              volunteers.map((volunteer) => (
                <motion.div
                  key={volunteer._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-800 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                        {volunteer.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar size={12} />{" "}
                        {new Date(volunteer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(volunteer._id)}
                      disabled={deleting}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="text-sm space-y-2 text-slate-600 dark:text-slate-400 border-t border-b border-slate-100 dark:border-slate-800 py-3">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />{" "}
                      {volunteer.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />{" "}
                      {volunteer.phone}
                    </p>
                    <p className="flex items-center gap-2 capitalize">
                      <Heart size={14} className="text-slate-400" />{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Area:
                      </span>{" "}
                      {volunteer.interestedArea}
                    </p>
                    <p className="flex items-center gap-2">
                      <Briefcase size={14} className="text-slate-400" />{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Skills:
                      </span>{" "}
                      {volunteer.skills || "—"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-1">
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <MessageSquare size={12} /> Message:
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl italic">
                        "{volunteer.message || "No message provided."}"
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <select
                        value={volunteer.status}
                        onChange={(e) =>
                          handleStatusChange(volunteer._id, e.target.value)
                        }
                        disabled={updating}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold capitalize border-0 ${statusColors[volunteer.status]} focus:ring-2 focus:ring-amber-500 cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* 💻 Desktop View: Table Layout (Hidden on Mobile) */}
        <div className="hidden lg:block overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 dark:text-white">
                      {volunteer.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {new Date(volunteer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      {volunteer.email}
                    </div>
                    <div className="text-sm text-slate-400 mt-0.5">
                      {volunteer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-sm text-slate-700 dark:text-slate-300">
                    {volunteer.interestedArea}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {volunteer.skills || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={volunteer.status}
                      onChange={(e) =>
                        handleStatusChange(volunteer._id, e.target.value)
                      }
                      disabled={updating}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border-0 ${statusColors[volunteer.status]} focus:ring-2 focus:ring-amber-500 cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td
                    className="px-6 py-4 text-sm max-w-xs truncate text-slate-600 dark:text-slate-400"
                    title={volunteer.message}
                  >
                    {volunteer.message || "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(volunteer._id)}
                      disabled={deleting}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
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
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-sm font-semibold border border-slate-200 dark:border-slate-800 disabled:opacity-40 transition shadow-sm"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-500">
              Page{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                {page}
              </span>{" "}
              of {pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-sm font-semibold border border-slate-200 dark:border-slate-800 disabled:opacity-40 transition shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteersRequestList;
