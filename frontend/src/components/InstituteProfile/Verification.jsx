import React from "react";

const Verification = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Street Address */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Street Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter street address"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* City / District */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          City / District
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default Verification;
