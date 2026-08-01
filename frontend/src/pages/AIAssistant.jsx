import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaUser,
  FaSpinner,
  FaTrashAlt,
  FaPlus,
  FaLightbulb,
  FaShieldAlt,
  FaHeartbeat,
  FaStethoscope,
  FaPills
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const AIAssistant = () => {
  const { user } = useAuth();
  const userName = user?.name || "Ram";

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Namaste ${userName}! I am your MedAssist AI Health Assistant. How can I help you today? You can ask me about symptoms, medications, health tips, or lab report interpretations.`,
      time: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-scroll chat to bottom
  const chatBottomRef = useRef(null);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Preset Prompts
  const presetPrompts = [
    {
      icon: <FaStethoscope className="text-teal-600" />,
      text: "What are common home remedies for seasonal cold and cough?",
    },
    {
      icon: <FaPills className="text-teal-600" />,
      text: "How should Paracetamol be taken for a fever?",
    },
    {
      icon: <FaHeartbeat className="text-teal-600" />,
      text: "What is a healthy blood pressure range for adults?",
    },
  ];

  // Intelligent Response Generator
  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("fever") || q.includes("paracetamol") || q.includes("temperature")) {
      return `For a mild fever in adults:
1. Stay hydrated by drinking plenty of warm fluids (water, soups, ORS).
2. Take Paracetamol (500mg) after meals every 6 hours as needed. Do not exceed 4,000mg per day.
3. Get adequate bed rest and wear light cotton clothing.
⚠️ Seek immediate hospital care if fever exceeds 102°F or lasts more than 3 days.`;
    }

    if (q.includes("cold") || q.includes("cough") || q.includes("remedies") || q.includes("flu")) {
      return `Here are effective home remedies for cold & cough:
• Steam Inhalation: Inhale warm steam 2 times daily to clear nasal passages.
• Ginger & Honey Tea: Warm water mixed with crushed ginger and honey soothes throat irritation.
• Saltwater Gargle: Warm water with 1/2 tsp salt 3 times daily.
• Rest & Hydration: Keep warm and rest well.`;
    }

    if (q.includes("blood pressure") || q.includes("bp") || q.includes("hypertension")) {
      return `Blood Pressure (BP) Guide:
• Normal BP: Less than 120/80 mmHg.
• Elevated BP: 120-129 / <80 mmHg.
• High BP (Stage 1): 130-139 / 80-89 mmHg.

Tips for maintaining healthy BP:
- Reduce dietary sodium (salt) intake.
- Exercise 30 minutes daily.
- Avoid stress and monitor BP weekly.`;
    }

    return `Thank you for your question regarding "${query}".

Based on clinical health guidelines:
1. Ensure adequate hydration (2.5 to 3 liters of water daily).
2. Maintain a balanced diet rich in leafy greens, whole grains, and lean protein.
3. If symptoms persist for more than 48 hours, consider scheduling an in-person consultation with a specialist via our Appointments section.`;
  };

  // Send Message Handler
  const handleSendMessage = (textToSend) => {
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

    // Simulate AI response delay
    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: "ai",
        text: generateAIResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsGenerating(false);
    }, 900);
  };

  // Clear Chat History
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: `Chat cleared! How can I assist you now, ${userName}?`,
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
                  MedAssist AI Assistant
                </h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase">
                  Online
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                Your 24/7 intelligent healthcare guide & symptom assistant.
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
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-xs ${msg.sender === "user"
                      ? "bg-slate-900 text-white"
                      : "bg-[#0d9488] text-white"
                    }`}
                >
                  {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1 ${msg.sender === "user"
                      ? "bg-[#0d9488] text-white rounded-tr-none"
                      : "bg-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line"
                    }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[10px] block text-right font-medium ${msg.sender === "user" ? "text-teal-100" : "text-slate-400"
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
                  <span>Analyzing clinical database...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
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
              placeholder="Ask a health question or describe symptoms..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#0d9488]"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isGenerating}
              className="px-5 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold rounded-2xl transition shadow-xs disabled:opacity-50 cursor-pointer flex items-center space-x-2"
            >
              <span>Send</span>
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
