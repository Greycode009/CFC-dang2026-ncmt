import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaHeartbeat,
  FaNotesMedical,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaArrowLeft
} from "react-icons/fa";

const PatientProfileDetails = ({ profileData, onEdit }) => {
  const patient = profileData?.patient || {};
  const user = patient?.User || {};

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0d9488] transition"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Dashboard</span>
          </Link>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full">
            <FaShieldAlt className="text-teal-600 text-xs" />
            <span>Verified Patient Profile</span>
          </span>
        </div>

        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#0d9488] text-white flex items-center justify-center text-3xl font-extrabold shadow-md flex-shrink-0">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "P"}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {user.fullName || "Patient Profile"}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <FaEnvelope className="text-slate-400" />
                  <span>{user.email || "No email"}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <FaPhoneAlt className="text-slate-400" />
                  <span>{user.phoneNumber || "No phone"}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="w-full sm:w-auto px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <FaEdit className="text-sm" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Section 1: Demographics & Vitals */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaHeartbeat className="text-base" />
              <span>Demographics & Body Metrics</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Age</span>
                <span className="text-slate-900 font-bold text-sm">{patient.age || "N/A"} yrs</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Gender</span>
                <span className="text-slate-900 font-bold text-sm">{patient.gender || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Blood Group</span>
                <span className="text-rose-600 font-bold text-sm">{patient.bloodGroup || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Height & Weight</span>
                <span className="text-slate-900 font-bold text-sm">
                  {patient.height || "--"} cm / {patient.weight || "--"} kg
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Medical History */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaNotesMedical className="text-base" />
              <span>Medical Conditions & Allergies</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Known Allergies</span>
                <span className="text-slate-800 font-semibold">{patient.allergies || "None declared"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Chronic Conditions</span>
                <span className="text-slate-800 font-semibold">{patient.chronicConditions || "None declared"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Current Medications</span>
                <span className="text-slate-800 font-semibold">{patient.currentMedications || "None"}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Emergency Contact & Address */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaPhoneAlt className="text-base" />
              <span>Emergency Contact & Primary Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Emergency Contact Name</span>
                <span className="text-slate-900 font-bold text-sm">{patient.emergencyContactName || "Not provided"}</span>
                <span className="text-slate-500 block mt-0.5">{patient.emergencyContactNumber || "No phone"}</span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Residential Address</span>
                <span className="text-slate-900 font-bold text-sm flex items-center space-x-1 mt-0.5">
                  <FaMapMarkerAlt className="text-teal-600" />
                  <span>{patient.address || "Nepalgunj, Banke"}</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM EDIT BUTTON CALLOUT */}
        <div className="bg-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200/70">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Need to update your clinical details?</h3>

          </div>
          <button
            onClick={onEdit}
            className="w-full sm:w-auto px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <FaEdit className="text-sm" />
            <span>Edit Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PatientProfileDetails;
