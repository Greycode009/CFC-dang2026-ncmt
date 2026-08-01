import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaUserMd, 
  FaCalendarCheck, 
  FaFileMedical, 
  FaRobot, 
  FaPlus, 
  FaHeartbeat, 
  FaHospital, 
  FaClock, 
  FaDownload, 
  FaChevronRight,
  FaPhoneAlt,
  FaShieldAlt,
  FaCapsules
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();
  const patientName = user?.name || "Alex Morgan";

  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Anish Sharma",
      specialty: "Cardiology",
      hospital: "Bheri Provincial Hospital",
      date: "Aug 05, 2026",
      time: "10:30 AM",
      status: "Confirmed",
      type: "In-Person",
    },
    {
      id: 2,
      doctor: "Dr. Sunita Thapa",
      specialty: "General Medicine",
      hospital: "Nepalgunj Medical College",
      date: "Aug 12, 2026",
      time: "02:15 PM",
      status: "Scheduled",
      type: "Online Consultation",
    },
  ]);

  const [records] = useState([
    {
      id: 101,
      title: "Comprehensive Blood Panel & Lipid Profile",
      facility: "Bheri Provincial Hospital Lab",
      date: "Jul 20, 2026",
      category: "Laboratory",
    },
    {
      id: 102,
      title: "Routine ECG & Cardiac Assessment",
      facility: "MedAssist Digital Clinic",
      date: "Jun 14, 2026",
      category: "Diagnostics",
    },
    {
      id: 103,
      title: "Antibiotic & Vital Supplement Prescription",
      facility: "Nepalgunj Care Pharmacy",
      date: "May 28, 2026",
      category: "Prescription",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. TOP HEADER BANNER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0d9488] to-[#0f766e] rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-medium text-teal-100">
                <FaShieldAlt className="text-teal-200" />
                <span>Verified Patient Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, {patientName}! 👋
              </h1>
              <p className="text-teal-100 text-sm max-w-xl">
                Your medical history, appointment schedule, and AI healthcare advisory are all up to date.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/ai-assistant"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-white text-[#0d9488] font-semibold text-sm rounded-2xl hover:bg-teal-50 transition shadow-sm"
              >
                <FaRobot className="text-base text-[#0d9488]" />
                <span>Ask AI Assistant</span>
              </Link>
              <Link
                to="/hospitals"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-[#0f766e] border border-teal-400/40 text-white font-semibold text-sm rounded-2xl hover:bg-teal-800 transition"
              >
                <FaPlus className="text-xs" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. STATS & QUICK METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Stat 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Upcoming Visits
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">2</h3>
              <p className="text-xs text-teal-600 font-medium mt-0.5">Next on Aug 05</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-xl">
              <FaCalendarCheck />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Medical Records
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">14</h3>
              <p className="text-xs text-slate-500 mt-0.5">Synced across clinics</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <FaFileMedical />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Blood Profile
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">O+</h3>
              <p className="text-xs text-slate-500 mt-0.5">Donor status active</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl">
              <FaHeartbeat />
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Prescriptions
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">3</h3>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">Refills up to date</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              <FaCapsules />
            </div>
          </div>
        </div>

        {/* 3. MAIN DASHBOARD CONTENT (TWO COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: APPOINTMENTS & MEDICAL RECORDS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* UPCOMING APPOINTMENTS CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Upcoming Consultations</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Your confirmed hospital visits and digital checkups</p>
                </div>
                <Link
                  to="/hospitals"
                  className="text-xs font-semibold text-[#0d9488] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Book New</span>
                  <FaChevronRight className="text-[10px]" />
                </Link>
              </div>

              <div className="space-y-4">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0d9488]/10 text-[#0d9488] flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                        <FaUserMd />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-slate-900 text-base">{appt.doctor}</h3>
                          <span className="px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 bg-teal-100 rounded-full">
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-600 mt-0.5">{appt.specialty} • {appt.hospital}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500 mt-2">
                          <span className="flex items-center space-x-1">
                            <FaClock className="text-slate-400" />
                            <span>{appt.date} at {appt.time}</span>
                          </span>
                          <span className="font-medium text-slate-700 bg-slate-200/60 px-2 py-0.5 rounded text-[11px]">
                            {appt.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                      <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                        Reschedule
                      </button>
                      <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0d9488] rounded-xl hover:bg-[#0f896f] transition shadow-2xs cursor-pointer">
                        View Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT MEDICAL RECORDS */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Recent Medical Records</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Verified clinical documents and lab reports</p>
                </div>
                <Link
                  to="/health-history"
                  className="text-xs font-semibold text-[#0d9488] hover:underline inline-flex items-center space-x-1"
                >
                  <span>View All</span>
                  <FaChevronRight className="text-[10px]" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <div key={rec.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-base flex-shrink-0">
                        <FaFileMedical />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{rec.title}</h4>
                        <p className="text-xs text-slate-500">{rec.facility} • {rec.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg">
                        {rec.category}
                      </span>
                      <button
                        title="Download Document"
                        className="p-2 text-slate-500 hover:text-[#0d9488] hover:bg-teal-50 rounded-xl transition cursor-pointer"
                      >
                        <FaDownload className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: SIDEBAR WIDGETS */}
          <div className="space-y-6">
            
            {/* AI HEALTH CONSULTANT CARD */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 text-2xl">
                <FaRobot />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI Health Assistant</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Have health queries or symptom concerns? Consult our trained medical AI assistant 24/7.
                </p>
              </div>
              <Link
                to="/ai-assistant"
                className="w-full py-2.5 px-4 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-xl transition text-xs flex items-center justify-center space-x-2"
              >
                <span>Start Symptom Triage</span>
                <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            {/* NEARBY CARE CENTERS */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Featured Care Centers</h3>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl border border-slate-100 hover:border-teal-200 transition flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center">
                      <FaHospital />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Bheri Hospital</h4>
                      <p className="text-[11px] text-slate-500">24/7 Emergency • Nepalgunj</p>
                    </div>
                  </div>
                  <Link to="/hospitals" className="text-xs font-semibold text-[#0d9488] hover:underline">
                    View
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-100 hover:border-teal-200 transition flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center">
                      <FaHospital />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">City Care Clinic</h4>
                      <p className="text-[11px] text-slate-500">OPD & Pediatrics • Surkhet</p>
                    </div>
                  </div>
                  <Link to="/hospitals" className="text-xs font-semibold text-[#0d9488] hover:underline">
                    View
                  </Link>
                </div>
              </div>
            </div>

            {/* EMERGENCY CONTACT HELPLINE */}
            <div className="bg-rose-50 rounded-3xl border border-rose-100 p-6 flex items-center space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Emergency Ambulance</h4>
                <p className="text-base font-extrabold text-rose-700 mt-0.5">102 / +977-81-520111</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
