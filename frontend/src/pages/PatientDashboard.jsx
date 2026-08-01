import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaPlus, 
  FaSearch, 
  FaHospital, 
  FaRobot, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaStar, 
  FaArrowRight, 
  FaTint, 
  FaHeart, 
  FaRunning,
  FaChevronRight
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();

  // Extract first name dynamically or default to Ram
  const fullName = user?.name || "Ram Sharma";
  const firstName = fullName.split(" ")[0];

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
        
        {/* 1. HERO BANNER SECTION */}
        <div className="bg-[#ebfef7] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-teal-100 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Text & Search */}
          <div className="space-y-4 max-w-xl z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Your health journey continues here. How can we help you today?
            </p>

            {/* Search Input */}
            <div className="pt-2">
              <div className="relative flex items-center max-w-md">
                <FaSearch className="absolute left-4 text-teal-600 text-sm pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hospitals, doctors, or health topics..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-teal-200/80 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-500/20 shadow-xs transition"
                />
              </div>
            </div>
          </div>

          {/* Right Hero Illustration */}
          <div className="relative z-10 flex items-center justify-center w-full md:w-auto">
            <svg
              className="w-48 h-48 sm:w-60 sm:h-60"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Organic Shape */}
              <path
                d="M40,110 Q20,50 90,30 Q160,10 170,70 Q180,130 120,170 Q60,190 40,110 Z"
                fill="#d1fae5"
                opacity="0.7"
              />
              {/* Tree / Foliage */}
              <path
                d="M135 120 C135 90, 160 80, 150 60 C140 40, 110 50, 105 70 C100 50, 75 55, 75 80 C75 105, 100 120, 135 120 Z"
                fill="#a7f3d0"
              />
              <path d="M120 120 L120 180" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              {/* Stylized Person */}
              <circle cx="130" cy="115" r="8" fill="#1e293b" />
              <path d="M130 123 L130 160 M130 135 L145 120 M130 135 L115 140" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              <path d="M130 160 L122 190 M130 160 L138 190" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              {/* Red Sparkles */}
              <circle cx="150" cy="100" r="2.5" fill="#f43f5e" />
              <circle cx="90" cy="120" r="2" fill="#0d9488" />
              <circle cx="160" cy="130" r="2" fill="#10b981" />
            </svg>
          </div>

        </div>

        {/* 2. TOP QUICK FEATURE CARDS (4 COLUMNS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Find Healthcare Facility */}
          <Link
            to="/hospitals"
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-lg mb-4 group-hover:scale-105 transition">
                <FaHospital />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-[#0d9488] transition">
                Find Healthcare Facility
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Locate premier hospitals, specialized clinics, and care centers near Banke.
              </p>
            </div>
          </Link>

          {/* Card 2: AI Health Assistant */}
          <Link
            to="/ai-assistant"
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-lg mb-4 group-hover:scale-105 transition">
                <FaRobot />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-[#0d9488] transition">
                AI Health Assistant
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ask our expert AI about symptoms, health records, or general queries instantly.
              </p>
            </div>
          </Link>

          {/* Card 3: Book Appointment */}
          <Link
            to="/appointments"
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-lg mb-4 group-hover:scale-105 transition">
                <FaCalendarAlt />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-[#0d9488] transition">
                Book Appointment
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Schedule online visits with top physicians across Nepalgunj and beyond.
              </p>
            </div>
          </Link>

          {/* Card 4: Patient Profile */}
          <Link
            to="/patient/profile"
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-teal-200 transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-lg mb-4 group-hover:scale-105 transition">
                <FaFileAlt />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-[#0d9488] transition">
                Patient Profile
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Update your personal medical details, emergency contacts, and blood group.
              </p>
            </div>
          </Link>

        </div>

        {/* 3. MIDDLE SECTION (APPOINTMENT & MEDICAL RECORDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upcoming Appointment */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Appointment
            </h2>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              
              {/* Doctor Header */}
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
                  alt="Dr. Sita Poudel"
                  className="w-14 h-14 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Dr. Sita Poudel</h3>
                  <p className="text-xs text-slate-500 font-medium">General Physician</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-400">🏥</span>
                  <span>Nepalgunj Medical College, Banke</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-400">🕒</span>
                  <span>Kartik 18, 2080 at <strong className="text-slate-900">10:30 AM</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="py-2.5 px-4 bg-[#0d9488] hover:bg-[#0f896f] text-white font-semibold rounded-xl text-xs transition shadow-xs cursor-pointer">
                  View Details
                </button>
                <button className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 text-xs transition cursor-pointer">
                  Reschedule
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Recent Medical Records */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Recent Medical Records
              </h2>
              <Link to="/appointments" className="text-xs font-semibold text-[#0d9488] hover:underline flex items-center space-x-1">
                <span>View All</span>
                <FaChevronRight className="text-[10px]" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              
              {/* Record 1 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-sm flex-shrink-0">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Blood Test (Thyroid Panel)</h4>
                    <p className="text-[11px] text-slate-400">Dr. Rajesh Shrestha • Ashwin 24</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-100">
                  Completed
                </span>
              </div>

              {/* Record 2 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-sm flex-shrink-0">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Chest X-Ray</h4>
                    <p className="text-[11px] text-slate-400">Dr. Anjana Shakya • Ashwin 12</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold text-sky-700 bg-sky-100">
                  Under Review
                </span>
              </div>

              {/* Record 3 */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-sm flex-shrink-0">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">General Consultation</h4>
                    <p className="text-[11px] text-slate-400">Dr. Sita Poudel • Bhadra 30</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-100">
                  Completed
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 4. NEARBY HEALTHCARE FACILITIES SECTION */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Nearby Healthcare Facilities
            </h2>
            <Link to="/hospitals" className="text-xs font-semibold text-[#0d9488] hover:underline flex items-center space-x-1">
              <span>Explore All</span>
              <FaChevronRight className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Hospital 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between">
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600"
                    alt="Nepalgunj Medical College"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Nepalgunj Medical College</h3>
                  <p className="text-xs text-slate-500">BBP Chowk, Nepalgunj, Banke</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-50">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-amber-400 text-xs" />
                  <span className="font-bold text-slate-800">4.8</span>
                  <span className="text-slate-400 font-normal">• 1.2 km away</span>
                </div>
                <Link to="/hospitals" className="font-semibold text-[#0d9488] hover:underline flex items-center space-x-1">
                  <span>View Details</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Hospital 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between">
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
                    alt="Bheri Hospital"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Bheri Hospital</h3>
                  <p className="text-xs text-slate-500">Khalte, Nepalgunj, Banke</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-50">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-amber-400 text-xs" />
                  <span className="font-bold text-slate-800">4.5</span>
                  <span className="text-slate-400 font-normal">• 2.4 km away</span>
                </div>
                <Link to="/hospitals" className="font-semibold text-[#0d9488] hover:underline flex items-center space-x-1">
                  <span>View Details</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Hospital 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between">
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
                    alt="Banke Community Health Center"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Banke Community Health Center</h3>
                  <p className="text-xs text-slate-500">Dhamboji, Nepalgunj</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-50">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-amber-400 text-xs" />
                  <span className="font-bold text-slate-800">4.7</span>
                  <span className="text-slate-400 font-normal">• 0.8 km away</span>
                </div>
                <Link to="/hospitals" className="font-semibold text-[#0d9488] hover:underline flex items-center space-x-1">
                  <span>View Details</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 5. WELLNESS GUIDELINES / YOUR DAILY HEALTH TIPS */}
        <div className="space-y-4 pt-4 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d9488]">
              WELLNESS GUIDELINES
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Your Daily Health Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tip 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                <FaTint />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Stay Hydrated</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nepalgunj summer heat demands at least 3-4 liters of pure water daily to avoid heat stroke.
                </p>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                <FaHeart />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Regular Checkups</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monitor your thyroid profile and vitals biannually as recommended by Dr. Rajesh.
                </p>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                <FaRunning />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Exercise Daily</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A brisk 30-minute walk at Mahendra Park will significantly improve your overall cardiovascular wellness.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#1e293b] text-slate-300 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Logo & Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-xs">
                <FaPlus />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Med Assist</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your personal digital healthcare partner in Nepal. Bridging patients with expert medical institutions.
            </p>
            <p className="text-slate-500 text-[11px] pt-2">
              © 2026 Med Assist Nepal. All rights reserved.
            </p>
          </div>

          {/* Col 2: App Features */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs tracking-wider">App Features</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/hospitals" className="hover:text-teal-400 transition">Find Doctors</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-teal-400 transition">AI Diagnostics</Link></li>
              <li><Link to="/hospitals" className="hover:text-teal-400 transition">Virtual Consultations</Link></li>
              <li><Link to="/appointments" className="hover:text-teal-400 transition">My Pharmacy</Link></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs tracking-wider">Support</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/about" className="hover:text-teal-400 transition">FAQ Guidelines</Link></li>
              <li><Link to="/hospitals" className="hover:text-teal-400 transition">Hospital Partners</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">Contact Helpline</Link></li>
              <li><span className="text-slate-400">Emergency Nepalgunj</span></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs tracking-wider">Legal</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/about" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">Data Consent</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">Terms of Practice</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">HIPAA Compliance</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-slate-800 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <span>© 2026 Med Assist Nepal. All rights reserved.</span>
            <span>Designed for {fullName} • Nepalgunj, Banke</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PatientDashboard;
