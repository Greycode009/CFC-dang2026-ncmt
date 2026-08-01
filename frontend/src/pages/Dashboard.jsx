import React from "react";
import PatientDashboard from "./patient/PatientDashboard";
import InstituteDashboard from "./institute/InstituteDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const currentRole = user?.role || "patient";

  if (currentRole === "admin") {
    return <AdminDashboard />;
  }

  const isInstitute =
    currentRole === "institution" || currentRole === "institute";

  return isInstitute ? <InstituteDashboard /> : <PatientDashboard />;
};

export default Dashboard;
