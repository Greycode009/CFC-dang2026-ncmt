const MedicalHistory = ({ formData, handleChange }) => {
  return (
    <div className="space-y-2">
      {/* Known Allergies */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Allergies
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

      {/* Chronic Conditions */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Chronic Conditions
        </label>

        <textarea
          name="chronicConditions"
          value={formData.chronicConditions}
          onChange={handleChange}
          placeholder="e.g. Asthma, Diabetes"
          className="w-full h-20 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] resize-none"
        ></textarea>
      </div>
      {/* Current Medications  */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800">
          Current Medications
        </label>

        <textarea
          name="currentmedications"
          value={formData.currentMedications}
          onChange={handleChange}
          placeholder="e.g. Metformin 500mg"
          className="w-full h-20 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0d9488] resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default MedicalHistory;
