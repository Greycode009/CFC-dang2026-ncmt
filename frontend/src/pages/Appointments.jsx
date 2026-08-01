import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  FaCalendarPlus, 
  FaListAlt, 
  FaSpinner, 
  FaPlus, 
  FaHospital, 
  FaClock, 
  FaPhoneAlt, 
  FaExclamationTriangle, 
  FaArrowRight, 
  FaTimes, 
  FaCheckCircle,
  FaBan,
  FaCalendarCheck
} from "react-icons/fa";
import HospitalList from "../components/Hospitals/HospitalList";
import CalendarPicker, { getNext7Days } from "../components/Hospitals/CalendarPicker";
import TimeSlotPicker from "../components/Hospitals/TimeSlotPicker";
import AppointmentSummaryCard from "../components/Hospitals/AppointmentSummaryCard";
import AppointmentConfirmation from "../components/Hospitals/AppointmentConfirmation";
import { fetchHospitals, bookAppointment, getMyAppointments, cancelAppointment } from "../api";
import { useAuth } from "../context/AuthContext";

const Appointments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Active Tab state: "book" or "my"
  const [activeTab, setActiveTab] = useState("book");

  // Booking Flow States
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  
  // Restricted 7-day date state
  const available7Days = getNext7Days();
  const [selectedDateObj, setSelectedDateObj] = useState(available7Days[0]);
  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  // My Appointments List States
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [myAppointments, setMyAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);

  // Themed Notice / Error Modal State
  const [errorModal, setErrorModal] = useState(null);

  // Default time slots
  const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"];

  // 1. Fetch Hospitals for Booking
  useEffect(() => {
    async function loadData() {
      setLoadingHospitals(true);
      try {
        const data = await fetchHospitals();
        const list = data?.hospitals || data || [];
        setHospitalsList(list);
        
        // Pre-select hospital from URL query parameter ?hospitalId=...
        const paramId = searchParams.get("hospitalId");
        if (paramId && list.some((h) => String(h.id) === String(paramId))) {
          setSelectedHospitalId(Number(paramId));
        } else if (list.length > 0) {
          setSelectedHospitalId(list[0].id);
        }
      } catch (err) {
        console.error("Failed to load hospitals from API:", err);
      } finally {
        setLoadingHospitals(false);
      }
    }
    loadData();
  }, [searchParams]);

  // 2. Fetch Patient's Appointments
  const loadPatientAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const res = await getMyAppointments();
      setMyAppointments(res?.appointments || []);
    } catch (err) {
      console.error("Failed to fetch my appointments:", err);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    if (activeTab === "my") {
      loadPatientAppointments();
    }
  }, [activeTab]);

  // Handle hospital selection change
  const handleSelectHospital = (id) => {
    setSelectedHospitalId(id);
  };

  // Submit appointment — POST /api/appointments
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setErrorModal(null);
    try {
      await bookAppointment({
        institutionId: selectedHospitalId,
        appointmentDate: selectedDateObj.fullDate,
        appointmentTime: selectedTime,
        reason: "General Health Checkup & Consultation",
      });
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Something went wrong.";
      const status = err.response?.status;
      const isUnauthorized = status === 401 || msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("token") || !user?.isLoggedIn;
      const isProfileRequired = msg.toLowerCase().includes("complete your profile") || msg.toLowerCase().includes("profile");
      
      if (isUnauthorized) {
        setErrorModal({
          title: "Login Required to Continue",
          message: "Please log in to your patient account first to book and manage clinical appointments.",
          isLoginRequired: true,
        });
      } else if (isProfileRequired) {
        setErrorModal({
          title: "Profile Completion Required",
          message: msg,
          isProfileRequired: true,
        });
      } else {
        setErrorModal({
          title: "Booking Failed",
          message: msg,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Cancel Appointment (Patient)
  const handleCancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      await loadPatientAppointments();
    } catch (err) {
      alert("Failed to cancel appointment: " + (err.response?.data?.message || err.message));
    } finally {
      setCancellingId(null);
    }
  };

  const selectedHospital = hospitalsList.find((h) => h.id === selectedHospitalId) || hospitalsList[0] || {};
  const selectedHospitalName = selectedHospital?.User?.fullName || selectedHospital?.name || "";
  const selectedHospitalLocation = [selectedHospital?.municipality, selectedHospital?.district].filter(Boolean).join(", ");

  // Filtered Appointments
  const filteredAppointments = myAppointments.filter((item) => {
    if (filterStatus === "all") return true;
    return item.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between relative">
      
      {/* BEAUTIFUL THEMED ERROR / NOTICE MODAL */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5 relative">
            <button
              onClick={() => setErrorModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200/80 flex items-center justify-center mx-auto text-2xl shadow-xs">
              <FaExclamationTriangle />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {errorModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                {errorModal.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {errorModal.isLoginRequired ? (
                <button
                  onClick={() => {
                    setErrorModal(null);
                    navigate("/login");
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Log In to Continue</span>
                  <FaArrowRight className="text-xs" />
                </button>
              ) : errorModal.isProfileRequired ? (
                <button
                  onClick={() => {
                    setErrorModal(null);
                    navigate("/patient/profile");
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Complete Profile Now</span>
                  <FaArrowRight className="text-xs" />
                </button>
              ) : (
                <button
                  onClick={() => setErrorModal(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-xs cursor-pointer"
                >
                  Got It
                </button>
              )}
              <button
                onClick={() => setErrorModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/80">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-[#e6f7f3] text-[#0d9488] text-[11px] font-extrabold uppercase tracking-wider rounded-full">
              Appointments Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Clinical Appointments & Visits
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl leading-relaxed">
              Book guaranteed appointment slots with top healthcare centers within 7 days or view your existing clinical bookings.
            </p>
          </div>

          {/* TAB SWITCHER BUTTONS */}
          <div className="inline-flex p-1.5 bg-slate-200/60 rounded-2xl self-start md:self-auto border border-slate-200">
            <button
              onClick={() => {
                setActiveTab("book");
                setIsConfirmed(false);
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "book"
                  ? "bg-white text-[#0d9488] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaCalendarPlus className="text-sm" />
              <span>Book New Visit</span>
            </button>

            <button
              onClick={() => setActiveTab("my")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "my"
                  ? "bg-white text-[#0d9488] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaListAlt className="text-sm" />
              <span>My Appointments</span>
              {myAppointments.length > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-[10px] bg-teal-100 text-teal-800 rounded-full font-extrabold">
                  {myAppointments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: BOOK NEW APPOINTMENT */}
        {activeTab === "book" && (
          <div>
            {isConfirmed ? (
              <AppointmentConfirmation
                selectedHospitalName={selectedHospitalName}
                selectedHospitalLocation={selectedHospitalLocation}
                selectedDate={selectedDateObj.formattedLabel}
                selectedTime={selectedTime}
                onReset={() => {
                  setIsConfirmed(false);
                  setActiveTab("my");
                }}
              />
            ) : loadingHospitals ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
                <FaSpinner className="animate-spin text-3xl text-[#0d9488]" />
                <p className="text-xs font-semibold">Loading medical centers...</p>
              </div>
            ) : (
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
                      selectedFullDate={selectedDateObj.fullDate}
                      onSelectDateObj={setSelectedDateObj}
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
                    selectedDate={selectedDateObj.formattedLabel}
                    selectedTime={selectedTime}
                    isSubmitting={isSubmitting}
                    onConfirm={handleConfirmBooking}
                  />
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: VIEW MY APPOINTMENTS */}
        {activeTab === "my" && (
          <div className="space-y-6">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Filter Status:</span>
              {["all", "pending", "accepted", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition cursor-pointer ${
                    filterStatus === status
                      ? "bg-[#0d9488] text-[#ffffff] shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {loadingAppointments ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
                <FaSpinner className="animate-spin text-3xl text-[#0d9488]" />
                <p className="text-xs font-semibold">Fetching your appointment records...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center space-y-4 max-w-md mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center mx-auto text-2xl">
                  <FaCalendarCheck />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Appointments Found</h3>
                  <p className="text-xs text-slate-500">
                    {filterStatus === "all"
                      ? "You haven't booked any clinical visits yet."
                      : `No appointments found matching status "${filterStatus}".`}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("book")}
                  className="px-5 py-2.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer inline-flex items-center space-x-2"
                >
                  <FaCalendarPlus />
                  <span>Book New Appointment</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAppointments.map((appt) => {
                  const inst = appt.Institution || {};
                  const instUser = inst.User || {};
                  const status = (appt.status || "pending").toLowerCase();

                  let statusBadgeClass = "bg-amber-100 text-amber-800 border-amber-200";
                  if (status === "accepted") statusBadgeClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
                  if (status === "completed") statusBadgeClass = "bg-sky-100 text-sky-800 border-sky-200";
                  if (status === "rejected" || status === "cancelled") statusBadgeClass = "bg-rose-100 text-rose-800 border-rose-200";

                  return (
                    <div
                      key={appt.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        
                        {/* Header: Hospital & Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-lg flex-shrink-0 border border-teal-100">
                              <FaHospital />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-base">
                                {instUser.fullName || inst.name || "Medical Institution"}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {[inst.municipality, inst.district].filter(Boolean).join(", ") || "Nepalgunj, Banke"}
                              </p>
                            </div>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${statusBadgeClass}`}>
                            {status}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="bg-slate-50/80 rounded-2xl p-4 space-y-2 border border-slate-100 text-xs">
                          <div className="flex items-center justify-between text-slate-700">
                            <span className="flex items-center space-x-1.5 font-semibold">
                              <FaClock className="text-[#0d9488]" />
                              <span>{appt.appointmentDate} at {appt.appointmentTime}</span>
                            </span>
                          </div>
                          
                          {appt.reason && (
                            <div className="text-slate-600 pt-1 border-t border-slate-200/60">
                              <span className="font-semibold text-slate-800">Reason: </span>
                              <span>{appt.reason}</span>
                            </div>
                          )}

                          {instUser.phoneNumber && (
                            <div className="flex items-center space-x-1.5 text-slate-500 pt-0.5">
                              <FaPhoneAlt className="text-slate-400 text-[10px]" />
                              <span>Helpline: {instUser.phoneNumber}</span>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                        <span className="text-slate-400 text-[11px]">
                          Ref: #{appt.id}
                        </span>

                        {status === "pending" && (
                          <button
                            onClick={() => handleCancelAppointment(appt.id)}
                            disabled={cancellingId === appt.id}
                            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl transition border border-rose-200 cursor-pointer disabled:opacity-50 inline-flex items-center space-x-1.5"
                          >
                            {cancellingId === appt.id ? (
                              <FaSpinner className="animate-spin text-xs" />
                            ) : (
                              <FaBan className="text-xs" />
                            )}
                            <span>Cancel Booking</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
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
            <p>Designed for {user?.name || "Ram Sharma"} • Nepalgunj, Banke</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Appointments;
