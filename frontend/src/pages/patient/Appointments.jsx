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
  FaCalendarCheck,
  FaEye,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaBed,
  FaShieldAlt
} from "react-icons/fa";
import HospitalList from "../../components/hospital/HospitalList";
import CalendarPicker, { getNext7Days } from "../../components/hospital/CalendarPicker";
import TimeSlotPicker from "../../components/hospital/TimeSlotPicker";
import AppointmentSummaryCard from "../../components/hospital/AppointmentSummaryCard";
import AppointmentConfirmation from "../../components/hospital/AppointmentConfirmation";
import { fetchHospitals, bookAppointment, getMyAppointments, cancelAppointment, fetchBookedSlots } from "../../api";
import { useAuth } from "../../context/AuthContext";

const Appointments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Active Tab state: "book" or "my"
  const [activeTab, setActiveTab] = useState(() => searchParams.get("tab") === "my" ? "my" : "book");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "my") {
      setActiveTab("my");
    }
  }, [searchParams]);

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

  // My Appointments List & Selected Details Pop-up Modal States
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [myAppointments, setMyAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedApptModal, setSelectedApptModal] = useState(null);

  // Themed Notice / Error Modal State
  const [errorModal, setErrorModal] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Default time slots
  const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"];

  // Department filter state
  const [selectedDeptFilter, setSelectedDeptFilter] = useState(() => searchParams.get("department") || "");

  useEffect(() => {
    const dept = searchParams.get("department");
    if (dept) {
      setSelectedDeptFilter(dept);
    }
  }, [searchParams]);

  // Single Hospital mode state (when navigated via hospital card)
  const [singleHospitalOnly, setSingleHospitalOnly] = useState(() => !!searchParams.get("hospitalId"));

  useEffect(() => {
    if (searchParams.get("hospitalId")) {
      setSingleHospitalOnly(true);
    }
  }, [searchParams]);

  // Compute hospitals matching the AI recommended department
  const filteredHospitalsList = React.useMemo(() => {
    if (!selectedDeptFilter || selectedDeptFilter.trim() === "") {
      return hospitalsList;
    }
    const filterTerm = selectedDeptFilter.toLowerCase().trim();
    const words = filterTerm.split(/[\s,/-]+/).filter((w) => w.length > 2);

    return hospitalsList.filter((h) => {
      const deptText = (h.department || "").toLowerCase();
      const servText = (h.services || "").toLowerCase();

      return (
        deptText.includes(filterTerm) ||
        servText.includes(filterTerm) ||
        words.some((w) => deptText.includes(w) || servText.includes(w))
      );
    });
  }, [hospitalsList, selectedDeptFilter]);

  // Compute displayed list: if single hospital mode is active, display ONLY that selected hospital
  const displayedHospitalsList = React.useMemo(() => {
    if (singleHospitalOnly && selectedHospitalId) {
      const matched = filteredHospitalsList.filter((h) => String(h.id) === String(selectedHospitalId));
      if (matched.length > 0) return matched;
    }
    return filteredHospitalsList;
  }, [filteredHospitalsList, singleHospitalOnly, selectedHospitalId]);

  // 1. Fetch Hospitals for Booking
  useEffect(() => {
    async function loadData() {
      setLoadingHospitals(true);
      try {
        const data = await fetchHospitals();
        const list = data?.hospitals || data || [];
        setHospitalsList(list);
        
        // Pre-select hospital from URL query parameter ?hospitalId=... or filtered list
        const paramId = searchParams.get("hospitalId");
        if (paramId && list.some((h) => String(h.id) === String(paramId))) {
          setSelectedHospitalId(paramId);
        } else if (list.length > 0) {
          const dept = searchParams.get("department");
          if (dept) {
            const filterTerm = dept.toLowerCase().trim();
            const matching = list.find(h => (h.department || "").toLowerCase().includes(filterTerm) || (h.services || "").toLowerCase().includes(filterTerm));
            if (matching) {
              setSelectedHospitalId(matching.id);
            } else {
              setSelectedHospitalId(list[0].id);
            }
          } else {
            setSelectedHospitalId(list[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load hospitals from API:", err);
      } finally {
        setLoadingHospitals(false);
      }
    }
    loadData();
  }, [searchParams]);

  // Fetch booked slots whenever selected hospital or date changes
  useEffect(() => {
    async function loadBookedSlots() {
      if (!selectedHospitalId || !selectedDateObj?.fullDate) return;
      try {
        const res = await fetchBookedSlots(selectedHospitalId, selectedDateObj.fullDate);
        const booked = res?.bookedTimes || [];
        setBookedSlots(booked);

        // If currently selected time is already booked, pick first available slot
        if (booked.includes(selectedTime)) {
          const available = dynamicTimeSlots.find((s) => !booked.includes(s));
          if (available) {
            setSelectedTime(available);
          }
        }
      } catch (err) {
        console.error("Failed to load booked slots:", err);
        setBookedSlots([]);
      }
    }
    loadBookedSlots();
  }, [selectedHospitalId, selectedDateObj?.fullDate]);

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

  const selectedHospital = filteredHospitalsList.find((h) => h.id === selectedHospitalId) || filteredHospitalsList[0] || hospitalsList[0] || {};
  const selectedHospitalName = selectedHospital?.User?.fullName || selectedHospital?.name || "";
  const selectedHospitalLocation = [selectedHospital?.municipality, selectedHospital?.district].filter(Boolean).join(", ");
  const registrationFee = selectedHospital?.registrationFee !== undefined && selectedHospital?.registrationFee !== null ? selectedHospital.registrationFee : 500;

  // Dynamic time slots per hospital/clinic
  const dynamicTimeSlots = selectedHospital?.availableTimeSlots
    ? selectedHospital.availableTimeSlots.split(",").map((s) => s.trim()).filter(Boolean)
    : timeSlots;

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
                registrationFee={registrationFee}
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
                <div className="lg:col-span-4 space-y-3">
                  {singleHospitalOnly && selectedHospitalId && (
                    <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-teal-900 font-semibold shadow-xs">
                      <div className="flex items-center space-x-2">
                        <FaHospital className="text-[#0d9488]" />
                        <span>Selected Facility</span>
                      </div>
                      <button
                        onClick={() => setSingleHospitalOnly(false)}
                        className="text-[11px] text-[#0d9488] hover:text-teal-800 font-bold underline transition cursor-pointer"
                      >
                        Change / Show All
                      </button>
                    </div>
                  )}

                  {selectedDeptFilter && !singleHospitalOnly && (
                    <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-teal-900 font-semibold shadow-xs">
                      <div className="flex items-center space-x-2">
                        <FaHospital className="text-[#0d9488]" />
                        <span>AI Filter: <strong className="text-[#0d9488] font-bold">{selectedDeptFilter}</strong> ({filteredHospitalsList.length} match{filteredHospitalsList.length === 1 ? "" : "es"})</span>
                      </div>
                      <button
                        onClick={() => setSelectedDeptFilter("")}
                        className="text-[11px] text-slate-500 hover:text-rose-600 font-bold underline transition cursor-pointer"
                      >
                        Show All
                      </button>
                    </div>
                  )}

                  <HospitalList
                    hospitals={displayedHospitalsList}
                    selectedHospitalId={selectedHospitalId}
                    onSelectHospital={(id) => {
                      setSelectedHospitalId(id);
                    }}
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
                      timeSlots={dynamicTimeSlots}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                      bookedSlots={bookedSlots}
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
                    registrationFee={registrationFee}
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
                      onClick={() => setSelectedApptModal(appt)}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-teal-300 transition-all duration-200 space-y-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        
                        {/* Header: Hospital & Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0d9488] group-hover:bg-[#0d9488] group-hover:text-white flex items-center justify-center text-lg flex-shrink-0 border border-teal-100 transition-colors">
                              <FaHospital />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0d9488] transition-colors flex items-center space-x-1.5">
                                <span>{instUser.fullName || inst.name || "Medical Institution"}</span>
                              </h3>
                              <p className="text-xs text-slate-500">
                                {[inst.municipality, inst.district].filter(Boolean).join(", ") || "Nepalgunj, Banke"}
                              </p>
                            </div>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${statusBadgeClass}`}>
                            {status === "accepted" ? "Confirmed" : status}
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
                        <span className="text-[#0d9488] text-[11px] font-semibold flex items-center space-x-1 group-hover:underline">
                          <FaEye className="text-xs" />
                          <span>View Full Clinic Description</span>
                        </span>

                        {status === "pending" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelAppointment(appt.id);
                            }}
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

      {/* Clinic & Appointment Details Pop-Up Modal */}
      {selectedApptModal && (() => {
        const appt = selectedApptModal;
        const inst = appt.Institution || {};
        const instUser = inst.User || {};
        const status = (appt.status || "pending").toLowerCase();

        let badgeClass = "bg-amber-100 text-amber-800 border-amber-200";
        if (status === "accepted") badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
        if (status === "completed") badgeClass = "bg-sky-100 text-sky-800 border-sky-200";
        if (status === "rejected" || status === "cancelled") badgeClass = "bg-rose-100 text-rose-800 border-rose-200";

        // Parse departments and services from real DB strings
        const departmentsList = inst.department 
          ? inst.department.split(",").map(d => d.trim()).filter(Boolean)
          : [];
        const servicesList = inst.services 
          ? inst.services.split(",").map(s => s.trim()).filter(Boolean)
          : [];

        const addressString = inst.fullAddress || [inst.municipality, inst.district, inst.province].filter(Boolean).join(", ");

        return (
          <div
            onClick={() => setSelectedApptModal(null)}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in custom-scrollbar"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden my-auto"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-5 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-2xl flex-shrink-0 border border-teal-100 shadow-xs">
                    <FaHospital />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap gap-1.5">
                      <h3 className="text-xl font-bold text-slate-900">
                        {instUser.fullName || inst.name || "Medical Institution"}
                      </h3>
                      {inst.institutionType && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-50 text-[#0d9488] border border-teal-200/80">
                          {inst.institutionType}
                        </span>
                      )}
                      {inst.verificationStatus && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          inst.verificationStatus === "verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : inst.verificationStatus === "rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {inst.verificationStatus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                      <FaMapMarkerAlt className="text-teal-600 text-[11px]" />
                      <span>{addressString || "Address not updated yet"}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApptModal(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer flex-shrink-0"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Appointment Booking Info */}
              <div className="bg-gradient-to-r from-teal-50/80 via-emerald-50/50 to-teal-50/30 rounded-2xl p-4 sm:p-5 border border-teal-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <FaCalendarCheck className="text-[#0d9488]" />
                    <span>Booking Ref #{appt.id}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${badgeClass}`}>
                    {status === "accepted" ? "Confirmed" : status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-[#0d9488]" />
                    <span>Scheduled Time: <strong className="text-slate-900">{appt.appointmentDate} at {appt.appointmentTime}</strong></span>
                  </div>
                  {appt.reason && (
                    <div className="flex items-center space-x-2">
                      <FaInfoCircle className="text-[#0d9488]" />
                      <span>Reason: <strong className="text-slate-900">{appt.reason}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Real Database Institution Profile & Contact */}
              <div className="space-y-4 text-xs">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Institution Profile & Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone & Email */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <p className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <FaPhoneAlt className="text-teal-600 text-xs" />
                      <span>Contact Details</span>
                    </p>
                    <p className="text-slate-600">Helpline / Phone: <strong className="text-slate-800">{instUser.phoneNumber || "Not provided"}</strong></p>
                    <p className="text-slate-600">Official Email: <strong className="text-slate-800">{instUser.email || "Not provided"}</strong></p>
                  </div>

                  {/* License & Authorized Person */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <p className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <FaShieldAlt className="text-teal-600 text-xs" />
                      <span>Registration & Management</span>
                    </p>
                    <p className="text-slate-600">Reg / License No: <strong className="text-slate-800">{inst.registrationNumber || "Not registered"}</strong></p>
                    <p className="text-slate-600">Authorized Person: <strong className="text-slate-800">{inst.authPersonName || "Not specified"}</strong> {inst.authPersonNumber ? `(${inst.authPersonNumber})` : ""}</p>
                  </div>

                </div>

                {/* Facility & Capacity Metrics from DB */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <p className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <FaBed className="text-teal-600 text-xs" />
                    <span>Capacity & Schedule Configured</span>
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span className="block font-extrabold text-slate-900 text-sm">{inst.beds || "N/A"}</span>
                      <span className="text-[10px] text-slate-500">Beds</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span className="block font-extrabold text-teal-600 text-sm">{inst.noOfDoctor !== null && inst.noOfDoctor !== undefined ? inst.noOfDoctor : "N/A"}</span>
                      <span className="text-[10px] text-slate-500">Doctors</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span className="block font-extrabold text-emerald-600 text-xs truncate">
                        {inst.openingTime && inst.closingTime ? `${inst.openingTime} - ${inst.closingTime}` : "24/7"}
                      </span>
                      <span className="text-[10px] text-slate-500">Hours</span>
                    </div>
                  </div>
                </div>

                {/* Real Departments & Services */}
                {(departmentsList.length > 0 || inst.department) && (
                  <div>
                    <p className="font-bold text-slate-800 mb-1.5">Configured Departments</p>
                    <div className="flex flex-wrap gap-2">
                      {departmentsList.length > 0 ? (
                        departmentsList.map((dept, i) => (
                          <span key={i} className="px-3 py-1 bg-teal-50 text-[#0d9488] font-semibold rounded-xl text-[11px] border border-teal-100">
                            {dept}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-teal-50 text-[#0d9488] font-semibold rounded-xl text-[11px] border border-teal-100">
                          {inst.department}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {(servicesList.length > 0 || inst.services) && (
                  <div>
                    <p className="font-bold text-slate-800 mb-1.5">Services Provided</p>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {inst.services}
                    </p>
                  </div>
                )}

              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  onClick={() => setSelectedApptModal(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
                >
                  Close Details
                </button>

                {status === "pending" && (
                  <button
                    onClick={() => {
                      const id = appt.id;
                      setSelectedApptModal(null);
                      handleCancelAppointment(id);
                    }}
                    className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition border border-rose-200 cursor-pointer flex items-center space-x-1.5"
                  >
                    <FaBan className="text-xs" />
                    <span>Cancel Booking</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        );
      })()}

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
