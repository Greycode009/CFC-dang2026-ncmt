import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#131e2c] text-slate-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shadow-sm">
                <FaPlus className="text-base" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Med Assist
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-2">
              A high-fidelity digital ecosystem simplifying critical hospital discovery and clinical record tracking across local clinics in Nepal.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/hospitals" className="hover:text-white transition">
                  Find Hospitals
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-white transition">
                  Consult AI
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Services Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Our Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Med Assist */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Contact Med Assist
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Surkhet Road, Nepalgunj, Nepal</li>
              <li>
                <a href="tel:+97781520111" className="hover:text-white transition">
                  +977 81 520111
                </a>
              </li>
              <li>
                <a href="mailto:support@medassist.com.np" className="hover:text-white transition">
                  support@medassist.com.np
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Subscribe to our seasonal healthcare circulars and digital platform update notes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 text-sm bg-[#1a2738] text-white border border-slate-700/80 rounded-full focus:outline-none focus:border-[#0d9488] placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-[#0d9488] hover:bg-[#0f896f] rounded-full transition cursor-pointer flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-teal-400 font-medium">
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80" />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© 2026 Med Assist. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition">
              Terms of Use
            </Link>
            <Link to="/about" className="hover:text-white transition">
              Local Medical Regulations
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
