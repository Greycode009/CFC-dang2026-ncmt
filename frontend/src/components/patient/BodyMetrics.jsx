import React from "react";

const BodyMetrics = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Height Input */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Height
        </label>
        <div className="relative">
          <input
            type="number"
            name="height"
            value={formData.height || ""}
            onChange={handleChange}
            placeholder="e.g. 168"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
            cm
          </span>
        </div>
      </div>

      {/* Weight Input */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Weight
        </label>
        <div className="relative">
          <input
            type="number"
            name="weight"
            value={formData.weight || ""}
            onChange={handleChange}
            placeholder="e.g. 62"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
            kg
          </span>
        </div>
      </div>

      {/* Blood Group Select */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Blood Group
        </label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
        >
          <option value="">Select Blood Group</option>
          <option value="O+">O-positive (O+)</option>
          <option value="O-">O-negative (O-)</option>
          <option value="A+">A-positive (A+)</option>
          <option value="A-">A-negative (A-)</option>
          <option value="B+">B-positive (B+)</option>
          <option value="B-">B-negative (B-)</option>
          <option value="AB+">AB-positive (AB+)</option>
          <option value="AB-">AB-negative (AB-)</option>
        </select>
      </div>
    </div>
  );
};

export default BodyMetrics;
