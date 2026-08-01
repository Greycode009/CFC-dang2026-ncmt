import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaClock,
  FaPhoneAlt,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaCheckCircle,
  FaSpinner,
  FaMoneyBillWave,
  FaCalendarCheck
} from "react-icons/fa";
import { updateInstitutionProfile } from "../../api";

const InstituteSettings = ({ profileData, onRefreshProfile }) => {
  const inst = profileData?.institution || {};
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    beds: "",
    noOfDoctor: "",
    authPersonNumber: "",
    registrationFee: 500,
    availableTimeSlots: "09:00 AM, 09:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 02:00 PM, 02:30 PM, 03:00 PM, 03:30 PM, 04:00 PM",
    emergency247: true,
    autoApproveBookings: false,
  });

  useEffect(() => {
    if (inst) {
      setSettings({
        openingTime: inst.openingTime || "08:00 AM",
        closingTime: inst.closingTime || "08:00 PM",
        beds: inst.beds || "",
        noOfDoctor: inst.noOfDoctor || "",
        authPersonNumber: inst.authPersonNumber || "",
        registrationFee: inst.registrationFee !== undefined && inst.registrationFee !== null ? inst.registrationFee : 500,
        availableTimeSlots: inst.availableTimeSlots || "09:00 AM, 09:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 02:00 PM, 02:30 PM, 03:00 PM, 03:30 PM, 04:00 PM",
        emergency247: true,
        autoApproveBookings: false,
      });
    }
  }, [profileData]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateInstitutionProfile({
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        beds: settings.beds ? Number(settings.beds) : null,
        noOfDoctor: settings.noOfDoctor ? Number(settings.noOfDoctor) : null,
        authPersonNumber: settings.authPersonNumber,
        registrationFee: settings.registrationFee ? Number(settings.registrationFee) : 500,
        availableTimeSlots: settings.availableTimeSlots,
      });

      setToast("Operational settings & OPD fees saved successfully!");
      if (onRefreshProfile) onRefreshProfile();
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to update operational settings:", err);
      setToast("Error saving settings. Please try again.");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-sm font-bold shadow-xl flex items-center space-x-2 animate-bounce">
          <FaCheckCircle className="text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Operational Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure hospital OPD schedules, booking fees (NPR 500 default), and custom available appointment time slots.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* OPD Fee & Registration */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <FaMoneyBillWave className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Registration / OPD Fee</h3>
              <p className="text-[11px] text-slate-500">Patient booking fee for this facility (NPR)</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Booking Registration Fee (NPR)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-xs">NPR</span>
              <input
                type="number"
                name="registrationFee"
                value={settings.registrationFee}
                onChange={handleChange}
                placeholder="500"
                className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">Default fee is NPR 500. Patients will see this fee when booking an appointment.</p>
          </div>
        </div>

        {/* Schedule & Hours */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center border border-teal-100">
              <FaClock className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">OPD Operating Hours</h3>
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
                placeholder="e.g. 08:00 AM"
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
                placeholder="e.g. 08:00 PM"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
          </div>
        </div>

        {/* Available Time Slots Configuration */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5 lg:col-span-2">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <FaCalendarCheck className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Available Booking Time Slots</h3>
              <p className="text-[11px] text-slate-500">Configure time slots displayed to patients during appointment booking</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Available Time Slots (Comma-separated)</label>
            <textarea
              name="availableTimeSlots"
              rows={2}
              value={settings.availableTimeSlots}
              onChange={handleChange}
              placeholder="e.g. 09:00 AM, 09:30 AM, 10:00 AM, 10:30 AM, 02:00 PM, 02:30 PM, 03:00 PM"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
            />
            <p className="text-[11px] text-slate-400 mt-1">Separate time slots using commas. These exact slots will be displayed to patients booking appointments for your facility.</p>
          </div>
        </div>

        {/* Bed Capacity & Doctors */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5 lg:col-span-2">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <FaBed className="text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Capacity & Staffing</h3>
              <p className="text-[11px] text-slate-500">Hospital bed & medical doctor count</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Total Hospital Beds</label>
              <input
                type="number"
                name="beds"
                value={settings.beds}
                onChange={handleChange}
                placeholder="e.g. 50"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Medical Doctors Count</label>
              <input
                type="number"
                name="noOfDoctor"
                value={settings.noOfDoctor}
                onChange={handleChange}
                placeholder="e.g. 16"
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
              <h3 className="text-base font-bold text-slate-900">Emergency & Helpline Contact</h3>
              <p className="text-[11px] text-slate-500">Authorized contact helpline saved in database</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Authorized Contact Number</label>
              <input
                type="text"
                name="authPersonNumber"
                value={settings.authPersonNumber}
                onChange={handleChange}
                placeholder="e.g. 9841234567"
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
          disabled={isSaving}
          className="px-8 py-3.5 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-500/15 hover:shadow-xl transition cursor-pointer flex items-center space-x-2.5 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <FaSpinner className="animate-spin text-sm" />
              <span>Saving to DB...</span>
            </>
          ) : (
            <>
              <FaSave />
              <span>Save Operational Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InstituteSettings;
