import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Hospitals from "./pages/Hospitals";
import AIAssistant from "./pages/AIAssistant";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserSelect from "./pages/UserSelect";
import PatientRegister from "./pages/PatientRegister";
import InstituteRegister from "./pages/InstituteRegister";
import PatientProfile from "./pages/PatientProfile";
import InstituteProfile from "./pages/InstituteProfile";
import HealthHistory from "./pages/HealthHistory";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={user?.isLoggedIn ? <Dashboard /> : <Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-select" element={<UserSelect />} />
            <Route path="/signup/patient" element={<PatientRegister />} />
            <Route path="/signup/institute" element={<InstituteRegister />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/institute/profile" element={<InstituteProfile />} />
            <Route path="/health-history" element={<HealthHistory />} />
          </Routes>
        </main>
      </div>

    </div>
  );
};

export default App;

