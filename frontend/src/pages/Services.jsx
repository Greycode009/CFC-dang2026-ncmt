import React from "react";
import { Link } from "react-router-dom";
import {
  FaHospital,
  FaRobot,
  FaCalendarCheck,
  FaStethoscope,
  FaBuilding,
  FaPhoneAlt,
  FaShieldAlt,
  FaUserCheck,
  FaArrowRight,
} from "react-icons/fa";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: FaHospital,
      title: "Hospital & Clinic Discovery",
      description:
        "Locate verified medical centers near your area with available departments, doctor counts, operating hours, and contact helplines.",
      linkTo: "/hospitals",
    },
    {
      id: 2,
      icon: FaRobot,
      title: "24/7 AI Health Companion",
      description:
        "Consult our medical AI anytime for pre-diagnostic guidance, symptom clarification, and triage safety advice.",
      linkTo: "/ai-assistant",
    },
    {
      id: 3,
      icon: FaCalendarCheck,
      title: "Queue-Skip Appointments",
      description:
        "Skip hospital waiting lines entirely. Pick your preferred physician, choose a convenient date & time slot, and confirm instantly.",
      linkTo: "/appointments",
    },
    {
      id: 4,
      icon: FaStethoscope,
      title: "Specialist Consultations",
      description:
        "Easily connect with General Physicians, Pediatricians, Gynecologists, and Cardiologists at top partner hospitals.",
      linkTo: "/appointments",
    },
    {
      id: 5,
      icon: FaBuilding,
      title: "Verified Institution Portal",
      description:
        "Medical institutions across Nepal can register, verify their profile, and manage online patient appointment queues digitally.",
      linkTo: "/signup/institute",
    },
    {
      id: 6,
      icon: FaPhoneAlt,
      title: "Emergency Care Contacts",
      description:
        "Quick access to local hospital casualty helpline numbers and ambulance services during critical medical situations.",
      linkTo: "/contact",
    },
  ];

  const guarantees = [
    {
      icon: FaShieldAlt,
      title: "Privacy & Data Protection",
      text: "Your account credentials and personal information remain strictly protected.",
    },
    {
      icon: FaUserCheck,
      title: "100% Verified Institutions",
      text: "All listed hospitals and clinics are manually reviewed before appearing on the portal.",
    },
    {
      icon: FaCalendarCheck,
      title: "Zero Booking Fees",
      text: "Searching hospitals, consulting AI, and scheduling appointments are free for all patients.",
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
                Services Portfolio
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Everything You Need for <br />
              <span className="text-[#0d9488]">Better Health Care</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Integrated digital solutions designed to simplify every step of your medical search, booking, and consultation process.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.id}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center text-xl mb-5 group-hover:bg-[#0d9488] group-hover:text-white transition duration-200">
                        <Icon />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {srv.description}
                      </p>
                    </div>

                    <div>
                      <Link
                        to={srv.linkTo}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0d9488] hover:text-[#0b7a70] transition"
                      >
                        <span>Access Service</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
                Service Guarantee
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Why Patients Rely On MedAssist
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guarantees.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#f8faf9] rounded-3xl p-8 border border-slate-200/80 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center mx-auto text-xl">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="w-full bg-[#0d9488] py-16 sm:py-20 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ready to Access Modern Health Services?
            </h2>
            <p className="text-teal-50/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
              Join thousands of smart patients in Nepal who are simplifying their daily clinic visits and consulting securely.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3.5 bg-white text-[#0d9488] font-bold text-sm sm:text-base rounded-full shadow-md hover:bg-slate-50 transition cursor-pointer"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
