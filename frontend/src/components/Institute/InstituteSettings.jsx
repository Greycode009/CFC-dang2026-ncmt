import React, { useState } from "react";
import {
  FaCog,
  FaBed,
  FaClock,
  FaPhoneAlt,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

const InstituteSettings = () => {
  const [toast, setToast] = useState(null);

  const [settings, setSettings] = useState({
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    totalBeds: 50,
    availableBeds: 42,
    emergencyHelpline: "+977 81 520111",
    emergency247: true,
    autoApproveBookings: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setToast("Operational settings saved successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-sm font-bold shadow-xl flex items-center space-x-2">
          <FaCheckCircle />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Operational Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure hospital OPD schedules, bed availability, and emergency contact details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Schedule & Hours */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center border border-teal-100">
              <FaClock className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">OPD Hours</h3>
              <p className="text-[11px] text-slate-500">Daily outpatient department timings</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Opening Time</label>
              <input
                type="text"
                name="openingTime"
                value={settings.openingTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Closing Time</label>
              <input
                type="text"
                name="closingTime"
                value={settings.closingTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
          </div>
        </div>

        {/* Bed Capacity Management */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <FaBed className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bed Capacity</h3>
              <p className="text-[11px] text-slate-500">Hospital bed occupancy tracking</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Total Hospital Beds</label>
              <input
                type="number"
                name="totalBeds"
                value={settings.totalBeds}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Available Beds</label>
              <input
                type="number"
                name="availableBeds"
                value={settings.availableBeds}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
          </div>
        </div>

        {/* Emergency & Helpline */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5 lg:col-span-2">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <FaPhoneAlt className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Emergency & Helpline Details</h3>
              <p className="text-[11px] text-slate-500">Public contact numbers displayed on hospital directory</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Emergency Helpline Number</label>
              <input
                type="text"
                name="emergencyHelpline"
                value={settings.emergencyHelpline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition font-mono"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">24/7 Emergency Active</p>
                  <p className="text-[11px] text-slate-500">Show emergency casualty badge on portal</p>
                </div>
                <button onClick={() => handleToggle("emergency247")} className="cursor-pointer">
                  {settings.emergency247 ? (
                    <FaToggleOn className="text-3xl text-[#0d9488]" />
                  ) : (
                    <FaToggleOff className="text-3xl text-slate-300" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Auto-Approve Appointments</p>
                  <p className="text-[11px] text-slate-500">Automatically confirm incoming patient slots</p>
                </div>
                <button onClick={() => handleToggle("autoApproveBookings")} className="cursor-pointer">
                  {settings.autoApproveBookings ? (
                    <FaToggleOn className="text-3xl text-[#0d9488]" />
                  ) : (
                    <FaToggleOff className="text-3xl text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="px-8 py-3.5 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-500/15 hover:shadow-xl transition cursor-pointer flex items-center space-x-2.5"
        >
          <FaSave />
          <span>Save Operational Settings</span>
        </button>
      </div>
    </div>
  );
};

export default InstituteSettings;
