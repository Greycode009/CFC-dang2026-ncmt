import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaHospital, 
  FaUserCheck, 
  FaBed, 
  FaStethoscope, 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPlus, 
  FaExclamationTriangle,
  FaShieldAlt,
  FaPhoneAlt,
  FaSearch
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const InstituteDashboard = () => {
  const { user } = useAuth();
  const instituteName = user?.name || "Bheri Provincial Hospital";

  const [filter, setFilter] = useState("All");

  const [appointments, setAppointments] = useState([
    {
      id: "APT-2026-01",
      patientName: "Ram Bahadur Thapa",
      age: 45,
      gender: "Male",
      department: "Cardiology",
      doctor: "Dr. Anish Sharma",
      date: "Aug 01, 2026",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: "APT-2026-02",
      patientName: "Sita Kumari Sharma",
      age: 29,
      gender: "Female",
      department: "Pediatrics",
      doctor: "Dr. Sunita Thapa",
      date: "Aug 01, 2026",
      time: "11:15 AM",
      status: "Confirmed",
    },
    {
      id: "APT-2026-03",
      patientName: "Bikash Gurung",
      age: 34,
      gender: "Male",
      department: "General OPD",
      doctor: "Dr. K.P. Adhikari",
      date: "Aug 01, 2026",
      time: "01:00 PM",
      status: "Confirmed",
    },
    {
      id: "APT-2026-04",
      patientName: "Anita Roy",
      age: 52,
      gender: "Female",
      department: "Orthopedics",
      doctor: "Dr. Rajesh Hamal",
      date: "Aug 02, 2026",
      time: "09:00 AM",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredAppointments = appointments.filter((item) => {
    if (filter === "All") return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. INSTITUTE HEADER BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-[#0d9488] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-teal-200 border border-teal-500/30">
                <FaShieldAlt className="text-teal-400" />
                <span>Verified Hospital Institute Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {instituteName} 🏥
              </h1>
              <p className="text-slate-300 text-sm max-w-xl">
                Manage appointment queues, doctor schedules, emergency bed availability, and patient health records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold rounded-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Emergency 24/7 Active</span>
              </div>
              <button className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer flex items-center space-x-2">
                <FaPlus className="text-xs" />
                <span>New Doctor / OPD Slot</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATS & METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today's Appointments
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">28</h3>
              <p className="text-xs text-teal-600 font-medium mt-0.5">4 Pending approval</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-xl">
              <FaCalendarAlt />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Beds Availability
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">42 / 50</h3>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">8 ICU Beds Available</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <FaBed />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                On-duty Doctors
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">16</h3>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">Across 6 Departments</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              <FaStethoscope />
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Patient Admissions
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">112</h3>
              <p className="text-xs text-slate-500 mt-0.5">This month</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
              <FaUserCheck />
            </div>
          </div>
        </div>

        {/* 3. MAIN SECTION: APPOINTMENT MANAGEMENT TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Patient Appointment Queue</h2>
              <p className="text-xs text-slate-500 mt-0.5">Approve, reschedule, or process incoming patient consultations</p>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              {["All", "Pending", "Confirmed"].map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => setFilter(statusOption)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    filter === statusOption
                      ? "bg-[#0d9488] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {statusOption}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] border-y border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Department & Doctor</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-semibold">{appt.id}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400">{appt.age} yrs • {appt.gender}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{appt.department}</p>
                      <p className="text-[11px] text-slate-500">{appt.doctor}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {appt.date} <br />
                      <span className="text-[11px] text-slate-400">{appt.time}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          appt.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : appt.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {appt.status === "Pending" && (
                        <button
                          onClick={() => handleStatusChange(appt.id, "Confirmed")}
                          className="px-3 py-1.5 bg-[#0d9488] hover:bg-[#0f896f] text-white rounded-lg font-semibold text-[11px] transition cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(appt.id, "Completed")}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px] transition cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. BOTTOM TWO-COLUMN PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DEPARTMENT CAPACITY STATUS */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Department Operational Capacity</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Emergency & Trauma Unit</h4>
                  <p className="text-xs text-slate-500">4 Trauma Bays • 24/7 On Duty</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                  Normal Flow
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Cardiology & ICU Wing</h4>
                  <p className="text-xs text-slate-500">12 Beds Occupied / 20 Total</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-100 rounded-full">
                  60% Capacity
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pediatric OPD & Immunization</h4>
                  <p className="text-xs text-slate-500">OPD Hours: 08:00 AM - 08:00 PM</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                  Open
                </span>
              </div>
            </div>
          </div>

          {/* HOSPITAL NOTICE & HELPLINE MANAGEMENT */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Hospital Circulars & Helpline</h3>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/70 space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <FaExclamationTriangle className="text-amber-600" />
                <span>Free Health Screening Camp</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Scheduled for Aug 10, 2026. Public registration will open automatically on MedAssist homepage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-semibold">Institute Helpline</p>
                <p className="text-lg font-extrabold text-teal-400">+977 81 520111</p>
              </div>
              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-xs transition cursor-pointer">
                Edit Contact Info
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InstituteDashboard;
