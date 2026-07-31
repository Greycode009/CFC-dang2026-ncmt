import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaHospital, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="w-full bg-white py-8 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content & Actions */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Status Pill Badge (JetBrains Mono Font) */}
          <div>
            <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
              Your Healthcare Companion
            </span>
          </div>

          {/* Heading (Fraunces Serif Display Font) */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Healthcare <br />
            <span className="text-slate-900">Made Simpler</span>
          </h1>

          {/* Body Paragraph (Inter Sans Font) */}
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            Find trusted nearby hospitals, consult with our custom AI health companion, book doctor appointments seamlessly, and keep all your medical records in one secure hub.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/signup"
              className="font-sans px-8 py-3.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-full shadow-sm transition duration-150 text-sm sm:text-base"
            >
              Get Started
            </Link>

            <Link
              to="/hospitals"
              className="font-sans px-8 py-3.5 border-2 border-[#0d9488] text-[#0d9488] hover:bg-[#ccfbf1]/40 font-semibold rounded-full transition duration-150 text-sm sm:text-base"
            >
              Find Hospitals
            </Link>
          </div>

          {/* Trust Badges / Stats Pills (JetBrains Mono Font) */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200/60">
            {/* Users Badge */}
            <div className="font-mono flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-2xs text-xs sm:text-sm font-medium text-slate-700">
              <FaUsers className="text-[#0d9488] text-base" />
              <span><strong className="text-slate-900 font-bold">10,000+</strong> Users</span>
            </div>

            {/* Hospitals Badge */}
            <div className="font-mono flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-2xs text-xs sm:text-sm font-medium text-slate-700">
              <FaHospital className="text-[#0d9488] text-base" />
              <span><strong className="text-slate-900 font-bold">50+</strong> Hospitals</span>
            </div>

            {/* Secure Records Badge */}
            <div className="font-mono flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-2xs text-xs sm:text-sm font-medium text-slate-700">
              <FaShieldAlt className="text-[#0d9488] text-base" />
              <span><strong className="text-slate-900 font-bold">Secure</strong> Records</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Hero Image */}
        <div className="lg:col-span-7 relative flex justify-center items-center">
          <img
            src="https://i.ibb.co/XZ7JD9GX/Untitled-design.png"
            alt="Healthcare Made Simpler Illustration"
            className="w-full max-w-2xl lg:max-w-none lg:w-[115%] h-auto object-contain transform lg:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;





