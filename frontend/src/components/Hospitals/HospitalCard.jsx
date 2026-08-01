import React from "react";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";

/**
 * HospitalCard — renders one hospital from GET /api/hospitals response
 * api.md shape: { id, institutionType, district, municipality, department, services,
 *                 verificationStatus, User: { fullName, email, phoneNumber } }
 */
const HospitalCard = ({ hospital, isSelected, onSelect }) => {
  const name = hospital?.User?.fullName || hospital?.name || "Hospital";
  const location = [hospital?.municipality, hospital?.district].filter(Boolean).join(", ") || hospital?.location || "";
  const type = hospital?.institutionType
    ? hospital.institutionType.charAt(0).toUpperCase() + hospital.institutionType.slice(1)
    : "";

  return (
    <div
      onClick={() => onSelect(hospital.id)}
      className={`p-4 rounded-2xl cursor-pointer transition relative flex flex-col justify-between ${
        isSelected
          ? "border-2 border-[#0d9488] bg-white shadow-xs"
          : "border border-slate-200 hover:border-[#0d9488]/60 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-bold text-slate-900 text-sm truncate">{name}</h3>
          {location && (
            <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-1">
              <FaMapMarkerAlt className="text-teal-500 flex-shrink-0 text-[10px]" />
              <span className="truncate">{location}</span>
            </p>
          )}
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] shadow-xs flex-shrink-0">
            <FaCheck />
          </div>
        )}
      </div>

      {type && (
        <div className="mt-3 pt-2 border-t border-slate-100/60">
          <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
            {type}
          </span>
        </div>
      )}
    </div>
  );
};

export default HospitalCard;
