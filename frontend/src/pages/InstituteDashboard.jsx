import React, { useState } from "react";
import InstituteSidebar from "../components/Institute/InstituteSidebar";
import InstituteOverview from "../components/Institute/InstituteOverview";
import InstituteAppointments from "../components/Institute/InstituteAppointments";
import InstituteSettings from "../components/Institute/InstituteSettings";
import InstituteProfileDetails from "../components/InstituteProfile/InstituteProfileDetails";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");

  // Sample appointments queue state (syncs across overview & appointments queue tabs)
  const [appointments, setAppointments] = useState([
    {
      id: "APT-2026-01",
      patientName: "Ram Bahadur Thapa",
      age: 45,
      gender: "Male",
      department: "Cardiology",
      doctor: "Dr. Anish Sharma",
      date: "Aug 01, 2026",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: "APT-2026-02",
      patientName: "Sita Kumari Sharma",
      age: 29,
      gender: "Female",
      department: "Pediatrics",
      doctor: "Dr. Sunita Thapa",
      date: "Aug 01, 2026",
      time: "11:15 AM",
      status: "Confirmed",
    },
    {
      id: "APT-2026-03",
      patientName: "Bikash Gurung",
      age: 34,
      gender: "Male",
      department: "General OPD",
      doctor: "Dr. K.P. Adhikari",
      date: "Aug 01, 2026",
      time: "01:00 PM",
      status: "Confirmed",
    },
    {
      id: "APT-2026-04",
      patientName: "Anita Roy",
      age: 52,
      gender: "Female",
      department: "Orthopedics",
      doctor: "Dr. Rajesh Hamal",
      date: "Aug 02, 2026",
      time: "09:00 AM",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <InstituteOverview
            onNavigate={setActiveSection}
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        );
      case "appointments":
        return (
          <InstituteAppointments
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        );
      case "profile":
        return (
          <InstituteProfileDetails
            profileData={{ institution: user }}
            onEdit={() => navigate("/institute/profile")}
          />
        );
      case "settings":
        return <InstituteSettings />;
      default:
        return (
          <InstituteOverview
            onNavigate={setActiveSection}
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      {/* Fixed Sidebar */}
      <InstituteSidebar
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default InstituteDashboard;
