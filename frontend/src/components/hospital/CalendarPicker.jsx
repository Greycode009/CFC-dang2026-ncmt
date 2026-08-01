import React from "react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

/**
 * Generates the array of next 7 available booking days starting from today
 */
export function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = d.toLocaleDateString("en-US", { month: "short" });
    const fullMonthName = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const dateNum = d.getDate();
    const year = d.getFullYear();
    const monthIndex = d.getMonth() + 1;
    const fullDate = `${year}-${String(monthIndex).padStart(2, "0")}-${String(dateNum).padStart(2, "0")}`;

    days.push({
      dateObj: d,
      dayName,
      monthName,
      fullMonthName,
      dateNum,
      year,
      fullDate,
      formattedLabel: `${dayName}, ${monthName} ${dateNum}`,
      isToday: i === 0,
      isTomorrow: i === 1,
    });
  }
  return days;
}

const CalendarPicker = ({ selectedFullDate, onSelectDateObj }) => {
  const availableDays = getNext7Days();
  const currentMonthYear = availableDays[0]?.fullMonthName || "";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-[#0d9488] text-xs" />
          <h3 className="font-bold text-slate-900 text-sm">{currentMonthYear}</h3>
        </div>
        <span className="px-2.5 py-0.5 bg-teal-50 text-[#0d9488] border border-teal-200/60 rounded-full text-[11px] font-extrabold">
          Next 7 Days Only
        </span>
      </div>

      {/* 7 Days Quick Selector Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {availableDays.map((day) => {
          const isSelected = selectedFullDate === day.fullDate;
          return (
            <button
              key={day.fullDate}
              type="button"
              onClick={() => onSelectDateObj(day)}
              className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                isSelected
                  ? "bg-[#0d9488] text-white border-[#0d9488] shadow-md shadow-teal-500/15 scale-105"
                  : "bg-slate-50 hover:bg-teal-50/60 text-slate-700 border-slate-200/80 hover:border-teal-200"
              }`}
            >
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                isSelected ? "text-teal-100" : "text-slate-400"
              }`}>
                {day.dayName}
              </span>
              <span className="text-base font-black my-0.5">
                {day.dateNum}
              </span>
              <span className={`text-[9px] font-bold ${
                isSelected ? "text-teal-100" : "text-slate-500"
              }`}>
                {day.isToday ? "Today" : day.isTomorrow ? "Tomorrow" : day.monthName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper Footer Note */}
      <p className="text-[11px] text-slate-500 flex items-center space-x-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <FaCheckCircle className="text-[#0d9488] text-xs flex-shrink-0" />
        <span>Appointments can be booked up to 7 days in advance.</span>
      </p>
    </div>
  );
};

export default CalendarPicker;
