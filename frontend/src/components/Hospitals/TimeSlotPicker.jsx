import React from "react";

const TimeSlotPicker = ({ timeSlots, selectedTime, onSelectTime }) => {
  return (
    <div className="space-y-3 pt-2 border-t border-slate-100">
      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
        Available Time Slots
      </p>

      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => {
          const isTimeSelected = slot === selectedTime;
          return (
            <button
              key={slot}
              onClick={() => onSelectTime(slot)}
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition cursor-pointer text-center ${
                isTimeSelected
                  ? "bg-[#0d9488] border-[#0d9488] text-white shadow-2xs"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#0d9488]"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
