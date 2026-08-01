import React from "react";

const Services = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Available Departments */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Available Departments
        </label>
        <textarea
          name="departments"
          rows={4}
          value={formData.departments}
          onChange={handleChange}
          placeholder="e.g. Cardiology, Neurology, Pediatrics, ICU"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default Services;
