import React from "react";

const TimeSlotPicker = ({ timeSlots, selectedTime, onSelectTime, bookedSlots = [] }) => {
  return (
    <div className="space-y-3 pt-2 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          Available Time Slots
        </p>
        {bookedSlots && bookedSlots.length > 0 && (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
            {bookedSlots.length} slot{bookedSlots.length > 1 ? "s" : ""} unavailable
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => {
          const isBooked = bookedSlots && bookedSlots.includes(slot);
          const isTimeSelected = slot === selectedTime;

          return (
            <button
              key={slot}
              type="button"
              disabled={isBooked}
              onClick={() => !isBooked && onSelectTime(slot)}
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition text-center relative ${
                isBooked
                  ? "bg-slate-100 border-slate-200/90 text-slate-400 cursor-not-allowed opacity-60"
                  : isTimeSelected
                  ? "bg-[#0d9488] border-[#0d9488] text-white shadow-2xs cursor-pointer"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#0d9488] cursor-pointer"
              }`}
            >
              <div className={isBooked ? "line-through text-slate-400 font-normal text-[11px]" : ""}>
                {slot}
              </div>
              {isBooked && (
                <span className="text-[9px] font-extrabold text-rose-500 uppercase tracking-tight block -mt-0.5">
                  Booked
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
