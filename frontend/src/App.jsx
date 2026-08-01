import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Homepage from "./pages/public/Homepage";
import Hospitals from "./pages/public/Hospitals";
import AIAssistant from "./pages/patient/AIAssistant";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import Contact from "./pages/public/Contact";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserSelect from "./pages/auth/UserSelect";
import PatientRegister from "./pages/auth/PatientRegister";
import InstituteRegister from "./pages/auth/InstituteRegister";
import PatientProfile from "./pages/patient/PatientProfile";
import InstituteProfile from "./pages/institute/InstituteProfile";
import Appointments from "./pages/patient/Appointments";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";

// Simple wrapper that redirects guests to /login
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Admin-only route wrapper
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user?.isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const { user } = useAuth();
  const hasSidebarLayout =
    user?.isLoggedIn &&
    (user?.role === "admin" || user?.role === "institution" || user?.role === "institute");

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Hide the main Navbar when user has dedicated dashboard sidebar */}
        {!hasSidebarLayout && <Navbar />}
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={user?.isLoggedIn ? <Dashboard /> : <Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-select" element={<UserSelect />} />
            <Route path="/signup/patient" element={<PatientRegister />} />
            <Route path="/signup/institute" element={<InstituteRegister />} />

            {/* Protected routes — require login */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/hospitals" element={<PrivateRoute><Hospitals /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
            <Route path="/ai-assistant" element={<PrivateRoute><AIAssistant /></PrivateRoute>} />
            <Route path="/patient/profile" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
            <Route path="/institute/profile" element={<PrivateRoute><InstituteProfile /></PrivateRoute>} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
