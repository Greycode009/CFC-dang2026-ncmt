import API from "./axiosInstance";

/**
 * Institution Profile API — /api/institutions
 * 3.1 Get Institution Profile   — GET   /api/institutions/profile              (private: institution)
 * 3.2 Update Institution Profile — PATCH /api/institutions/profile             (private: institution)
 * 3.3 Request Verification      — POST  /api/institutions/request-verification (private: institution)
 */

// 3.1 Get Institution Profile
export const getInstitutionProfile = async () => {
  const res = await API.get("/institutions/profile");
  return res.data;
  // { message, institution: { id, institutionType, registrationNumber, province, district,
  //   municipality, fullAddress, department, services, openingTime, closingTime,
  //   beds, noOfDoctor, authPersonName, authPersonNumber, profileCompleted,
  //   verificationStatus, User: { id, fullName, email, phoneNumber, role } } }
};

// 3.2 Update Institution Profile (all fields optional)
// institutionType: "hospital" | "clinic"
export const updateInstitutionProfile = async (profileData) => {
  const res = await API.patch("/institutions/profile", profileData);
  return res.data; // { message, institution, user }
};

// 3.3 Submit for admin verification (call after profile is complete)
export const requestInstitutionVerification = async () => {
  const res = await API.post("/institutions/request-verification");
  return res.data; // { message: "Verification request submitted successfully." }
};
