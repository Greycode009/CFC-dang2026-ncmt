import React from "react";

const MedicalHistory = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* Known Allergies */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Known Allergies
        </label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="e.g. Penicillin, Peanuts"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Pre-existing Conditions */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Pre-existing Conditions
        </label>
        <input
          type="text"
          name="conditions"
          value={formData.conditions}
          onChange={handleChange}
          placeholder="e.g. Asthma, Diabetes"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>
    </div>
  );
};

export default MedicalHistory;
