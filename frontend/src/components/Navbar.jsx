import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const Navbar = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/hospitals", label: "Hospitals" },
    { to: "/ai-assistant", label: "AI Assistant" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0D9588] text-white flex items-center justify-center text-lg font-bold">
            <FaPlus />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            MedAssist
          </span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-emerald-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </NavLink>
          <NavLink
            to="/user-select"
            className="rounded-full bg-[#0D9588] px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
