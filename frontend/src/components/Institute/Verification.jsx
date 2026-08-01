import React from "react";

const Verification = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Registration Number */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Medical Registration / License No.
        </label>
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber || ""}
          onChange={handleChange}
          placeholder="e.g. NMA-REG-2080-891"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Province */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Province
          </label>
          <input
            type="text"
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
            placeholder="e.g. Lumbini Province"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>

        {/* District */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            District
          </label>
          <input
            type="text"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            placeholder="e.g. Banke"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>

        {/* Municipality / City */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            Municipality / City
          </label>
          <input
            type="text"
            name="municipality"
            value={formData.municipality || ""}
            onChange={handleChange}
            placeholder="e.g. Nepalgunj Sub-Metropolitan"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
          />
        </div>
      </div>

      {/* Full Address */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Full Street Address
        </label>
        <textarea
          name="fullAddress"
          rows={2}
          value={formData.fullAddress || ""}
          onChange={handleChange}
          placeholder="e.g. BP Chowk, Ward No. 2, Nepalgunj, Banke"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default Verification;
