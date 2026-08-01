import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaPaperPlane,
  FaUser,
  FaSpinner,
  FaTrashAlt,
  FaPlus,
  FaShieldAlt,
  FaHeartbeat,
  FaStethoscope,
  FaHospital,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { checkSymptoms } from "../../api";

const AIAssistant = () => {
  const { user } = useAuth();
  const userName = user?.name || "Ram";

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Namaste ${userName}! I am your MedAssist AI Health Assistant. Describe your symptoms (e.g. fever, headache, stomach pain), and I will evaluate urgency, possible conditions, recommended medical department, and nearby verified hospitals.`,
      time: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-scroll ONLY inner chat box to bottom when new messages arrive
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messages.length > 1 || isGenerating) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, isGenerating]);

  // Preset Prompts
  const presetPrompts = [
    {
      icon: <FaStethoscope className="text-teal-600" />,
      text: "I have had a high fever, mild headache, and sore throat for 2 days.",
    },
    {
      icon: <FaHeartbeat className="text-teal-600" />,
      text: "Experiencing sharp stomach pain on the right side and nausea.",
    },
    {
      icon: <FaHospital className="text-teal-600" />,
      text: "What should I do for a persistent dry cough and chest tightness?",
    },
  ];

  // Send Message Handler — calls backend Gemini symptom triage API
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isGenerating) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsGenerating(true);

    try {
      const data = await checkSymptoms(text);
      if (data?.success && data?.assessment) {
        const aiReply = {
          id: Date.now() + 1,
          sender: "ai",
          assessment: data.assessment,
          hospitals: data.hospitals || [],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "ai",
            text: "Sorry, I could not complete the symptom assessment. Please try again.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      console.error("AI Assistant error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to analyze symptoms.";
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: `⚠️ ${errorMsg}. Please ensure you are logged in as a patient or try again later.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Clear Chat History
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: `Chat cleared! How can I assist you now, ${userName}? Please describe your symptoms.`,
        time: "Just now",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between relative">

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0d9488] text-white flex items-center justify-center text-2xl shadow-md">
              <FaRobot />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  MedAssist AI Symptom Triage
                </h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase">
                  Online
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                Your 24/7 intelligent symptom checker & medical department finder powered by Gemini AI.
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            title="Clear Chat History"
          >
            <FaTrashAlt className="text-sm" />
          </button>
        </div>

        {/* PRESET SUGGESTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presetPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.text)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#0d9488] transition text-left cursor-pointer flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <span className="text-xs text-slate-700 font-semibold line-clamp-2">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {/* CHAT MESSAGES CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-6 flex-1 flex flex-col justify-between min-h-[420px] space-y-4">

          {/* MESSAGES LIST */}
          <div ref={messagesContainerRef} className="space-y-4 overflow-y-auto max-h-[520px] pr-2 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-xs ${msg.sender === "user" ? "bg-slate-900 text-white" : "bg-[#0d9488] text-white"
                    }`}
                >
                  {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                </div>

                {/* Message Content / Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${msg.sender === "user"
                    ? "bg-[#0d9488] text-white rounded-tr-none"
                    : "bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none space-y-3"
                    }`}
                >
                  {/* Standard Text Message */}
                  {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}

                  {/* AI Structured Assessment Response */}
                  {msg.assessment && (
                    <div className="space-y-3.5">

                      {/* Emergency Alert Box */}
                      {msg.assessment.emergency && (
                        <div className="bg-rose-900/95 text-white p-3.5 rounded-2xl border border-rose-500 shadow-md space-y-1 text-xs">
                          <div className="flex items-center space-x-2 font-bold text-rose-200">
                            <FaExclamationTriangle className="text-base animate-bounce" />
                            <span>EMERGENCY WARNING</span>
                          </div>
                          <p className="leading-relaxed">
                            Your symptoms may indicate a critical emergency condition. Please visit the nearest hospital emergency room immediately or contact emergency medical services.
                          </p>
                        </div>
                      )}

                      {/* Urgency & Recommended Department Header */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200/60">
                        <div className="flex items-center space-x-2">
                          <FaHospital className="text-[#0d9488] text-base" />
                          <span className="text-xs text-slate-500 font-medium">Recommended Department:</span>
                          <strong className="text-slate-900 font-extrabold text-sm">
                            {msg.assessment.recommendedDepartment || "General Medicine"}
                          </strong>
                        </div>

                        {msg.assessment.urgency && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${(msg.assessment.urgency || "").toLowerCase() === "high"
                            ? "bg-rose-100 text-rose-800 border-rose-200"
                            : (msg.assessment.urgency || "").toLowerCase() === "moderate"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-emerald-100 text-emerald-800 border-emerald-200"
                            }`}>
                            {msg.assessment.urgency} Urgency
                          </span>
                        )}
                      </div>

                      {/* Possible Conditions */}
                      {msg.assessment.possibleConditions?.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="font-bold text-slate-800 text-xs">Evaluated Possible Conditions:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.assessment.possibleConditions.map((cond, i) => (
                              <span key={i} className="px-3 py-1 bg-teal-50 text-[#0d9488] font-bold rounded-xl text-xs border border-teal-100">
                                {cond}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Home Care Advice */}
                      {msg.assessment.homeCare && (
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs space-y-1">
                          <p className="font-bold text-slate-900 flex items-center space-x-1.5">
                            <FaCheckCircle className="text-emerald-600 text-xs" />
                            <span>Home Care Guidance:</span>
                          </p>
                          <p className="text-slate-700 leading-relaxed">{msg.assessment.homeCare}</p>
                        </div>
                      )}

                      {/* Warning */}
                      {msg.assessment.warning && (
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                          <p className="font-bold flex items-center space-x-1.5">
                            <FaExclamationTriangle className="text-amber-600 text-xs" />
                            <span>Important Warning:</span>
                          </p>
                          <p className="leading-relaxed">{msg.assessment.warning}</p>
                        </div>
                      )}

                      {/* Recommended Clinics & Hospitals Matching Specialized Departments / Services */}
                      {msg.hospitals?.length > 0 ? (
                        <div className="pt-2.5 space-y-3 border-t border-slate-200/60">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <p className="font-bold text-slate-800 text-xs flex items-center space-x-1.5">
                              <FaHospital className="text-[#0d9488]" />
                              <span>Recommended Clinics & Hospitals matching <strong className="text-[#0d9488]">{msg.assessment.recommendedDepartment || "Specialized Care"}</strong>:</span>
                            </p>

                            <Link
                              to={`/appointments?hospitalId=${msg.hospitals[0]?.id}&department=${encodeURIComponent(msg.assessment?.recommendedDepartment || "")}`}
                              className="px-4 py-2 bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold rounded-xl text-xs transition cursor-pointer inline-flex items-center space-x-1.5 shadow-xs self-start sm:self-auto flex-shrink-0"
                            >
                              <span>Book Appointment Now</span>
                              <FaArrowRight className="text-[10px]" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5">
                            {msg.hospitals.map((h) => {
                              const instName = h.User?.fullName || h.name || "Healthcare Institution";
                              const instPhone = h.User?.phoneNumber || h.phone;
                              const instAddress = h.fullAddress || [h.municipality, h.district].filter(Boolean).join(", ");
                              return (
                                <div
                                  key={h.id}
                                  className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs hover:border-[#0d9488] transition group"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                                      <h5 className="font-bold text-slate-900 group-hover:text-[#0d9488] transition">{instName}</h5>
                                      {h.institutionType && (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-teal-50 text-[#0d9488] border border-teal-200/80">
                                          {h.institutionType}
                                        </span>
                                      )}
                                    </div>

                                    <p className="text-[11px] text-slate-500">
                                      📍 {instAddress || "Nepalgunj, Banke"}
                                    </p>

                                    {/* Specialized Department from DB */}
                                    {h.department && (
                                      <p className="text-[10px] text-slate-700 font-medium pt-0.5">
                                        <strong className="text-[#0d9488] font-bold">Specialty:</strong> {h.department}
                                      </p>
                                    )}

                                    {/* Key Services from DB */}
                                    {h.services && (
                                      <p className="text-[10px] text-slate-500 line-clamp-1">
                                        <strong className="text-slate-700 font-semibold">Services:</strong> {h.services}
                                      </p>
                                    )}

                                    {instPhone && (
                                      <p className="text-[10px] text-teal-700 font-semibold">
                                        Helpline: {instPhone}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2.5 border-t border-slate-200/60 text-xs text-slate-500">
                          <p className="flex items-center space-x-1.5 font-medium text-slate-600">
                            <FaHospital className="text-amber-500" />
                            <span>No verified clinics with <strong className="text-slate-900 font-bold">{msg.assessment.recommendedDepartment || "matching"}</strong> department listed currently.</span>
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                  <span
                    className={`text-[10px] block text-right font-medium pt-1 ${msg.sender === "user" ? "text-teal-100" : "text-slate-400"
                      }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* AI TYPING INDICATOR */}
            {isGenerating && (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-[#0d9488] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  <FaRobot />
                </div>
                <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-500 flex items-center space-x-2 rounded-tl-none">
                  <FaSpinner className="animate-spin text-[#0d9488]" />
                  <span>Evaluating symptoms & matching specialized hospitals...</span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-3 border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Describe symptoms (e.g. fever, chest pain, headache)..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#0d9488]"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isGenerating}
              className="px-5 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold rounded-2xl transition shadow-xs disabled:opacity-50 cursor-pointer flex items-center space-x-2"
            >
              <span>Analyze</span>
              <FaPaperPlane className="text-xs" />
            </button>
          </form>

        </div>

        {/* MEDICAL DISCLAIMER NOTICE */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/70 flex items-start space-x-3 text-xs text-amber-900">
          <FaShieldAlt className="text-amber-600 text-base flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Medical Disclaimer:</strong> MedAssist AI provides information for educational guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified physician for any health emergency.
          </p>
        </div>

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

export default AIAssistant;
