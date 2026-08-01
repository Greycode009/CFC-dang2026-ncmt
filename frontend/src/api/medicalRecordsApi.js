import API from "./axiosInstance";

/**
 * Medical Records API — /api/medical-records
 * 6.1 Upload Medical Record             — POST   /api/medical-records              (private: patient)
 * 6.2 Get Patient's Own Medical Records — GET    /api/medical-records/my           (private: patient)
 * 6.3 Update Medical Record Info        — PATCH  /api/medical-records/:id          (private: patient)
 * 6.4 Delete Medical Record             — DELETE /api/medical-records/:id          (private: patient)
 * 6.5 Get Patient Records by Institution— GET    /api/medical-records/patient/:id  (private: institution)
 *
 * recordType options: "Prescription" | "Lab Report" | "X-Ray" | "MRI" | "CT Scan"
 *                     | "Vaccination" | "Discharge Summary" | "Other"
 */

// 6.1 Upload a medical record (multipart/form-data)
// recordFile: File object, title: string, recordType: string, description?: string
export const uploadMedicalRecord = async ({ title, recordType, description, recordFile }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("recordType", recordType);
  if (description) formData.append("description", description);
  formData.append("medicalRecord", recordFile); // field name expected by backend

  const res = await API.post("/medical-records", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // { message, record: { id, patientId, title, recordType, description, fileUrl, createdAt } }
};

// 6.2 Get logged-in patient's own records
export const getMyMedicalRecords = async () => {
  const res = await API.get("/medical-records/my");
  return res.data; // { records: [...] }
};

// 6.3 Update a medical record's info (not the file)
export const updateMedicalRecord = async (id, { title, recordType, description }) => {
  const res = await API.patch(`/medical-records/${id}`, { title, recordType, description });
  return res.data; // { message, record }
};

// 6.4 Delete a medical record
export const deleteMedicalRecord = async (id) => {
  const res = await API.delete(`/medical-records/${id}`);
  return res.data; // { message: "Medical record deleted successfully." }
};

// 6.5 Get a specific patient's records — used by institution
export const getPatientRecordsByInstitution = async (patientId) => {
  const res = await API.get(`/medical-records/patient/${patientId}`);
  return res.data; // { records: [...] }
};
