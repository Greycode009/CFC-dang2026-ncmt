import API from "./axiosInstance";

/**
 * Hospital & Clinic Discovery API — /api/hospitals
 * 4.1 Get Verified Hospitals/Clinics — GET /api/hospitals               (public)
 * 4.2 Search Hospitals               — GET /api/hospitals/search        (public)
 * 4.3 Get Hospital Details by ID     — GET /api/hospitals/:id           (public)
 */

// 4.1 Get all verified hospitals / clinics
export const fetchHospitals = async () => {
  const res = await API.get("/hospitals");
  return res.data;
  // { hospitals: [ { id, institutionType, district, municipality, department, services,
  //   verificationStatus, User: { fullName, email, phoneNumber } } ] }
};

// 4.2 Search hospitals by query params
// params: { district?, municipality?, department?, services? }
export const searchHospitals = async (params = {}) => {
  const res = await API.get("/hospitals/search", { params });
  return res.data; // { count, hospitals: [...] }
};

// 4.3 Get a single hospital's full details by ID (UUID)
export const getHospitalById = async (id) => {
  const res = await API.get(`/hospitals/${id}`);
  return res.data; // { hospital: { ... } }
};
