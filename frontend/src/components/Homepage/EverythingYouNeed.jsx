import React from "react";
import { FaHospital, FaRobot, FaCalendarCheck, FaFileMedical } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const EverythingYouNeed = () => {
  const features = [
    {
      id: 1,
      icon: FaHospital,
      title: "Hospital Finder",
      description:
        "Locate verified hospitals and clinics near your location with available services, open/close hours, and contact details.",
      linkTo: "/hospitals",
    },
    {
      id: 2,
      icon: FaRobot,
      title: "AI Health Assistant",
      description:
        "Consult our highly trained health companion anytime. Ask questions, receive pre-diagnosis guidance, and seek symptom-relative safety.",
      linkTo: "/ai-assistant",
    },
    {
      id: 3,
      icon: FaCalendarCheck,
      title: "Book Appointment",
      description:
        "Skip the queues entirely. Select your preferred physician, choose a convenient slot, and confirm instantly from home.",
      linkTo: "/hospitals",
    },
    {
      id: 4,
      icon: FaFileMedical,
      title: "Health History",
      description:
        "Keep all your clinical documents, lab test reports, electronic prescriptions stored, organized, and available 24/7.",
      linkTo: "/health-history",
    },
  ];

  return (
    <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Key Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Med Assist offers integrated digital solutions designed to drive more every step of your medical search and consultation process.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkTo={feature.linkTo}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EverythingYouNeed;
