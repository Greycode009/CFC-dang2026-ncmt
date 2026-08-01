import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaCheck, FaQuestionCircle, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import ProfileCard from "./ProfileCard";

const Profile = ({
  steps = [],
  currentStep = 1,
  title,
  subtitle,
  children,
  onPrevious,
  onNext,
  onSkip,
  isFirstStep = false,
  isLastStep = false,
  isSaving = false,
  toast = null,
  cardIcon,
  cardTitle,
  cardDescription,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#f8faf9] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
      
      {/* Toast Notification Overlay */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl border flex items-center space-x-3 transition-all duration-300 animate-bounce ${
            toast.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-700"
              : "bg-rose-900 text-rose-100 border-rose-700"
          }`}
        >
          {toast.type === "success" ? (
            <FaCheckCircle className="text-emerald-400 text-xl" />
          ) : (
            <FaExclamationCircle className="text-rose-400 text-xl" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* 1. TOP HEADER & STEPPER NAVIGATION */}
      <div className="w-full max-w-6xl mx-auto space-y-6 pt-2 pb-4">
        
        {/* Top Bar: Logo & Help Link */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0d9488] text-white flex items-center justify-center font-bold">
              <FaPlus className="text-sm" />
            </div>
            <span className="text-xl font-bold text-[#0d9488] tracking-tight">
              Med Assist
            </span>
          </Link>

          <a
            href="#help"
            className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#0d9488] transition"
          >
            <FaQuestionCircle className="text-sm" />
            <span>Help & Support</span>
          </a>
        </div>

        {/* Stepper Progress Bar */}
        {steps && steps.length > 0 && (
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto py-2">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Item */}
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    {/* Circle Badge */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition duration-200 ${
                        isCompleted
                          ? "bg-[#0d9488] text-white"
                          : isActive
                          ? "bg-[#0d9488] text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? <FaCheck className="text-xs" /> : step.id}
                    </div>

                    {/* Step Label */}
                    <span
                      className={`font-sans text-xs sm:text-sm font-semibold ${
                        isCompleted || isActive
                          ? "text-[#0d9488]"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connecting Line (if not last step) */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 sm:w-12 rounded-full ${
                        step.id < currentStep ? "bg-[#0d9488]" : "bg-slate-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

      </div>

      {/* 2. MAIN CENTERED CARD */}
      <div className="w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-8 my-auto mx-auto">
        
        {/* LEFT COLUMN: Form Section (60%) */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between space-y-2 ">
          
          {/* Header & Subtitle */}
          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="font-sans text-xs sm:text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content / Inputs */}
          <div className="space-y-2 py-2">
            {children}
          </div>

          {/* Bottom Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            
            {/* Previous Button */}
            <div>
              {!isFirstStep && (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={onPrevious}
                  className="font-sans px-5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
                >
                  Previous
                </button>
              )}
            </div>

            {/* Skip Option */}
            {onSkip && (
              <button
                type="button"
                disabled={isSaving}
                onClick={onSkip}
                className="font-sans text-xs sm:text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4 transition cursor-pointer disabled:opacity-50"
              >
                Skip for now
              </button>
            )}

            {/* Next Step / Complete Profile Button */}
            <div>
              <button
                type="button"
                onClick={onNext}
                disabled={isSaving}
                className="font-sans px-7 py-3 bg-[#0d9488] hover:bg-[#0f896f] disabled:opacity-75 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-xs transition duration-150 flex items-center space-x-2.5 cursor-pointer disabled:cursor-not-allowed min-w-[150px] justify-center"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Updating Profile...</span>
                  </>
                ) : (
                  <span>{isLastStep ? "Complete Profile" : "Next Step"}</span>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Reusable Featured Card (40%) */}
        <ProfileCard
          icon={cardIcon}
          title={cardTitle}
          description={cardDescription}
        />

      </div>

      {/* 3. FOOTER COPYRIGHT */}
      <div className="w-full text-center text-xs text-slate-400 py-4">
        © 2026 MedAssist. All rights reserved.
      </div>

    </div>
  );
};

export default Profile;
