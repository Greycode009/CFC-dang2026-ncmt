import React, { useState } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const [faqs] = useState([
    {
      id: 1,
      question: "Is the AI Companion diagnosis fully accurate?",
      answer:
        "Our AI health companion serves as an informational pre-diagnostic guidance system. It helps identify body symptoms and triage guidelines, but should not replace professional doctor consults.",
    },
    {
      id: 2,
      question: "How do I filter hospitals by specific treatment options?",
      answer:
        "Simply use the specialty or treatment category in our smart search filter on the Hospital Finder section to locate verified medical facilities instantly.",
    },
    {
      id: 3,
      question: "Can I securely upload my previous physical prescriptions?",
      answer:
        "Absolutely! You can scan or snap photo copies of physical medical scripts directly into the secure Health History portal to store and share at any time.",
    },
    {
      id: 4,
      question: "How do doctors receive my booked appointments?",
      answer:
        "Appointments booked via MedAssist sync directly into partner hospital databases, reserving your physical visit slot with zero wait time or friction.",
    },
    {
      id: 5,
      question: "Are there any fees for registering and using the basic portal?",
      answer:
        "Registration, hospital searches, and basic conversational AI health companion features are completely free of charge for all registered patients.",
    },
  ]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Quick answers to common questions about using MedAssist.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isOpen 
                    ? "border-[#0d9488]/30 shadow-md shadow-teal-500/5" 
                    : "border-slate-200/80 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Question Row */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:text-[#0d9488] transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <FaQuestionCircle className={`text-sm flex-shrink-0 transition-colors ${isOpen ? 'text-[#0d9488]' : 'text-slate-300'}`} />
                    <span>{faq.question}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs transition-all duration-200 ${
                    isOpen 
                      ? "bg-[#0d9488] text-white rotate-0" 
                      : "bg-slate-100 text-slate-500 hover:bg-teal-50 hover:text-[#0d9488]"
                  }`}>
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </div>
                </button>

                {/* Answer Content */}
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed ml-8">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
