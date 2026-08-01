import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isLoggedIn = user?.isLoggedIn;
  const isLoginPage = location.pathname === "/login";

  // Compute initials for user avatar badge (e.g. "Ram Sharma" -> "RS")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const profilePath =
    user?.role === "institution" || user?.role === "institute"
      ? "/institute/profile"
      : "/patient/profile";

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-sm font-semibold text-[#0d9488]"
      : "text-sm font-medium text-slate-600 hover:text-[#0d9488] transition";

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#0d9488] text-white flex items-center justify-center shadow-xs">
            <FaPlus className="text-xs" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            MedAssist
          </span>
        </Link>

        {/* 2. NAVIGATION LINKS — Conditional on auth state */}
        <nav className="hidden md:flex items-center space-x-7">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          {isLoggedIn ? (
            <>
              {/* Logged-in links */}
              <NavLink to="/hospitals" className={navLinkClass}>
                Hospitals
              </NavLink>

              <NavLink to="/appointments" className={navLinkClass}>
                Appointments
              </NavLink>

              <NavLink to="/ai-assistant" className={navLinkClass}>
                AI Assistant
              </NavLink>
            </>
          ) : (
            <>
              {/* Guest links */}
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>

              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>

              <NavLink to="/how-it-works" className={navLinkClass}>
                How It Works
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </>
          )}
        </nav>

        {/* 3. USER PROFILE OR LOGIN/SIGNUP */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 text-sm">
              {/* Clickable Profile Badge & User Name */}
              <Link
                to={profilePath}
                title="Go to Profile"
                className="flex items-center space-x-2.5 hover:opacity-85 transition cursor-pointer group"
              >
                {/* Initials Badge */}
                <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0d9488] font-bold text-xs flex items-center justify-center border border-teal-200">
                  {getInitials(user.name)}
                </div>
                <span className="font-semibold text-slate-800 group-hover:text-[#0d9488] transition">
                  {user.name || "User"}
                </span>
              </Link>

              {/* Vertical Divider */}
              <span className="text-slate-300 font-light">|</span>

              {/* Logout Link */}
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={
                  isLoginPage
                    ? "px-5 py-2 text-sm font-semibold text-white bg-[#0d9488] rounded-full hover:bg-[#0f896f] transition"
                    : "px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
                }
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={
                  isLoginPage
                    ? "px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
                    : "px-5 py-2 text-sm font-semibold text-white bg-[#0d9488] rounded-full hover:bg-[#0f896f] transition"
                }
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
