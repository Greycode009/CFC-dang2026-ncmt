import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarPicker = ({ selectedDate, onSelectDate }) => {
  // Calendar state for month navigation
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Kartik 2080, 1 = Mangsir 2080, etc.

  const months = [
    { name: "Kartik 2080", daysCount: 30, startOffset: 3 }, // starts on Wed (3)
    { name: "Mangsir 2080", daysCount: 29, startOffset: 5 },
    { name: "Poush 2080", daysCount: 30, startOffset: 0 },
  ];

  const activeMonth = months[currentMonthIndex];

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  // Generate calendar grid days array
  const prevMonthOverflowDays = Array.from({ length: activeMonth.startOffset }, (_, i) => 28 + i);
  const currentMonthDays = Array.from({ length: activeMonth.daysCount }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Calendar Header with Month Navigation */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm">{activeMonth.name}</h3>
        <div className="flex items-center space-x-1 text-slate-400">
          <button
            onClick={handlePrevMonth}
            disabled={currentMonthIndex === 0}
            className="p-1 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
            title="Previous Month"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={handleNextMonth}
            disabled={currentMonthIndex === months.length - 1}
            className="p-1 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
            title="Next Month"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Mini Calendar Grid */}
      <div className="text-center text-xs">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 font-bold text-slate-400 text-[11px] mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Date numbers grid */}
        <div className="grid grid-cols-7 gap-1 text-slate-700 font-medium text-xs">
          {/* Previous month overflow days (disabled look) */}
          {prevMonthOverflowDays.map((dayNum, idx) => (
            <span key={`prev-${idx}`} className="p-1.5 text-slate-300 pointer-events-none">
              {dayNum}
            </span>
          ))}

          {/* Active month days */}
          {currentMonthDays.map((dayNum) => {
            const isSelected = selectedDate === dayNum;
            return (
              <button
                key={dayNum}
                onClick={() => onSelectDate(dayNum, activeMonth.name)}
                className={`py-1.5 rounded-lg font-bold transition cursor-pointer text-center ${
                  isSelected
                    ? "bg-[#0d9488] text-white shadow-xs"
                    : "hover:bg-teal-50 text-slate-700 hover:text-[#0d9488]"
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
