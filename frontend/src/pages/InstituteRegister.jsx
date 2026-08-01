import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const InstituteRegister = () => {
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    instituteName: "",
    officialEmail: "",
    phoneNumber: "",
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

    // TODO: Connect with backend API here (e.g., await axios.post('/api/institute/register', formData))
    console.log("Registering Institute:", formData);

    // Navigate to institute profile
    navigate("/institute/profile");
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

          {/* White Plus Icon Container */}
          <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <FaPlus className="text-3xl text-[#0b8a7b]" />
          </div>

          {/* Left Title & Description */}
          <h2 className="relative z-10 text-2xl lg:text-3xl font-bold text-white mb-3">
            Join as Institute
          </h2>
          <p className="relative z-10 text-xs lg:text-sm text-teal-50/90 leading-relaxed max-w-xs">
            Register your hospital or clinic on Med Assist platform to
            streamline patient consultations, manage beds, and leverage medical
            AI features.
          </p>
        </div>

        {/* RIGHT SIDE: Account Creation Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create Institute Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign up as an institute on Med Assist
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Institute Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institute Name
              </label>
              <input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                placeholder="Enter official institute name"
                required
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0b8a7b] focus:ring-1 focus:ring-[#0b8a7b] text-slate-800 placeholder-slate-400 transition"
              />
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                placeholder="e.g. contact@hospital.com"
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
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +977-1-4XXXXXX"
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
              Create Institute Account
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

export default InstituteRegister;
