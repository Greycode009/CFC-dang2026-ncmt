import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const PatientRegister = () => {
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Toggle password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: Connect with backend API here (e.g., await axios.post('/api/register', formData))
    console.log("Registering Patient:", formData);

    // Navigate to patient profile onboarding
    navigate("/patient/profile");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT SIDE: Decorative Teal Banner */}
        <div className="lg:col-span-5 bg-[#0b8a7b] relative p-8 lg:p-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-[320px]">
          
          {/* Translucent Background Radar Circles */}
          <div className="absolute w-72 h-72 rounded-full border border-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute w-3 h-3 rounded-full bg-white/30 top-1/4 right-1/4" />
          <div className="absolute w-2 h-2 rounded-full bg-white/20 bottom-1/3 left-1/4" />

          {/* White Icon Container */}
          <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <FaUserPlus className="text-3xl text-[#0b8a7b]" />
          </div>

          {/* Left Title & Description */}
          <h2 className="relative z-10 text-2xl lg:text-3xl font-bold text-white mb-3">
            Join as Patient
          </h2>
          <p className="relative z-10 text-xs lg:text-sm text-teal-50/90 leading-relaxed max-w-xs">
            Register your patient account on Med Assist platform to easily track
            your medical history, consult our AI assistant, and book doctor
            appointments.
          </p>
        </div>

        {/* RIGHT SIDE: Account Creation Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create Patient Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign up as a patient on Med Assist
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. user@example.com"
                required
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +977-98XXXXXXXX"
                required
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 pr-10 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Retype password"
                  required
                  className="w-full px-4 py-2.5 pr-10 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-[#0b8a7b] hover:bg-[#097568] text-white font-medium py-3 rounded-xl transition text-sm shadow-sm cursor-pointer"
            >
              Create Patient Account
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
              OR
            </span>
          </div>

          {/* Login Redirection */}
          <div className="text-center text-xs text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#0b8a7b] hover:underline">
              Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientRegister;
