const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Search & Discover",
      description:
        "Find your location or clinical requirements to discover the closest partner medical centers.",
    },
    {
      step: 2,
      title: "Get Recommendations",
      description:
        "Receive personalized recommendations and symptom care advice from our intelligent AI health companion.",
    },
    {
      step: 3,
      title: "Book & Visit",
      description:
        "Secure your appointment slot instantly and consult your doctor hassle-free with all records ready.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative items-start">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector Line (between steps 1-2 and 2-3 on md screens) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[65%] w-[80%] border-t-2 border-dashed border-slate-200 pointer-events-none -z-0" />
              )}

              {/* Number Badge */}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-base mb-5 shadow-sm group-hover:scale-110 transition transform">
                {item.step}
              </div>

              {/* Step Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
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
