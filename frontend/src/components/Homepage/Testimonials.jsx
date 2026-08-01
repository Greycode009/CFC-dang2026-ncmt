import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Med Assist helped me find a top-tier specialist in Nepalgunj within minutes. The queue-skip booking was a total lifesaver.",
      name: "Aarav Sharma",
      role: "Patient, Nepalgunj",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      quote:
        "Having access to the AI medical companion 24/7 gave me huge peace of mind when searching for sudden infant allergy symptoms late at night.",
      name: "Srijana Adhikari",
      role: "Mother of two, Lalitpur",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      quote:
        "Prescription filing and clinic record tracking used to be total chaos. I never worry about carrying physical health files to appointments anymore.",
      name: "Bikash Thapa",
      role: "Patient, Kathmandu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            What Patients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <FaQuoteLeft className="text-teal-200 text-2xl mb-4" />

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-sans italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
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
