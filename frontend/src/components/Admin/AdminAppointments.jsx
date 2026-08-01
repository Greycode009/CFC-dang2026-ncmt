import React, { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaHospital,
  FaUser,
  FaClock,
  FaSearch,
  FaFilter,
  FaSpinner,
} from "react-icons/fa";
import { API } from "../../api";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      // Try fetching all appointments — the backend dev can wire this up
      const res = await API.get("/appointments");
      setAppointments(res.data?.appointments || []);
    } catch (err) {
      console.warn("Could not fetch appointments:", err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = appointments.filter((appt) => {
    const instName = (appt.Institution?.User?.fullName || appt.Institution?.name || "").toLowerCase();
    const patientName = (appt.Patient?.User?.fullName || "").toLowerCase();
    const matchesSearch =
      instName.includes(searchQuery.toLowerCase()) ||
      patientName.includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || (appt.status || "").toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter((a) => (a.status || "").toLowerCase() === "pending").length,
    accepted: appointments.filter((a) => (a.status || "").toLowerCase() === "accepted").length,
    completed: appointments.filter((a) => (a.status || "").toLowerCase() === "completed").length,
    cancelled: appointments.filter((a) => (a.status || "").toLowerCase() === "cancelled").length,
  };

  const getStatusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    let cls = "bg-amber-100 text-amber-800 border-amber-200";
    if (s === "accepted") cls = "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (s === "completed") cls = "bg-sky-100 text-sky-800 border-sky-200";
    if (s === "cancelled" || s === "rejected") cls = "bg-rose-100 text-rose-800 border-rose-200";
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${cls}`}>
        {s}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 space-x-3 text-slate-400">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold">Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">View and monitor all appointment bookings across the platform.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <FaFilter className="text-slate-400" />
          <span>{filtered.length} of {appointments.length} shown</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by patient or hospital name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
          />
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
          {["all", "pending", "accepted", "completed", "cancelled"].map((status) => (
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

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <FaCalendarCheck />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Appointments Found</h3>
          <p className="text-xs text-slate-500">
            {appointments.length === 0
              ? "No appointment data available yet. Appointments will appear once patients start booking."
              : "No appointments match your current search or filter."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">S.N.</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((appt, idx) => (
                  <tr key={appt.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-5 py-4 font-bold text-xs text-slate-500">{idx + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center flex-shrink-0 border border-teal-100">
                          <FaUser className="text-xs" />
                        </div>
                        <span className="font-semibold text-slate-800">
                          {appt.Patient?.User?.fullName || "Patient"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-2">
                        <FaHospital className="text-slate-400 text-xs" />
                        <span className="text-slate-600">
                          {appt.Institution?.User?.fullName || appt.Institution?.name || "Institution"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <FaClock className="text-slate-400 text-xs" />
                        <span>{appt.appointmentDate} at {appt.appointmentTime}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 max-w-[200px] truncate">
                      {appt.reason || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(appt.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
