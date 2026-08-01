import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Discover",
      description:
        "Browse verified hospitals and clinics near you by specialty, treatment, or location using smart filters.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      step: 2,
      title: "Get AI Guidance",
      description:
        "Receive personalized symptom analysis and care recommendations from our intelligent AI health companion.",
      gradient: "from-emerald-500 to-cyan-500",
    },
    {
      step: 3,
      title: "Book & Visit",
      description:
        "Secure your appointment slot instantly and visit your doctor hassle-free with all records accessible.",
      gradient: "from-cyan-500 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Three simple steps to transform your healthcare experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative items-start">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[20%] w-[60%] h-px border-t-2 border-dashed border-slate-200 pointer-events-none" />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number Badge */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-teal-500/15 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-teal-500/25 transition-all duration-300`}>
                {item.step}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
