/**
 * MedAssist API — Barrel Export
 * Import anything directly: import { loginUser, bookAppointment } from "../api"
 */

// 1. Auth
export * from "./authApi";

// 2. Patients
export * from "./patientsApi";

// 3. Institutions
export * from "./institutionsApi";

// 4. Hospitals (public discovery)
export * from "./hospitalsApi";

// 5. Appointments
export * from "./appointmentsApi";

// 6. Medical Records
export * from "./medicalRecordsApi";

// 7. Admin
export * from "./adminApi";

// Axios instance (for custom requests)
export { default as API } from "./axiosInstance";
