import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "MedAssist helped me find a top-tier specialist in Nepalgunj within minutes. The queue-skip booking was a total lifesaver during my emergency.",
      name: "Aarav Sharma",
      role: "Patient, Nepalgunj",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      stars: 5,
    },
    {
      id: 2,
      quote:
        "Having access to the AI medical companion 24/7 gave me huge peace of mind when searching for sudden infant allergy symptoms late at night.",
      name: "Srijana Adhikari",
      role: "Mother of two, Lalitpur",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      stars: 5,
    },
    {
      id: 3,
      quote:
        "Prescription filing and clinic record tracking used to be total chaos. Now I never worry about carrying physical health files to appointments.",
      name: "Bikash Thapa",
      role: "Patient, Kathmandu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      stars: 5,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Patients
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            See what real users across Nepal are saying about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d9488] to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>

                {/* Quote Icon */}
                <FaQuoteLeft className="text-teal-100 text-3xl mb-4 group-hover:text-teal-200 transition-colors" />

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-sans">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-5 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-100 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
