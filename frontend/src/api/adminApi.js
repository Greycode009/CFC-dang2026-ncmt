import API from "./axiosInstance";

/**
 * Admin Management API — /api/admin
 * 7.1 Get All Institutions               — GET   /api/admin/institutions             (private: admin)
 * 7.2 Get Pending Verification Requests  — GET   /api/admin/institutions/pending     (private: admin)
 * 7.3 Approve & Verify Institution       — PATCH /api/admin/institutions/:id/verify  (private: admin)
 * 7.4 Reject Institution Verification    — PATCH /api/admin/institutions/:id/reject  (private: admin)
 */

// 7.1 Get all institutions
export const adminGetAllInstitutions = async () => {
  const res = await API.get("/admin/institutions");
  return res.data; // { message, institutions: [...] }
};

// 7.2 Get institutions with pending verification
export const adminGetPendingInstitutions = async () => {
  const res = await API.get("/admin/institutions/pending");
  return res.data; // { message, institutions: [...] }
};

// 7.3 Approve & verify an institution
export const adminVerifyInstitution = async (id) => {
  const res = await API.patch(`/admin/institutions/${id}/verify`);
  return res.data; // { message, institution }
};

// 7.4 Reject an institution's verification
export const adminRejectInstitution = async (id) => {
  const res = await API.patch(`/admin/institutions/${id}/reject`);
  return res.data; // { message, institution }
};
