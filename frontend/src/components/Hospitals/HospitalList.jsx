import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import HospitalCard from "./HospitalCard";

const HospitalList = ({ hospitals, selectedHospitalId, onSelectHospital }) => {
  return (
    <div className="space-y-4">
      {/* Step Title */}
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
          1
        </div>
        <h2 className="text-base font-bold text-slate-900">Select Hospital</h2>
      </div>

      {/* Hospitals Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-4">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          Available Facilities in Banke
        </p>

        {/* Hospital Options */}
        <div className="space-y-3">
          {hospitals.map((hosp) => (
            <HospitalCard
              key={hosp.id}
              hospital={hosp}
              isSelected={hosp.id === selectedHospitalId}
              onSelect={onSelectHospital}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="pt-2 flex items-start space-x-2 text-xs text-slate-500">
          <FaInfoCircle className="text-[#0d9488] text-sm flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-snug">
            All selected clinics accept Med Assist instant booking codes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
