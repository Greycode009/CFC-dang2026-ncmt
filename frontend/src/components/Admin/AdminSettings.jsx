import React, { useState } from "react";
import {
  FaCog,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDatabase,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminSettings = () => {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);

  // Settings state (frontend-only, these would connect to backend later)
  const [settings, setSettings] = useState({
    siteName: "MedAssist",
    adminEmail: user?.email || "admin@medassist.com",
    autoVerify: false,
    emailNotifications: true,
    appointmentAlerts: true,
    maintenanceMode: false,
    maxAppointmentsPerDay: 50,
    defaultTimezone: "Asia/Kathmandu",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Frontend only — saves to local state
    setToast("Settings saved successfully!");
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
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure platform preferences, notifications, and system behavior.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* General Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center border border-teal-100">
              <FaCog className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">General</h3>
              <p className="text-[11px] text-slate-500">Basic platform configuration</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Platform Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Default Timezone</label>
              <select
                name="defaultTimezone"
                value={settings.defaultTimezone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition cursor-pointer"
              >
                <option value="Asia/Kathmandu">Asia/Kathmandu (NPT +5:45)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <FaBell className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Notifications</h3>
              <p className="text-[11px] text-slate-500">Manage alert preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="Email Notifications"
              description="Receive email alerts for new registrations and system events"
              enabled={settings.emailNotifications}
              onToggle={() => handleToggle("emailNotifications")}
            />
            <ToggleRow
              label="Appointment Alerts"
              description="Get notified when new appointments are booked"
              enabled={settings.appointmentAlerts}
              onToggle={() => handleToggle("appointmentAlerts")}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <FaShieldAlt className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Verification & Security</h3>
              <p className="text-[11px] text-slate-500">Institution verification rules</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="Auto-Verify Institutions"
              description="Automatically verify new institutions without manual review"
              enabled={settings.autoVerify}
              onToggle={() => handleToggle("autoVerify")}
            />
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Max Appointments per Day</label>
              <input
                type="number"
                name="maxAppointmentsPerDay"
                value={settings.maxAppointmentsPerDay}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <FaDatabase className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">System</h3>
              <p className="text-[11px] text-slate-500">Platform maintenance options</p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="Maintenance Mode"
              description="Temporarily disable public access for system maintenance"
              enabled={settings.maintenanceMode}
              onToggle={() => handleToggle("maintenanceMode")}
              danger
            />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Note:</strong> These settings are stored locally. Once the backend dev wires up the settings API, they will persist across sessions.
            </p>
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
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
};

const ToggleRow = ({ label, description, enabled, onToggle, danger = false }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex-1 mr-4">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="text-[11px] text-slate-500 leading-relaxed">{description}</p>
    </div>
    <button onClick={onToggle} className="flex-shrink-0 cursor-pointer">
      {enabled ? (
        <FaToggleOn className={`text-3xl ${danger ? "text-rose-500" : "text-[#0d9488]"} hover:opacity-80 transition`} />
      ) : (
        <FaToggleOff className="text-3xl text-slate-300 hover:text-slate-400 transition" />
      )}
    </button>
  </div>
);

export default AdminSettings;
