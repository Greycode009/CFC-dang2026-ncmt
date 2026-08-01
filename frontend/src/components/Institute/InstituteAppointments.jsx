import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaBan,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";

const InstituteAppointments = ({ appointments, onStatusChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = appointments.filter((appt) => {
    const matchesSearch =
      appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || appt.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status.toLowerCase() === "pending").length,
    confirmed: appointments.filter((a) => a.status.toLowerCase() === "confirmed").length,
    completed: appointments.filter((a) => a.status.toLowerCase() === "completed").length,
    rejected: appointments.filter((a) => a.status.toLowerCase() === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Appointments Queue</h1>
          <p className="text-sm text-slate-500 mt-1">Review, approve, or update incoming patient appointment requests.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <FaFilter className="text-slate-400" />
          <span>{filtered.length} of {appointments.length} shown</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by patient, department, or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
          />
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
          {["all", "pending", "confirmed", "completed", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                filterStatus === status
                  ? "bg-[#0d9488] text-white shadow-md shadow-teal-500/15"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
              <span className="ml-1.5 opacity-70">({statusCounts[status] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <FaCalendarCheck />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Appointments Match</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or filter selection.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">S.N.</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department & Doctor</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((appt, idx) => {
                  const status = appt.status.toLowerCase();
                  let badgeCls = "bg-amber-100 text-amber-800 border-amber-200";
                  if (status === "confirmed") badgeCls = "bg-emerald-100 text-emerald-800 border-emerald-200";
                  if (status === "completed") badgeCls = "bg-sky-100 text-sky-800 border-sky-200";
                  if (status === "rejected" || status === "cancelled") badgeCls = "bg-rose-100 text-rose-800 border-rose-200";

                  return (
                    <tr key={appt.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-5 py-4 font-bold text-xs text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{appt.patientName}</p>
                        <p className="text-xs text-slate-500">{appt.age} yrs • {appt.gender}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800">{appt.department}</p>
                        <p className="text-xs text-slate-500">{appt.doctor}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-xs">
                        <div className="flex items-center space-x-1.5">
                          <FaClock className="text-slate-400 text-xs" />
                          <span>{appt.date} at {appt.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeCls}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {status === "pending" && (
                            <>
                              <button
                                onClick={() => onStatusChange(appt.id, "Confirmed")}
                                className="px-3 py-1.5 bg-[#0d9488] hover:bg-[#0f896f] text-white rounded-lg font-bold text-xs transition cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => onStatusChange(appt.id, "Rejected")}
                                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-xs transition border border-rose-200 cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {status === "confirmed" && (
                            <button
                              onClick={() => onStatusChange(appt.id, "Completed")}
                              className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg font-bold text-xs transition border border-sky-200 cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteAppointments;
