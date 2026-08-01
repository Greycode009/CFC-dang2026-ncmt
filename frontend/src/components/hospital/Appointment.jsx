import React from "react";
import { FaHospital, FaClock, FaSpinner } from "react-icons/fa";

const Appointment = ({
  doctorInfo,
  selectedHospital,
  selectedDate,
  selectedTime,
  isSubmitting,
  onConfirm,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
          3
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Confirm Appointment
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            Appointment Summary
          </p>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Review Your Details
          </h3>
        </div>

        <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100">
          <img
            src={
              doctorInfo?.avatar ||
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
            }
            alt={doctorInfo?.name || "Doctor Avatar"}
            className="w-12 h-12 rounded-full object-cover border-2 border-teal-50"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {doctorInfo?.name || "Dr. Sita Poudel"}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {doctorInfo?.specialty || "General Physician • OPD Department"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaHospital className="text-[9px]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Hospital
              </p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {selectedHospital?.name || "Nepalgunj Medical College"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaClock className="text-[9px]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Schedule
              </p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                Kartik {selectedDate}, 2080 at {selectedTime}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <span className="text-xs text-slate-600 font-medium">
            Booking Registration Fee:
          </span>
          <span className="text-xs font-bold text-[#0d9488]">Free</span>
        </div>

        <button
          disabled={isSubmitting}
          onClick={onConfirm}
          className="w-full py-3.5 px-4 bg-[#0d9488] hover:bg-[#0f896f] disabled:bg-[#0d9488]/60 text-white font-bold text-sm rounded-2xl shadow-sm transition cursor-pointer text-center flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin text-sm" />
              <span>Saving to Database...</span>
            </>
          ) : (
            <span>Confirm Appointment</span>
          )}
        </button>

        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          By confirming, you agree to our patient clinical code guidelines.
          Cancellations are free up to 2 hours before the appointment.
        </p>
      </div>
    </div>
  );
};

export default Appointment;
