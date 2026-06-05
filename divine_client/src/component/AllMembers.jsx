import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useGetAllmembersQuery } from "../store/UserApi";

const MembersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const limit = 10;

  // 💡 API-ലേക്ക് ഫിൽട്ടറുകൾ പാസ്സ് ചെയ്യുന്നു (ബാക്ക് എൻഡിൽ പേജിനേഷൻ വർക്ക് ചെയ്യാൻ)
  const { data, isLoading, error } = useGetAllmembersQuery({
    page,
    search,
    role: roleFilter,
    limit,
  });

  const members = data?.data || [];
  const pagination = data?.pagination || {}; // നിങ്ങളുടെ backend റെസ്പോൺസ് അനുസരിച്ച് മാറ്റുക

  if (isLoading)
    return (
      <div className="text-center py-10 text-slate-500">Loading members...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load members
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-900/60 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
        👥 Member List
      </h2>

      {/* 🔍 Filters Section (മൊബൈലിൽ കൃത്യമായി ഇരിക്കാൻ ഭംഗിയാക്കിയത്) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="church_member">Church Member</option>
          <option value="common_user">Common User</option>
        </select>
      </div>

      {/* 📱 1. Mobile View (മൊബൈലിൽ മാത്രം കാണിക്കുന്ന ക്ലീൻ കാർഡ് ലേഔട്ട്) */}
      <div className="block md:hidden space-y-3">
        {members.map((member) => (
          <div
            key={member._id}
            className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
          >
            <div className="flex items-center gap-3">
              {member.media?.[0]?.url ? (
                <img
                  src={member.media[0].url}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <User size={20} />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                  {member.name}
                </h4>
                <span
                  className={`inline-block px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold ${
                    member.role === "church_member"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  }`}
                >
                  {member.role === "church_member"
                    ? "Church Member"
                    : "Common User"}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-slate-400" />
                <span>{member.mobileNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span>
                  Joined:{" "}
                  {new Date(member.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 2. Desktop View (വലിയ സ്ക്രീനുകളിൽ മാത്രം കാണിക്കുന്ന ക്ലാസിക് ടേബിൾ) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
            <tr>
              <th className="p-3.5 text-sm font-semibold">Photo</th>
              <th className="p-3.5 text-sm font-semibold">Name</th>
              <th className="p-3.5 text-sm font-semibold">Email</th>
              <th className="p-3.5 text-sm font-semibold">Mobile</th>
              <th className="p-3.5 text-sm font-semibold">Role</th>
              <th className="p-3.5 text-sm font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {members.map((member) => (
              <tr
                key={member._id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition"
              >
                <td className="p-3.5">
                  {member.media?.[0]?.url ? (
                    <img
                      src={member.media[0].url}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                      <User size={18} />
                    </div>
                  )}
                </td>
                <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                  {member.name}
                </td>
                <td className="p-3.5 text-sm">
                  <Mail size={14} className="inline mr-1 text-slate-400" />
                  {member.email}
                </td>
                <td className="p-3.5 text-sm">
                  <Phone size={14} className="inline mr-1 text-slate-400" />
                  {member.mobileNumber}
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      member.role === "church_member"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    }`}
                  >
                    {member.role === "church_member"
                      ? "Church Member"
                      : "Common User"}
                  </span>
                </td>
                <td className="p-3.5 text-sm">
                  <Calendar size={14} className="inline mr-1 text-slate-400" />
                  {new Date(member.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📭 Empty State */}
      {members.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          No members found
        </div>
      )}

      {/* 🔢 Pagination Section (മൊബൈൽ ഫ്രണ്ട്‌ലി ആക്കിയത്) */}
      {pagination.total > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 order-2 sm:order-1">
            Showing {(pagination.page - 1) * limit + 1} to{" "}
            {Math.min(pagination.page * limit, pagination.total)} of{" "}
            {pagination.total} members
          </span>
          <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 px-2">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              disabled={pagination.page === pagination.pages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MembersList;
