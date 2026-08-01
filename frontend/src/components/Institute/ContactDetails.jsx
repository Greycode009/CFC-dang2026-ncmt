import React from "react";

const ContactDetails = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Authorized Contact Person Name */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Authorized Contact Person Name
        </label>
        <input
          type="text"
          name="authPersonName"
          value={formData.authPersonName || ""}
          onChange={handleChange}
          placeholder="e.g. Dr. Rajesh Sharma (Medical Director)"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Authorized Person Phone */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Authorized Person Direct Phone
        </label>
        <input
          type="text"
          name="authPersonNumber"
          value={formData.authPersonNumber || ""}
          onChange={handleChange}
          placeholder="e.g. 9841234567"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default ContactDetails;
