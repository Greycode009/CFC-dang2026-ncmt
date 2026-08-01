import React from "react";

const PersonalBasics = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Age Input */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Age <span className="text-rose-500">*</span>
        </label>
        <input
          type="number"
          name="age"
          value={formData.age || ""}
          onChange={handleChange}
          placeholder="Enter your age (e.g. 28)"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Gender Select */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Gender <span className="text-rose-500">*</span>
        </label>
        <select
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Residential Address Input */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Residential Address <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="e.g. Ward No. 2, Nepalgunj, Banke"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default PersonalBasics;
