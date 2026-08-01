import React from "react";
import { FaHospital, FaClock, FaSpinner } from "react-icons/fa";

const AppointmentSummaryCard = ({
  selectedHospitalName,
  selectedHospitalLocation,
  selectedDate,
  monthName,
  selectedTime,
  isSubmitting,
  onConfirm,
}) => {
  return (
    <div className="space-y-4">
      {/* Step Title */}
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
          3
        </div>
        <h2 className="text-base font-bold text-slate-900">Confirm Appointment</h2>
      </div>

      {/* Summary White Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Appointment Summary
          </p>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Review Your Details</h3>
        </div>

        {/* Selection Summary Items */}
        <div className="space-y-4">
          {/* Hospital */}
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaHospital className="text-[9px]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedHospitalName || "—"}</p>
              {selectedHospitalLocation && (
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedHospitalLocation}</p>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaClock className="text-[9px]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Schedule</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {monthName} {selectedDate} at {selectedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Fee Box */}
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <span className="text-xs text-slate-600 font-medium">Booking Registration Fee:</span>
          <span className="text-xs font-bold text-[#0d9488]">Free</span>
        </div>

        {/* Confirm Button */}
        <button
          disabled={isSubmitting}
          onClick={onConfirm}
          className="w-full py-3.5 px-4 bg-[#0d9488] hover:bg-[#0f896f] disabled:opacity-60 text-white font-bold text-sm rounded-2xl shadow-sm transition cursor-pointer flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin text-sm" />
              <span>Booking Appointment...</span>
            </>
          ) : (
            <span>Confirm Appointment</span>
          )}
        </button>

        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          By confirming, you agree to our patient clinical code guidelines. Cancellations are free up to 2 hours before the appointment.
        </p>
      </div>
    </div>
  );
};

export default AppointmentSummaryCard;
