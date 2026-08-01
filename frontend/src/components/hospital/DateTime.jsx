import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DateTime = ({
  selectedDate,
  selectedTime,
  timeSlots,
  onDateSelect,
  onTimeSelect,
}) => {
  return (
    <div className="lg:col-span-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
          2
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Choose Date & Time
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Kartik 2080</h3>
          <div className="flex items-center space-x-1 text-slate-400">
            <button className="p-1 hover:text-slate-700 transition cursor-pointer">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="p-1 hover:text-slate-700 transition cursor-pointer">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        <div className="text-center text-xs">
          <div className="grid grid-cols-7 gap-1 font-bold text-slate-400 text-[11px] mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-slate-700 font-medium text-xs">
            <span className="p-1.5 text-slate-400">29</span>
            <span className="p-1.5 text-slate-400">30</span>
            <span className="p-1.5 text-slate-400">31</span>
            <span className="p-1.5">1</span>
            <span className="p-1.5">2</span>
            <span className="p-1.5">3</span>
            <span className="p-1.5">4</span>

            <span className="p-1.5">5</span>
            <span className="p-1.5">6</span>
            <span className="p-1.5">7</span>
            <span className="p-1.5">8</span>
            <span className="p-1.5">9</span>
            <span className="p-1.5">10</span>
            <span className="p-1.5">11</span>

            <span className="p-1.5">12</span>
            <span className="p-1.5">13</span>
            <span className="p-1.5">14</span>
            <span className="p-1.5">15</span>
            <span className="p-1.5">16</span>

            <button
              onClick={() => onDateSelect(17)}
              className={`py-1 rounded-lg border font-bold cursor-pointer transition ${
                selectedDate === 17
                  ? "border-[#0d9488] text-[#0d9488]"
                  : "border-slate-200 text-slate-700 hover:border-teal-400"
              }`}
            >
              17
            </button>

            <button
              onClick={() => onDateSelect(18)}
              className={`py-1 rounded-lg font-bold cursor-pointer transition ${
                selectedDate === 18
                  ? "bg-[#0d9488] text-white shadow-xs"
                  : "border border-slate-200 text-slate-700 hover:border-teal-400"
              }`}
            >
              18
            </button>

            <span className="p-1.5">19</span>
            <span className="p-1.5">20</span>
            <span className="p-1.5">21</span>
            <span className="p-1.5">22</span>
            <span className="p-1.5">23</span>
            <span className="p-1.5">24</span>
            <span className="p-1.5">25</span>
          </div>
        </div>

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
                  onClick={() => onTimeSelect(slot)}
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
      </div>
    </div>
  );
};

export default DateTime;
