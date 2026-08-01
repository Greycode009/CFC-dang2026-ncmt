import React from "react";

const InstituteBasics = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Official Facility Name */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Official Institution Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="e.g. Nepalgunj Medical College Hospital"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Official Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="e.g. contact@hospital.org.np"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>

        {/* Helpline Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Primary Helpline / Phone
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="e.g. +977-81-520123"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Institute Type */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Institution Type
          </label>
          <select
            name="institutionType"
            value={formData.institutionType || "hospital"}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white capitalize"
          >
            <option value="hospital">Hospital</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>

        {/* Total Beds */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Total Inpatient Beds
          </label>
          <input
            type="number"
            name="beds"
            value={formData.beds || ""}
            onChange={handleChange}
            placeholder="e.g. 150"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>

        {/* Number of Doctors */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Medical Doctors Count
          </label>
          <input
            type="number"
            name="noOfDoctor"
            value={formData.noOfDoctor || ""}
            onChange={handleChange}
            placeholder="e.g. 24"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>
      </div>
    </div>
  );
};

export default InstituteBasics;
