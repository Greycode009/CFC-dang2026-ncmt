import React from "react";
import { Navigate } from "react-router-dom";

// Health history section removed per requirements — redirect to appointments
const HealthHistory = () => {
  return <Navigate to="/appointments" replace />;
};

export default HealthHistory;
