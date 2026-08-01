import React from "react";

const ContactDetails = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      {/* OPD Timings */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          OPD Timings
        </label>
        <input
          type="text"
          name="opdHours"
          value={formData.opdHours}
          onChange={handleChange}
          placeholder="08:00 AM - 08:00 PM"
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488]"
        />
      </div>

      {/* Emergency Availability */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Emergency Service Availability
        </label>
        <select
          name="emergencyCare"
          value={formData.emergencyCare}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] bg-white"
        >
          <option value="24/7 Available">24/7 Available</option>
          <option value="Daytime Only">Daytime Only</option>
          <option value="On Call">On Call</option>
        </select>
      </div>
    </div>
  );
};

export default ContactDetails;
