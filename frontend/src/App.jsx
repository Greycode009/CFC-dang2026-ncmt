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
import ProfileUpdate from "./pages/ProfileUpdate";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-select" element={<UserSelect />} />
          <Route path="/signup/patient" element={<PatientRegister />} />
          <Route path="/signup/institute" element={<InstituteRegister />} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
        </Routes>
      </main>
    </>
  );
};

export default App;

