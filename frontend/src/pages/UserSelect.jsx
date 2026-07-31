
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaUser, FaHospital } from "react-icons/fa";

const UserSelect = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("patient");

  const handlePatientClick = () => {
    setSelectedType("patient");
    navigate("/signup/patient");
  };

  const handleInstituteClick = () => {
    setSelectedType("institute");
    navigate("/signup/institute");
  };

  return (
    <div className="min-h-screen w-full bg-[#f8faf9] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
      
      
      {/* 2. MAIN CENTERED SECTION */}
      <div className="w-full max-w-3xl mx-auto my-auto py-8 text-center space-y-8">
        
        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Join Med Assist
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-500">
            Choose how you want to get started
          </p>
        </div>

        {/* Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Card 1: As a Patient */}
          <div
            onClick={handlePatientClick}
            className={`cursor-pointer bg-white rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-center py-12 transition duration-200 ${
              selectedType === "patient"
                ? "border-2 border-[#0d9488] shadow-xs"
                : "border border-slate-200 hover:border-[#0d9488]/60"
            }`}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#e6f7f3] text-[#0d9488] flex items-center justify-center mb-4">
              <FaUser className="text-xl" />
            </div>

            {/* Title */}
            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
              As a Patient
            </h2>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
              Track records, find hospitals & manage appointments.
            </p>
          </div>

          {/* Card 2: As an Institute */}
          <div
            onClick={handleInstituteClick}
            className={`cursor-pointer bg-white rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center justify-center py-12 transition duration-200 ${
              selectedType === "institute"
                ? "border-2 border-[#0d9488] shadow-xs"
                : "border border-slate-200 hover:border-[#0d9488]/60"
            }`}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#e6f7f3] text-[#0d9488] flex items-center justify-center mb-4">
              <FaHospital className="text-xl" />
            </div>

            {/* Title */}
            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
              As an Institute
            </h2>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
              Register your hospital, manage records & list services.
            </p>
          </div>

        </div>

        {/* Footer Link */}
        <div className="font-sans text-xs sm:text-sm text-slate-500 pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#0d9488] hover:underline"
          >
            Log In
          </Link>
        </div>

      </div>

      {/* 3. BOTTOM FOOTER SPACER */}
      <div className="w-full max-w-6xl mx-auto text-center text-xs text-slate-400">
        © 2026 MedAssist. All rights reserved.
      </div>

    </div>
  );
};

export default UserSelect;



