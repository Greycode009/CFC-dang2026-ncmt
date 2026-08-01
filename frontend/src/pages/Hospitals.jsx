import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaPlus, FaHospital, FaStar, FaMapMarkerAlt, FaCalendarPlus, FaPhoneAlt, FaStethoscope } from "react-icons/fa";
import { fetchHospitals } from "../api";
import { useAuth } from "../context/AuthContext";

const Hospitals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hospitalsList, setHospitalsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Fetch Hospitals on Mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchHospitals();
        const list = data?.hospitals || data || [];
        setHospitalsList(list);
      } catch (err) {
        console.error("Failed to load hospitals from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter hospitals list
  const filteredHospitals = hospitalsList.filter((inst) => {
    const name = inst.User?.fullName || inst.name || "";
    const type = inst.institutionType || "hospital";
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (inst.district || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      
      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        
        {/* PAGE HEADER BANNER */}
        <div className="bg-[#ebfef7] rounded-3xl p-6 sm:p-8 border border-teal-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-white text-[#0d9488] text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-xs">
              Healthcare Network
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Partner Hospitals & Clinics
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Find verified medical institutions, specialized departments, and emergency care centers across Nepalgunj and Banke.
            </p>
          </div>

          <button
            onClick={() => navigate("/appointments")}
            className="px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition flex items-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <FaCalendarPlus className="text-base" />
            <span>Book Appointment Hub</span>
          </button>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Search Input */}
          <div className="w-full sm:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by facility name or location..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0d9488]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {["all", "hospital", "clinic"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                  selectedType === type
                    ? "bg-[#0d9488] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type === "all" ? "All Facilities" : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* HOSPITALS GRID LIST */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
            <FaSpinner className="animate-spin text-3xl text-[#0d9488]" />
            <p className="text-xs font-semibold">Loading registered healthcare institutions...</p>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center space-y-3 max-w-md mx-auto">
            <FaHospital className="text-4xl text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Hospitals Found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((inst) => {
              const name = inst.User?.fullName || inst.name || "Medical Facility";
              const phone = inst.User?.phoneNumber || "N/A";
              const location = [inst.fullAddress || inst.municipality, inst.district].filter(Boolean).join(", ") || "Nepalgunj, Banke";

              return (
                <div
                  key={inst.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="space-y-4 p-6">
                    {/* Header Icon & Type Badge */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0d9488] border border-teal-100 flex items-center justify-center text-xl font-bold">
                        <FaHospital />
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                        {inst.institutionType || "Hospital"}
                      </span>
                    </div>

                    {/* Hospital Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0d9488] transition">
                        {name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <FaMapMarkerAlt className="text-teal-600 text-xs flex-shrink-0" />
                        <span>{location}</span>
                      </p>
                    </div>

                    {/* Departments & Services */}
                    {inst.department && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center space-x-1 text-[#0d9488] font-bold text-[11px]">
                          <FaStethoscope />
                          <span>Specialties:</span>
                        </div>
                        <p className="text-slate-700 line-clamp-2 text-[11px]">
                          {inst.department}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center space-x-1">
                      <FaPhoneAlt className="text-slate-400 text-[10px]" />
                      <span>{phone}</span>
                    </span>

                    <button
                      onClick={() => navigate(`/appointments?hospitalId=${inst.id}`)}
                      className="px-4 py-2 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
                    >
                      <FaCalendarPlus className="text-xs" />
                      <span>Book Visit</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#1b2533] text-slate-300 pt-12 pb-8 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0d9488] text-white flex items-center justify-center">
                  <FaPlus className="text-sm" />
                </div>
                <span className="text-lg font-bold text-white">Med Assist</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Your personal digital healthcare partner in Nepal. Bridging patients with expert medical institutions.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">FAQ Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Hospital Partners</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Helpline</a></li>
                <li><a href="#" className="hover:text-white transition">Emergency Nepalgunj</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Data Consent</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Practice</a></li>
                <li><a href="#" className="hover:text-white transition">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 Med Assist Nepal. All rights reserved.</p>
            <p>Designed for {user?.name || "Ram Sharma"} • Nepalgunj, Banke</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Hospitals;
