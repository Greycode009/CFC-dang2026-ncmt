import React, { useState, useEffect } from "react";
import { FaSpinner, FaPlus } from "react-icons/fa";
import HospitalList from "../components/Hospitals/HospitalList";
import CalendarPicker from "../components/Hospitals/CalendarPicker";
import TimeSlotPicker from "../components/Hospitals/TimeSlotPicker";
import AppointmentSummaryCard from "../components/Hospitals/AppointmentSummaryCard";
import AppointmentConfirmation from "../components/Hospitals/AppointmentConfirmation";
import { fetchHospitals, getHospitalById, bookAppointment } from "../api";
import { useAuth } from "../context/AuthContext";

const Hospitals = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(18);
  const [monthName, setMonthName] = useState("Kartik 2080");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  // Default time slots (backend does not expose a separate slots endpoint per api.md)
  const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"];

  // Fetch Hospitals on Mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // GET /api/hospitals — returns { hospitals: [...] }
        const data = await fetchHospitals();
        const list = data?.hospitals || data || [];
        setHospitalsList(list);
        if (list.length > 0) {
          setSelectedHospitalId(list[0].id);
        }
      } catch (err) {
        console.error("Failed to load hospitals from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle hospital selection change
  const handleSelectHospital = (id) => {
    setSelectedHospitalId(id);
  };

  // Handle date picker selection
  const handleSelectDate = (dayNum, month) => {
    setSelectedDate(dayNum);
    if (month) {
      setMonthName(month);
    }
  };

  // Submit appointment — POST /api/appointments
  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      // api.md 5.1: { institutionId, appointmentDate, appointmentTime, reason }
      await bookAppointment({
        institutionId: selectedHospitalId,
        appointmentDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`,
        appointmentTime: selectedTime,
        reason: "General Health Checkup & Consultation",
      });
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert("Failed to book appointment: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  // selectedHospital — mapped to match HospitalCard shape from api.md response
  // api.md returns: { id, institutionType, district, municipality, department, services, User: { fullName, phoneNumber } }
  const selectedHospital = hospitalsList.find((h) => h.id === selectedHospitalId) || hospitalsList[0] || {};
  const selectedHospitalName = selectedHospital?.User?.fullName || selectedHospital?.name || "";
  const selectedHospitalLocation = [selectedHospital?.municipality, selectedHospital?.district].filter(Boolean).join(", ");

  // If appointment confirmed -> Render Confirmation Success View (Image 2)
  if (isConfirmed) {
    return (
      <AppointmentConfirmation
        selectedHospitalName={selectedHospitalName}
        selectedHospitalLocation={selectedHospitalLocation}
        selectedDate={selectedDate}
        monthName={monthName}
        selectedTime={selectedTime}
        onReset={() => setIsConfirmed(false)}
      />
    );
  }

  // Render Interactive Booking Form View (Image 1)
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      
      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        
        {/* PAGE HEADER */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 bg-[#e6f7f3] text-[#0d9488] text-[11px] font-extrabold uppercase tracking-wider rounded-full">
            Appointment Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book a Clinical Visit
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Secure an instantly confirmed slot at your preferred healthcare center. Our platform connects directly with the hospital's real-time databases for guaranteed times.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
            <FaSpinner className="animate-spin text-3xl text-[#0d9488]" />
            <p className="text-xs font-semibold">Connecting to healthcare database...</p>
          </div>
        ) : (
          /* 3-COLUMN BOOKING FLOW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* STEP 1: SELECT HOSPITAL */}
            <div className="lg:col-span-4">
              <HospitalList
                hospitals={hospitalsList}
                selectedHospitalId={selectedHospitalId}
                onSelectHospital={handleSelectHospital}
              />
            </div>

            {/* STEP 2: CHOOSE DATE & TIME */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#0d9488]/15 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-[#0d9488]/30">
                  2
                </div>
                <h2 className="text-base font-bold text-slate-900">Choose Date & Time</h2>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-5">
                <CalendarPicker
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                />
                <TimeSlotPicker
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </div>
            </div>

            {/* STEP 3: CONFIRM APPOINTMENT */}
            <div className="lg:col-span-4">
              <AppointmentSummaryCard
                selectedHospitalName={selectedHospitalName}
                selectedHospitalLocation={selectedHospitalLocation}
                selectedDate={selectedDate}
                monthName={monthName}
                selectedTime={selectedTime}
                isSubmitting={isSubmitting}
                onConfirm={handleConfirm}
              />
            </div>

          </div>
        )}

      </div>

      {/* FOOTER */}
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
                Your personal digital healthcare partner in Nepal. Bridging patients with expert medical institutions.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">FAQ Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Hospital Partners</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Helpline</a></li>
                <li><a href="#" className="hover:text-white transition">Emergency Nepalgunj</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Data Consent</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Practice</a></li>
                <li><a href="#" className="hover:text-white transition">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 Med Assist Nepal. All rights reserved.</p>
            <p>Designed for Ram Sharma • Nepalgunj, Banke</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Hospitals;
