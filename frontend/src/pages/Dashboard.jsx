import React from "react";
import PatientDashboard from "./PatientDashboard";
import InstituteDashboard from "./InstituteDashboard";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaHospital, FaSyncAlt } from "react-icons/fa";

const Dashboard = () => {
  const { user, switchRole } = useAuth();
  const currentRole = user?.role || "patient";

  return (
    <div className="relative">
      {/* Sleek Role Switcher Banner (For testing & demonstration between patient and institute views) */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">Current Dashboard View:</span>
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full font-bold bg-[#0d9488]/20 text-teal-300 border border-teal-500/30 capitalize">
              {currentRole === "institute" ? <FaHospital className="text-xs" /> : <FaUser className="text-xs" />}
              <span>{currentRole} Mode</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-[11px]">Switch dashboard role:</span>
            <button
              onClick={() => switchRole(currentRole === "patient" ? "institute" : "patient")}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg transition text-[11px] font-semibold cursor-pointer border border-slate-700"
            >
              <FaSyncAlt className="text-[10px]" />
              <span>Switch to {currentRole === "patient" ? "Institute" : "Patient"} View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render role-specific dashboard */}
      {currentRole === "institute" ? <InstituteDashboard /> : <PatientDashboard />}
    </div>
  );
};

export default Dashboard;
