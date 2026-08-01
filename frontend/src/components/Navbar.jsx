
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Hide Navbar completely on profile pages (e.g. /patient/profile, /institute/profile)
  if (location.pathname.includes("/profile")) {
    return null;
  }

  // Check if current page is Login
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shadow-sm">
            <FaPlus className="text-base" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            MedAssist
          </span>
        </Link>

        {/* 2. NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-[#0d9488]"
                : "text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/hospitals"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-[#0d9488]"
                : "text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
            }
          >
            Hospitals
          </NavLink>

          <NavLink
            to="/ai-assistant"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-[#0d9488]"
                : "text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
            }
          >
            AI Assistant
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-[#0d9488]"
                : "text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/health-history"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-[#0d9488]"
                : "text-sm font-semibold text-slate-700 hover:text-[#0d9488] transition"
            }
          >
            Health History
          </NavLink>
        </nav>

        {/* 3. BUTTONS OR USER INFO */}
        <div className="flex items-center space-x-3">
          {user?.isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                <span className="text-xs font-semibold text-slate-800">{user.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer border border-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Login Link / Button */}
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

              {/* Sign Up Link / Button */}
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
