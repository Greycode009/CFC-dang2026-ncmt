import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaExclamationTriangle,
  FaPaperPlane,
} from "react-icons/fa";
import Footer from "../../components/common/Footer";

const Contact = () => {
  const contactCards = [
    {
      icon: FaMapMarkerAlt,
      title: "Our Head Office",
      detail: "Surkhet Road, Nepalgunj, Banke",
      subDetail: "Ward No. 2, BBP Chowk",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone Helpline",
      detail: "+977 81 520111",
      subDetail: "Toll-Free: 1660-01-52011",
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      detail: "support@medassist.com.np",
      subDetail: "info@medassist.com.np",
    },
    {
      icon: FaClock,
      title: "Operating Hours",
      detail: "Sun - Fri: 8:00 AM - 8:00 PM",
      subDetail: "Emergency Desk: 24/7",
    },
  ];

  // Direct mail compose URLs
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=support@medassist.com.np&su=Inquiry%20from%20MedAssist";
  const outlookUrl = "https://outlook.live.com/mail/0/deeplink/compose?to=support@medassist.com.np&subject=Inquiry%20from%20MedAssist";
  const defaultMailto = "mailto:support@medassist.com.np?subject=Inquiry%20from%20MedAssist";

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        {/* HEADER / HERO */}
        <section className="w-full bg-white py-12 lg:py-20 border-b border-slate-200/60">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
            <div>
              <span className="font-mono inline-block px-4 py-1.5 rounded-full bg-[#ccfbf1] text-[#0d9488] text-xs font-bold tracking-wide uppercase">
                Contact Details
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Get in Touch with <span className="text-[#0d9488]">MedAssist</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Connect with our support team in Nepalgunj directly via phone, email, or visit our head office.
            </p>
          </div>
        </section>

        {/* CONTACT CARDS & DIRECT EMAIL SECTION */}
        <section className="w-full bg-[#f8faf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            
            {/* 4 CONTACT CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-lg transition duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1]/60 text-[#0d9488] flex items-center justify-center text-xl">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{card.detail}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{card.subDetail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SEND EMAIL REDIRECT & EMERGENCY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Send Email Direct Box */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Send Us a Direct Email
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Click below to open your preferred email client and compose a message directly to <strong className="text-slate-800 font-mono">support@medassist.com.np</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gmail Button */}
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-2xl transition group flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0d9488] transition">Send via Gmail</h3>
                      <p className="text-[11px] text-slate-500">Opens Gmail Web</p>
                    </div>
                  </a>

                  {/* Outlook Button */}
                  <a
                    href={outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-2xl transition group flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0d9488] transition">Send via Outlook</h3>
                      <p className="text-[11px] text-slate-500">Opens Outlook Web</p>
                    </div>
                  </a>
                </div>

                {/* Default Mail Client Link */}
                <div className="pt-2">
                  <a
                    href={defaultMailto}
                    className="w-full py-3.5 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-xs sm:text-sm rounded-full transition shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>Open Default Mail App</span>
                  </a>
                </div>
              </div>

              {/* Emergency & Institution Onboarding Sidebars */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Emergency Box */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl">
                    <FaExclamationTriangle />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Medical Emergency?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If you are facing a life-threatening medical emergency, please call local ambulance emergency services immediately.
                  </p>
                  <div className="pt-2">
                    <a
                      href="tel:102"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0d9488] hover:bg-[#0f896f] text-white font-bold text-sm rounded-full transition"
                    >
                      <FaPhoneAlt />
                      <span>Call 102 Ambulance</span>
                    </a>
                  </div>
                </div>

                {/* Hospital Onboarding */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="font-serif text-xl font-bold text-slate-900">Hospital Partnerships</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Want to register your medical clinic or hospital on MedAssist? Contact our onboarding team at:
                  </p>
                  <p className="text-sm font-bold text-[#0d9488] font-mono">institutes@medassist.com.np</p>
                </div>

              </div>

            </div>

          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
