import React from "react";

const InstituteBasics = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Institute Type */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Institute Type
        </label>
        <select
          name="instituteType"
          value={formData.instituteType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
        >
          <option value="General Hospital">General Hospital</option>
          <option value="Specialized Clinic">Specialized Clinic</option>
          <option value="Diagnostic Center">Diagnostic Center</option>
          <option value="Nursing Home">Nursing Home</option>
        </select>
      </div>

      {/* Bed Capacity */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Total Bed Capacity
        </label>
        <input
          type="number"
          name="bedCapacity"
          value={formData.bedCapacity}
          onChange={handleChange}
          placeholder="e.g. 150"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default InstituteBasics;
