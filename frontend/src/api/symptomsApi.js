import API from "./axiosInstance";

/**
 * Symptoms API — /api/symptoms
 * Check Patient Symptoms using Gemini AI & Database Matching
 */
export const checkSymptoms = async (symptomsText) => {
  const res = await API.post("/symptoms/check", { symptoms: symptomsText });
  return res.data; // { success: true, assessment: {...}, hospitals: [...] }
};
