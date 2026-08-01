import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaHospitalUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaBars,
  FaTimes,
  FaHospital,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const sidebarLinks = [
  { id: "overview", label: "Overview", icon: FaTachometerAlt },
  { id: "appointments", label: "Appointments Queue", icon: FaCalendarCheck },
  { id: "profile", label: "Institute Profile", icon: FaHospitalUser },
  { id: "settings", label: "Operational Settings", icon: FaCog },
];

const InstituteSidebar = ({ activeSection, onChangeSection }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "HO";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827]">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
            <FaPlus className="text-sm" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">MedAssist</span>
            <span className="block text-[10px] font-semibold text-teal-400 uppercase tracking-widest">
              Hospital Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => {
                onChangeSection(link.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#0d9488] text-white shadow-lg shadow-teal-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Icon className={`text-base ${isActive ? "text-white" : "text-slate-500"}`} />
              <span>{link.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Hospital Admin Profile & Logout */}
      <div className="px-4 py-5 border-t border-slate-700/50 space-y-3">
        <div className="flex items-center space-x-3 px-3">
          <div className="w-9 h-9 rounded-full bg-teal-900/60 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-700/40">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name || "Bheri Hospital"}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email || "hospital@medassist.com"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 transition cursor-pointer"
        >
          <FaSignOutAlt className="text-sm" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] w-10 h-10 bg-[#111827] text-white rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-[#111827] flex-shrink-0 z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default InstituteSidebar;
