import React from "react";

const Review = ({ formData }) => {
  return (
    <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <h4 className="font-semibold text-slate-900 border-b pb-2">Review Facility Information</h4>
      <div><strong className="text-slate-900">Institute Type:</strong> {formData.instituteType}</div>
      <div><strong className="text-slate-900">Total Bed Capacity:</strong> {formData.bedCapacity}</div>
      <div><strong className="text-slate-900">Departments:</strong> {formData.departments || "N/A"}</div>
      <div><strong className="text-slate-900">OPD Hours:</strong> {formData.opdHours || "N/A"}</div>
      <div><strong className="text-slate-900">Emergency Availability:</strong> {formData.emergencyCare}</div>
      <div><strong className="text-slate-900">Address:</strong> {formData.address ? `${formData.address}, ${formData.city}` : "N/A"}</div>
    </div>
  );
};

export default Review;
