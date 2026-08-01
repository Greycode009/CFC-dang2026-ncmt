import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaBed,
  FaStethoscope,
  FaUserCheck,
  FaClock,
  FaPlus,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const InstituteOverview = ({ onNavigate, appointments, onStatusChange }) => {
  const { user } = useAuth();
  const hospitalName = user?.name || "Bheri Provincial Hospital";

  const statCards = [
    {
      label: "Today's Appointments",
      value: appointments.length,
      subText: `${appointments.filter((a) => a.status === "Pending").length} pending approval`,
      icon: FaCalendarCheck,
      color: "from-teal-500 to-emerald-500",
      bgLight: "bg-teal-50",
      textColor: "text-[#0d9488]",
    },
    {
      label: "Beds Available",
      value: "42 / 50",
      subText: "8 ICU beds available",
      icon: FaBed,
      color: "from-emerald-500 to-green-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "On-Duty Doctors",
      value: "16",
      subText: "Across 6 Departments",
      icon: FaStethoscope,
      color: "from-indigo-500 to-blue-500",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      label: "Admissions (This Month)",
      value: "112",
      subText: "12 new this week",
      icon: FaUserCheck,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {hospitalName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Hospital Operations & Patient Consultation Portal
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Emergency 24/7 Active</span>
          </span>
          <button
            onClick={() => onNavigate("appointments")}
            className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer flex items-center space-x-2"
          >
            <FaPlus />
            <span>Manage OPD Queue</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition relative overflow-hidden space-y-3"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {card.label}
                  </p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{card.value}</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">{card.subText}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${card.bgLight} ${card.textColor} flex items-center justify-center text-xl`}>
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments Queue Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FaCalendarCheck className="text-[#0d9488]" />
            <span>Recent Appointments Queue</span>
          </h3>
          <button
            onClick={() => onNavigate("appointments")}
            className="text-xs font-bold text-[#0d9488] hover:text-teal-700 transition cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department & Doctor</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.slice(0, 5).map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-500">{appt.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{appt.patientName}</p>
                    <p className="text-[11px] text-slate-500">{appt.age} yrs • {appt.gender}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{appt.department}</p>
                    <p className="text-[11px] text-slate-500">{appt.doctor}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">
                    {appt.date} at {appt.time}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                      appt.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : appt.status === "Pending"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {appt.status === "Pending" && (
                      <button
                        onClick={() => onStatusChange(appt.id, "Confirmed")}
                        className="px-3 py-1.5 bg-[#0d9488] hover:bg-[#0f896f] text-white rounded-lg font-bold text-xs transition cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstituteOverview;
