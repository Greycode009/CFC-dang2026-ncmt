import React from "react";

const Services = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Specialized Departments */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Specialized Departments
        </label>
        <textarea
          name="department"
          rows={3}
          value={formData.department || ""}
          onChange={handleChange}
          placeholder="e.g. General Surgery, Cardiology, Pediatrics, OPD & Pathology, ICU Support"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
        <p className="text-[11px] text-slate-400">Separate multiple departments with commas.</p>
      </div>

      {/* Key Clinical Services */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Key Clinical Services & Facilities
        </label>
        <textarea
          name="services"
          rows={3}
          value={formData.services || ""}
          onChange={handleChange}
          placeholder="e.g. 24/7 Emergency, CT Scan, Ultrasound, Digital X-Ray, Blood Bank, Pharmacy"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default Services;
