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

// 6. Admin
export * from "./adminApi";

// 7. Symptoms & AI Triage
export * from "./symptomsApi";

// Axios instance (for custom requests)
export { default as API } from "./axiosInstance";
