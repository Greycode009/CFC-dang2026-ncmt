import React from "react";
import PatientDashboard from "./PatientDashboard";
import InstituteDashboard from "./InstituteDashboard";
import AdminDashboard from "./AdminDashboard";
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
