import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // 1. State for form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. State for toggle options
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // 3. Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    // Outer Page Background Wrapper (Different background contrast, centered with padding, NO shadow)
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#e6f4f1] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Main Centered Login Card Container (Clean border, NO shadow) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-slate-200/80">
        
        {/* LEFT PANEL: Teal Branding Banner */}
        <div className="lg:w-1/2 bg-[#0d9488] text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[380px] lg:min-h-[540px]">
          
          {/* Background Decorative Shapes */}
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute top-24 right-20 w-3 h-3 rounded-full bg-white/30 pointer-events-none" />
          <div className="absolute bottom-24 left-24 w-2.5 h-2.5 rounded-full bg-white/20 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

          {/* Branding Content */}
          <div className="relative z-10 max-w-sm flex flex-col items-center">
            {/* Logo Card */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl flex items-center justify-center border border-white/30 mb-6">
              <FaPlus className="text-[#0d9488] text-3xl sm:text-4xl" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-white">
              Welcome to Med Assist
            </h1>
            <p className="font-sans text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs">
              Your trusted healthcare companion. Book appointments, find hospitals, and keep medical records safe in one smart hub.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-white">
          <div className="w-full max-w-sm space-y-6">
            
            {/* Form Header */}
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="font-sans text-slate-500 text-xs sm:text-sm">
                Log in to your Med Assist account
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition"
                />
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="font-sans block text-xs sm:text-sm font-semibold text-slate-800">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-sans w-full px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition pr-11"
                  />
                  
                  {/* Password Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Options */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0d9488] accent-[#0d9488]"
                  />
                  <span className="font-sans text-xs sm:text-sm">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-sans text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="font-sans w-full py-3 px-4 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="font-mono bg-white px-3 text-slate-400 font-medium tracking-wider">
                  OR
                </span>
              </div>
            </div>

            {/* Navigation to Sign Up */}
            <div className="font-sans text-center text-xs sm:text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#0d9488] hover:underline"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;


