import React from "react";

const EmergencyContact = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Contact Person Name */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Contact Person Name
        </label>
        <input
          type="text"
          name="emergencyName"
          value={formData.emergencyName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Relationship */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Relationship
        </label>
        <input
          type="text"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          placeholder="e.g. Spouse, Parent, Sibling"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Phone Number
        </label>
        <input
          type="tel"
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default EmergencyContact;
