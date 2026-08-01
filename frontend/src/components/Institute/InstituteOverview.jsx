import React from "react";
import {
  FaCalendarCheck,
  FaBed,
  FaStethoscope,
  FaUserCheck,
  FaPlus,
  FaShieldAlt,
  FaHourglassHalf,
  FaCheckCircle
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const InstituteOverview = ({ onNavigate, appointments, onStatusChange, profileData }) => {
  const { user } = useAuth();

  const inst = profileData?.institution || {};
  const hospitalUser = inst.User || {};
  const hospitalName = hospitalUser.fullName || user?.name || "Hospital Partner";

  const totalBeds = inst.beds ? `${inst.beds} Beds` : "50 Beds";
  const doctorCount = inst.noOfDoctor ? `${inst.noOfDoctor} Doctors` : "16 Doctors";
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;

  const rawStatus = (inst.verificationStatus || "pending").toLowerCase();
  const isVerified = rawStatus === "verified";
  const isPending = rawStatus === "pending";

  const statCards = [
    {
      label: "Total Appointments",
      value: appointments.length,
      subText: `${pendingCount} pending approval`,
      icon: FaCalendarCheck,
      color: "from-teal-500 to-emerald-500",
      bgLight: "bg-teal-50",
      textColor: "text-[#0d9488]",
      badge: null,
    },
    {
      label: "Bed Capacity",
      value: totalBeds,
      subText: inst.beds ? "Registered bed count" : "8 ICU beds available",
      icon: FaBed,
      color: "from-emerald-500 to-green-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
      badge: null,
    },
    {
      label: "Medical Doctors",
      value: doctorCount,
      subText: inst.department ? inst.department.split(",")[0] || "OPD Staff" : "Active Medical Personnel",
      icon: FaStethoscope,
      color: "from-indigo-500 to-blue-500",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
      badge: null,
    },
    {
      label: "Verification Status",
      value: isVerified ? "VERIFIED" : isPending ? "PENDING" : rawStatus.toUpperCase(),
      subText: inst.registrationNumber ? `Reg: ${inst.registrationNumber}` : isVerified ? "Government Licensed" : "Awaiting Admin Approval",
      icon: isVerified ? FaCheckCircle : FaHourglassHalf,
      color: isVerified ? "from-emerald-500 to-green-500" : "from-amber-400 to-yellow-500",
      bgLight: isVerified ? "bg-emerald-50" : "bg-amber-50",
      textColor: isVerified ? "text-emerald-600" : "text-amber-600",
      badgeStyle: isVerified
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : "bg-amber-100 text-amber-800 border-amber-300",
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
          {/* Top Verification Status Badge */}
          <span
            className={`px-3.5 py-1.5 text-xs font-extrabold rounded-full flex items-center space-x-1.5 border shadow-xs ${
              isVerified
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isVerified ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"
              }`}
            />
            <span className="capitalize">
              {isVerified ? "Verified Institution" : "Verification Pending"}
            </span>
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
          const isVerifCard = card.label === "Verification Status";

          return (
            <div
              key={card.label}
              className={`bg-white rounded-2xl p-5 border shadow-xs hover:shadow-md transition relative overflow-hidden space-y-3 ${
                isVerifCard
                  ? isVerified
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-amber-200 bg-amber-50/20"
                  : "border-slate-200/80"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {card.label}
                  </p>
                  
                  {isVerifCard ? (
                    <div className={`mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border shadow-xs ${card.badgeStyle}`}>
                      <Icon className="text-xs" />
                      <span>{card.value}</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-black text-slate-900 mt-1">{card.value}</p>
                  )}

                  <p className="text-[11px] font-bold text-slate-500 mt-1.5 truncate">{card.subText}</p>
                </div>

                <div className={`w-12 h-12 rounded-2xl ${card.bgLight} ${card.textColor} flex items-center justify-center text-xl flex-shrink-0`}>
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
            <span>Recent Appointments Queue ({appointments.length})</span>
          </h3>
          <button
            onClick={() => onNavigate("appointments")}
            className="text-xs font-bold text-[#0d9488] hover:text-teal-700 transition cursor-pointer"
          >
            View All →
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <p className="text-sm font-semibold">No appointments booked for this institution yet.</p>
            <p className="text-xs">When patients book visits through MedAssist, they will appear here in real-time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">S.N.</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department / Reason</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.slice(0, 5).map((appt, idx) => (
                  <tr key={appt.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-bold text-xs text-slate-500">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-500">{appt.age} yrs • {appt.gender}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{appt.department}</p>
                      <p className="text-[11px] text-slate-500">{appt.phoneNumber}</p>
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
                          : appt.status === "Completed"
                          ? "bg-sky-100 text-sky-800 border-sky-200"
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
        )}
      </div>
    </div>
  );
};

export default InstituteOverview;
