import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { registerUser } from "../../api";
import { useAuth } from "../../context/AuthContext";

const InstituteRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form input state
  const [formData, setFormData] = useState({
    instituteName: "",
    officialEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Loading & Toast states
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setToast({
        type: "error",
        title: "Password Mismatch",
        message: "Passwords do not match. Please re-check your password.",
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    setLoading(true);
    setToast({
      type: "info",
      title: "Creating Account...",
      message: "Please wait while we register your institution.",
    });

    const payload = {
      fullName: formData.instituteName,
      email: formData.officialEmail,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: "institution", // api.md: must be "patient" | "institution"
    };

    try {
      const res = await registerUser(payload);
      setToast({
        type: "success",
        title: "Account Created!",
        message: "Institution registered successfully! Redirecting...",
      });

      setTimeout(() => {
        if (res?.user) {
          login(res.user.role || "institution", {
            id: res.user.id,
            name: res.user.fullName,
            email: res.user.email,
            phoneNumber: res.user.phoneNumber,
            role: res.user.role || "institution",
            profileCompleted: false,
          });
        }
        navigate("/institute/profile");
      }, 1200);
    } catch (err) {
      setLoading(false);
      setToast({
        type: "error",
        title: "Registration Failed",
        message: err.response?.data?.message || err.message || "Please check your details and try again.",
      });
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Top Right Pop-Up Toast with Pure Tailwind Animation */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 transition-all duration-500 ease-out transform translate-x-0 opacity-100 max-w-sm w-full">
          <div className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-start space-x-3.5 transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-900/95 text-white border-emerald-500/50 shadow-emerald-900/40 animate-pulse"
              : toast.type === "info"
              ? "bg-[#0b8a7b]/95 text-white border-teal-400/50 shadow-teal-900/40 animate-pulse"
              : "bg-rose-900/95 text-white border-rose-500/50 shadow-rose-900/40"
          }`}>
            <div className="mt-0.5 text-xl flex-shrink-0">
              {toast.type === "success" && <FaCheckCircle className="text-emerald-400 animate-bounce" />}
              {toast.type === "info" && <FaSpinner className="animate-spin text-teal-200" />}
              {toast.type === "error" && <FaExclamationCircle className="text-rose-400 animate-bounce" />}
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-white/80 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT SIDE: Decorative Teal Banner */}
        <div className="lg:col-span-5 bg-[#0b8a7b] relative p-8 lg:p-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-[320px]">
          
          {/* Translucent Background Radar Circles */}
          <div className="absolute w-72 h-72 rounded-full border border-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute w-3 h-3 rounded-full bg-white/30 top-1/4 right-1/4 animate-ping" />
          <div className="absolute w-2 h-2 rounded-full bg-white/20 bottom-1/3 left-1/4" />

          {/* White Plus Icon Container */}
          <div className="relative z-10 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 transition-transform duration-300 hover:scale-105">
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
              disabled={loading}
              className="w-full mt-2 bg-[#0b8a7b] hover:bg-[#097568] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-md hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-base" />
                  <span className="animate-pulse">Creating Account...</span>
                </>
              ) : (
                <span>Create Institute Account</span>
              )}
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
