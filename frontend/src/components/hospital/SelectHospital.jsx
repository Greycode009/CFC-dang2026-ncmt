import React from "react";
import { FaCheck, FaStar, FaInfoCircle } from "react-icons/fa";

const SelectHospital = ({
  hospitalsList,
  selectedHospitalId,
  onSelectHospital,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
          1
        </div>
        <h2 className="text-base font-bold text-slate-900">Select Hospital</h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-4">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          Available Facilities in Banke
        </p>

        <div className="space-y-3">
          {hospitalsList.map((hosp) => {
            const isSelected = hosp.id === selectedHospitalId;
            return (
              <div
                key={hosp.id}
                onClick={() => onSelectHospital(hosp.id)}
                className={`p-4 rounded-2xl cursor-pointer transition relative flex flex-col justify-between ${
                  isSelected
                    ? "border-2 border-[#0d9488] bg-white shadow-xs"
                    : "border border-slate-200 hover:border-[#0d9488]/60 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {hosp.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {hosp.location}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] shadow-xs">
                      <FaCheck />
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-600 mt-3 pt-2 border-t border-slate-100/60">
                  <span className="flex items-center space-x-1 text-amber-500 font-bold">
                    <FaStar className="text-xs" />
                    <span>{hosp.rating}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">
                    {hosp.distance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

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

export default SelectHospital;
