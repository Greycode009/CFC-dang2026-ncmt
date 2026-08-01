import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaHospital, FaClock, FaPlus } from "react-icons/fa";

const AppointmentConfirmation = ({
  selectedHospitalName,
  selectedHospitalLocation,
  selectedDate,
  monthName,
  selectedTime,
  onReset,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-between">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center space-y-8 my-auto">

        {/* Big Teal Checkmark */}
        <div className="flex justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0d9488]/15 flex items-center justify-center p-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0d9488] text-white flex items-center justify-center shadow-md">
              <FaCheck className="text-2xl sm:text-3xl" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Appointment Confirmed!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Your appointment has been successfully booked. We've notified the clinic and secured your clinical slot.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 text-left space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <span className="text-[11px] font-extrabold text-[#0d9488] uppercase tracking-wider">
              Booking Details
            </span>
            <div className="h-0.5 w-6 bg-[#0d9488]" />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3.5">
              <div className="w-5 h-5 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaHospital className="text-[10px]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital Facility</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedHospitalName || "—"}</p>
                {selectedHospitalLocation && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{selectedHospitalLocation}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-5 h-5 rounded bg-[#0d9488] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaClock className="text-[10px]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Slot</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {monthName} {selectedDate} at {selectedTime}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
            <span className="text-xs text-slate-600 font-medium">Registration Fee Status:</span>
            <span className="text-xs font-bold text-[#0d9488]">Paid (Free)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-sm rounded-full shadow-md transition cursor-pointer"
          >
            View My Appointments
          </button>
          <button
            onClick={() => { onReset(); navigate("/"); }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm rounded-full transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#1b2533] text-slate-300 pt-12 pb-8 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0d9488] text-white flex items-center justify-center">
                  <FaPlus className="text-sm" />
                </div>
                <span className="text-lg font-bold text-white">Med Assist</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Your personal digital healthcare partner in Nepal.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">FAQ Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Hospital Partners</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Helpline</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Practice</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 Med Assist Nepal. All rights reserved.</p>
            <p>Nepalgunj, Banke</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppointmentConfirmation;
