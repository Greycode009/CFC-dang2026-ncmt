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
        "Locate verified hospitals and clinics near you with live services, hours, and contact details at a glance.",
      linkTo: "/hospitals",
    },
    {
      id: 2,
      icon: FaRobot,
      title: "AI Health Assistant",
      description:
        "Get 24/7 symptom guidance, pre-diagnosis advice, and personalized health tips from our intelligent companion.",
      linkTo: "/ai-assistant",
    },
    {
      id: 3,
      icon: FaCalendarCheck,
      title: "Book Appointments",
      description:
        "Skip queues entirely. Choose your physician, pick a convenient slot, and confirm your visit instantly.",
      linkTo: "/appointments",
    },
    {
      id: 4,
      icon: FaFileMedical,
      title: "Health Records",
      description:
        "Store prescriptions, lab reports, and clinical documents — organized, encrypted, and available 24/7.",
      linkTo: "/appointments",
    },
  ];

  return (
    <section id="features" className="w-full bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Key Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
            Integrated digital tools designed to simplify every step of your healthcare journey — from discovery to follow-up.
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
