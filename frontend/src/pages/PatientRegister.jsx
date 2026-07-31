import React, { useState } from "react";
import { Link } from "react-router-dom";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering Patient:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#e6f4f1] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">

        
        {/* Header */}
        <div className="space-y-1.5 text-center">
          <span className="font-mono px-3 py-1 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold uppercase">
            Patient Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 pt-2">
            Create Patient Account
          </h1>
          <p className="font-sans text-slate-500 text-xs sm:text-sm">
            Sign up to manage your health records and appointments.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          <button
            type="submit"
            className="font-sans w-full py-3 px-4 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-lg transition text-sm mt-2"
          >
            Register as Patient
          </button>
        </form>

        <div className="font-sans text-center text-xs sm:text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#0d9488] hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PatientRegister;
