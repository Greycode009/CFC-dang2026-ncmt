import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaHeartbeat,
  FaShieldAlt,
  FaRobot,
  FaUsers,
  FaHospital,
  FaAward,
} from "react-icons/fa";
import Footer from "../../components/common/Footer";

const About = () => {
  const stats = [
    { label: "Registered Patients", value: "10,000+", icon: FaUsers },
    { label: "Partner Hospitals", value: "50+", icon: FaHospital },
    { label: "AI Consultations", value: "25,000+", icon: FaRobot },
    { label: "Satisfaction Rate", value: "99.4%", icon: FaAward },
  ];

  const pillars = [
    {
      icon: FaHeartbeat,
      title: "Patient-Centric Care",
      description:
        "We put patient well-being at the heart of everything we build, ensuring smooth hospital discovery and queue-skip bookings.",
    },
    {
      icon: FaShieldAlt,
      title: "Data Privacy & Security",
      description:
        "All medical documents, prescriptions, and health records are protected with industry-standard privacy protocols.",
    },
    {
      icon: FaRobot,
      title: "AI-Powered Guidance",
      description:
        "24/7 symptom clarification and triage advice to help patients make informed healthcare decisions.",
    },
    {
      icon: FaHospital,
      title: "Hospital Empowerment",
      description:
        "Equipping healthcare institutions across Nepal with digital appointment management and verified badges.",
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
                About MedAssist
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Healthcare <br />
              <span className="text-[#0d9488]">Made Simpler for Everyone</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Bridging the gap between patients and healthcare institutions across Nepal through real-time appointment booking, AI assistance, and secure medical record storage.
            </p>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Empowering Patients & Healthcare Providers
              </h2>
              <p className="font-sans text-base text-slate-600 leading-relaxed">
                MedAssist was created to solve common healthcare challenges in Nepal: long waiting lines at clinics, lost physical medical records, and limited access to initial health guidance.
              </p>
              <p className="font-sans text-base text-slate-600 leading-relaxed">
                We provide a unified digital platform where patients can find trusted hospitals, book guaranteed appointment slots, consult our AI companion, and safely keep their medical history.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="font-sans inline-block px-8 py-3.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-full shadow-xs transition duration-150 text-sm sm:text-base"
                >
                  Get Started Today
                </Link>
              </div>
            </div>

            {/* Feature List Box */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-sm shadow-xs">
                  <FaPlus />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">MedAssist Core Features</h3>
                  <p className="text-xs text-slate-500 font-medium">Designed for Nepal</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#0d9488] mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium">Instant online appointment slot booking</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#0d9488] mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium">Verified hospital & clinic search by department</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#0d9488] mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium">Encrypted digital health history & prescription storage</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#0d9488] mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium">24/7 AI health assistant for symptom advice</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="w-full bg-white py-16 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center mx-auto text-xl">
                      <Icon />
                    </div>
                    <p className="font-mono text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOUR PILLARS */}
        <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                What Drives Us Forward
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-lg transition duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center text-xl">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
