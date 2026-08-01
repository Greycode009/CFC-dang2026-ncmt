import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  // Track currently expanded FAQ index (null = all collapsed)
  const [openIndex, setOpenIndex] = useState(0);

  // Initial FAQ list (Ready to be populated via backend API in future)
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
        "Appointments booked via Med Assist sync directly into partner hospital databases, reserving your physical visit slot with zero wait time or friction.",
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
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition duration-150"
              >
                {/* Question Row */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:text-[#0d9488] transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className="w-7 h-7 rounded-full bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center flex-shrink-0 text-xs">
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
