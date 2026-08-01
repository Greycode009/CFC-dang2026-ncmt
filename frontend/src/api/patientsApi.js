import API from "./axiosInstance";

/**
 * Patient Management API — /api/patients
 * 2.1 Get Patient Profile    — GET   /api/patients/profile  (private: patient)
 * 2.2 Update Patient Profile — PATCH /api/patients/profile  (private: patient)
 */

// 2.1 Get Patient Profile
export const getPatientProfile = async () => {
  const res = await API.get("/patients/profile");
  return res.data; // { message, patient: { ...fields, User: { fullName, email, phoneNumber, role } } }
};

// 2.2 Update Patient Profile (all fields optional — partial update)
export const updatePatientProfile = async (profileData) => {
  const res = await API.patch("/patients/profile", profileData);
  return res.data; // { message, user, patient }
};
