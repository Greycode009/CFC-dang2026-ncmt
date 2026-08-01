import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="w-full bg-[#0d9488] py-16 sm:py-20 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Ready to Take Control of Your Health?
        </h2>

        {/* Subtitle Description */}
        <p className="text-teal-50/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Join thousands of smart patients in Nepal who are simplifying their daily
          clinic visits and consulting securely with modern AI.
        </p>

        {/* Action Button */}
        <Link
          to="/signup"
          className="inline-block px-8 py-3.5 bg-white text-[#0d9488] font-bold text-sm sm:text-base rounded-full shadow-md hover:bg-slate-50 transition cursor-pointer"
        >
          Get Started Now
        </Link>

      </div>
    </section>
  );
};

export default CTA;
