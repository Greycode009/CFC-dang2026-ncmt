import React, { useState, useEffect } from "react";
import InstituteSidebar from "../../components/institute/InstituteSidebar";
import InstituteOverview from "../../components/institute/InstituteOverview";
import InstituteAppointments from "../../components/institute/InstituteAppointments";
import InstituteSettings from "../../components/institute/InstituteSettings";
import InstituteProfileDetails from "../../components/institute/InstituteProfileDetails";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getInstitutionProfile,
  getInstitutionAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../api";
import { FaSpinner } from "react-icons/fa";

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Normalize appointment status for display
  const mapStatusToDisplay = (status) => {
    if (!status) return "Pending";
    const s = status.toLowerCase();
    if (s === "accepted" || s === "confirmed") return "Confirmed";
    if (s === "pending") return "Pending";
    if (s === "completed") return "Completed";
    if (s === "rejected") return "Rejected";
    if (s === "cancelled") return "Cancelled";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format backend appointments
  const formatAppointments = (rawList) => {
    if (!Array.isArray(rawList)) return [];
    return rawList.map((item, index) => {
      const patientUser = item.Patient?.User || {};
      const rawId = item.id;
      return {
        id: index + 1,
        sn: index + 1,
        rawId: rawId,
        patientName: patientUser.fullName || "Patient",
        age: item.Patient?.age || "N/A",
        gender: item.Patient?.gender || "N/A",
        phoneNumber: patientUser.phoneNumber || "N/A",
        department: item.reason || "General OPD",
        doctor: "Duty Physician",
        date: item.appointmentDate || "2026-08-01",
        time: item.appointmentTime || "10:00 AM",
        status: mapStatusToDisplay(item.status),
        rawStatus: item.status,
      };
    });
  };

  // Fetch real profile & appointments from backend database
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Get institution profile
      const profRes = await getInstitutionProfile().catch(() => null);
      if (profRes) {
        setProfileData(profRes);
      }

      // 2. Get institution appointments
      const apptRes = await getInstitutionAppointments().catch(() => null);
      if (apptRes?.appointments) {
        setAppointments(formatAppointments(apptRes.appointments));
      }
    } catch (err) {
      console.error("Error fetching institute dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Action handler connecting directly to API
  const handleStatusChange = async (id, newStatus) => {
    // Find appointment by id (or rawId)
    const target = appointments.find((a) => a.id === id || a.rawId === id);
    if (!target) return;

    const realId = target.rawId;

    try {
      if (newStatus === "Confirmed" || newStatus === "accepted") {
        await acceptAppointment(realId);
      } else if (newStatus === "Rejected" || newStatus === "rejected") {
        await rejectAppointment(realId);
      } else if (newStatus === "Completed" || newStatus === "completed") {
        await completeAppointment(realId);
      }

      // Refresh real list from DB
      await fetchData();
    } catch (err) {
      console.error("Failed to update appointment status:", err);
      // Fallback local state update if backend fails
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <FaSpinner className="animate-spin text-3xl text-[#0d9488]" />
          <p className="text-sm font-semibold text-slate-600">Loading DB records...</p>
        </div>
      );
    }

    switch (activeSection) {
      case "overview":
        return (
          <InstituteOverview
            onNavigate={setActiveSection}
            appointments={appointments}
            onStatusChange={handleStatusChange}
            profileData={profileData}
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
            profileData={profileData || { institution: user }}
            onEdit={() => navigate("/institute/profile")}
          />
        );
      case "settings":
        return (
          <InstituteSettings
            profileData={profileData}
            onRefreshProfile={fetchData}
          />
        );
      default:
        return (
          <InstituteOverview
            onNavigate={setActiveSection}
            appointments={appointments}
            onStatusChange={handleStatusChange}
            profileData={profileData}
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
        profileData={profileData}
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
