import React from "react";

const HealthHistory = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8faf9] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Health History & Records
        </h1>
        <p className="font-sans text-slate-500 text-sm">
          Track your diagnostic reports, doctor consultations, and past medical history securely.
        </p>
      </div>
    </div>
  );
};

export default HealthHistory;
