import React from "react";
import { Link } from "react-router-dom";
import {
  FaHospital,
  FaEdit,
  FaStethoscope,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaArrowLeft,
  FaUserCheck,
  FaBed,
  FaUserMd,
  FaMoneyBillWave,
  FaCalendarCheck
} from "react-icons/fa";

const InstituteProfileDetails = ({ profileData, onEdit }) => {
  const institution = profileData?.institution || {};
  const user = institution?.User || {};
  const isVerified = institution?.verificationStatus === "verified";
  const isPending = institution?.verificationStatus === "pending";

  const registrationFee = institution?.registrationFee !== undefined && institution?.registrationFee !== null ? institution.registrationFee : 500;
  const timeSlotsStr = institution?.availableTimeSlots || "09:00 AM, 09:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 02:00 PM, 02:30 PM, 03:00 PM";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Navigation & Verification Status */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0d9488] transition"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Dashboard</span>
          </Link>

          <span
            className={`inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
              isVerified
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : isPending
                ? "bg-amber-50 border-amber-200 text-amber-800"
                : "bg-slate-100 border-slate-200 text-slate-700"
            }`}
          >
            <FaShieldAlt className={`text-xs ${isVerified ? "text-emerald-600" : isPending ? "text-amber-600" : "text-slate-400"}`} />
            <span className="capitalize">
              {isVerified ? "Verified Institution" : isPending ? "Verification Pending" : "Unverified Provider"}
            </span>
          </span>
        </div>

        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#0d9488] text-white flex items-center justify-center text-3xl font-extrabold shadow-md flex-shrink-0">
              <FaHospital />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {user.fullName || institution.name || "Institution Name"}
                </h1>
                <span className="px-2.5 py-0.5 bg-teal-50 text-[#0d9488] font-extrabold text-[10px] uppercase rounded-full border border-teal-100 capitalize">
                  {institution.institutionType || "Hospital"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center space-x-1">
                  <FaEnvelope className="text-slate-400" />
                  <span>{user.email || "No email provided"}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <FaPhoneAlt className="text-slate-400" />
                  <span>{user.phoneNumber || "No phone provided"}</span>
                </span>
                {institution.registrationNumber && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                      Reg: {institution.registrationNumber}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="w-full sm:w-auto px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <FaEdit className="text-sm" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Section 1: Facility Specifications */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaHospital className="text-base" />
              <span>Facility Specifications</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Institution Type</span>
                <span className="text-slate-900 font-bold text-sm capitalize">
                  {institution.institutionType || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Registration No.</span>
                <span className="text-slate-900 font-bold text-sm">
                  {institution.registrationNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block flex items-center space-x-1">
                  <FaBed className="text-slate-400" />
                  <span>Total Inpatient Beds</span>
                </span>
                <span className="text-slate-900 font-bold text-sm">
                  {institution.beds ? `${institution.beds} Beds` : "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block flex items-center space-x-1">
                  <FaUserMd className="text-slate-400" />
                  <span>Medical Doctors</span>
                </span>
                <span className="text-slate-900 font-bold text-sm">
                  {institution.noOfDoctor ? `${institution.noOfDoctor} Doctors` : "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Operational Booking Fee & Time Slots */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaMoneyBillWave className="text-base text-amber-500" />
              <span>Operational Fee & Time Slots</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">OPD Registration Fee</span>
                <span className="text-[#0d9488] font-extrabold text-base block mt-0.5">
                  NPR {registrationFee}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Configured Time Slots</span>
                <span className="text-slate-800 font-semibold leading-relaxed block mt-0.5 line-clamp-2">
                  {timeSlotsStr}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Clinical Departments & Services */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaStethoscope className="text-base" />
              <span>Clinical Departments & Services</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Specialized Departments</span>
                <span className="text-slate-800 font-semibold leading-relaxed block mt-0.5">
                  {institution.department || "No departments listed"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Key Services</span>
                <span className="text-slate-800 font-semibold leading-relaxed block mt-0.5">
                  {institution.services || "No services listed"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Authorized Representative Details */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0d9488] font-bold text-sm border-b border-slate-100 pb-3">
              <FaClock className="text-base" />
              <span>Authorized Representative & Location Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Operating Schedule</span>
                <span className="text-slate-900 font-bold text-sm flex items-center space-x-1 mt-0.5">
                  <FaClock className="text-[#0d9488]" />
                  <span>
                    {institution.openingTime && institution.closingTime
                      ? `${institution.openingTime} – ${institution.closingTime}`
                      : "Hours not specified"}
                  </span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block flex items-center space-x-1">
                  <FaUserCheck className="text-slate-400" />
                  <span>Authorized Representative</span>
                </span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  {institution.authPersonName || "Not assigned"}
                </span>
                <span className="text-slate-500 block mt-0.5">
                  {institution.authPersonNumber || "No contact number"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Primary Location</span>
                <span className="text-slate-900 font-bold text-sm flex items-center space-x-1 mt-0.5">
                  <FaMapMarkerAlt className="text-teal-600 flex-shrink-0" />
                  <span>
                    {[institution.fullAddress, institution.municipality, institution.district, institution.province]
                      .filter(Boolean)
                      .join(", ") || "Address not provided"}
                  </span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM EDIT CALLOUT */}
        <div className="bg-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200/70">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Need to update facility specifications or operating hours?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Keep your institution profile accurate to help patients find your clinical services.</p>
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

export default InstituteProfileDetails;
