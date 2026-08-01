import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaRobot,
  FaCalendarCheck,
  FaStethoscope,
  FaHospital,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";
import Footer from "../../components/common/Footer";

const HowItWorksPage = () => {
  const [activeTab, setActiveTab] = useState("patient");

  const patientSteps = [
    {
      step: 1,
      title: "Search & Discover Hospitals",
      description:
        "Filter verified hospitals and clinics near your location by department, open hours, and available doctor count.",
      icon: FaSearch,
    },
    {
      step: 2,
      title: "Get AI Recommendations (Optional)",
      description:
        "Consult our 24/7 AI health assistant for pre-diagnosis symptom clarification before booking your visit.",
      icon: FaRobot,
    },
    {
      step: 3,
      title: "Select Slot & Book Visit",
      description:
        "Choose your preferred doctor, pick a convenient date & time slot within 7 days, and confirm your appointment with zero wait.",
      icon: FaCalendarCheck,
    },
    {
      step: 4,
      title: "Consult Doctor & Follow-Up",
      description:
        "Visit the medical center at your scheduled time hassle-free, consult your specialist physician, and receive personalized treatment plans.",
      icon: FaStethoscope,
    },
  ];

  const hospitalSteps = [
    {
      step: 1,
      title: "Register & Submit Details",
      description:
        "Create an institution account with registration number, district address, and authorized contact info.",
      icon: FaHospital,
    },
    {
      step: 2,
      title: "Set Departments & Hours",
      description:
        "List your clinical services, OPD operating hours, total doctors count, and bed capacity for patient discovery.",
      icon: FaUserCheck,
    },
    {
      step: 3,
      title: "Receive & Manage Bookings",
      description:
        "Receive real-time appointment bookings digitally, accept visits, and manage daily patient queues efficiently.",
      icon: FaCheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        {/* HEADER / HERO */}
        <section className="w-full bg-white py-12 lg:py-20 border-b border-slate-200/60">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
            <div>
              <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
                Simple Process
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              How MedAssist <span className="text-[#0d9488]">Works</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              A simple step-by-step workflow designed for patients seeking care and hospitals managing appointment queues.
            </p>

            {/* TAB SWITCHER */}
            <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200/80 mt-4">
              <button
                onClick={() => setActiveTab("patient")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeTab === "patient"
                    ? "bg-[#0d9488] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Patients
              </button>
              <button
                onClick={() => setActiveTab("hospital")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeTab === "hospital"
                    ? "bg-[#0d9488] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Hospitals & Clinics
              </button>
            </div>
          </div>
        </section>

        {/* STEPS GRID (CENTERED) */}
        <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 items-stretch">
              {(activeTab === "patient" ? patientSteps : hospitalSteps).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="w-full sm:w-[270px] lg:w-[275px] bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition duration-200 flex flex-col items-center text-center group flex-shrink-0"
                  >
                    {/* Number Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-base mb-5 shadow-xs group-hover:scale-110 transition transform">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center text-xl mb-4">
                      <Icon />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="w-full bg-[#0d9488] py-16 sm:py-20 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {activeTab === "patient" ? "Ready to Book Your Doctor Visit?" : "Partner Your Hospital With MedAssist"}
            </h2>
            <p className="text-teal-50/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
              {activeTab === "patient"
                ? "Join thousands of patients across Nepal who skip physical queues and book clinical appointments easily."
                : "Digitize your hospital appointment desk and connect with patients across your district."}
            </p>
            <Link
              to={activeTab === "patient" ? "/signup/patient" : "/signup/institute"}
              className="inline-block px-8 py-3.5 bg-white text-[#0d9488] font-bold text-sm sm:text-base rounded-full shadow-md hover:bg-slate-50 transition cursor-pointer"
            >
              {activeTab === "patient" ? "Register as Patient" : "Register Institution"}
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
