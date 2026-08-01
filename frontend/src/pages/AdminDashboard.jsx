import React, { useState } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminOverview from "../components/Admin/AdminOverview";
import AdminInstitutions from "../components/Admin/AdminInstitutions";
import AdminAppointments from "../components/Admin/AdminAppointments";
import AdminSettings from "../components/Admin/AdminSettings";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview onNavigate={setActiveSection} />;
      case "institutions":
        return <AdminInstitutions />;
      case "appointments":
        return <AdminAppointments />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
