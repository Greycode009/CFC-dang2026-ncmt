import API from "./axiosInstance";

/**
 * Appointments API — /api/appointments
 * 5.1 Book Appointment                — POST  /api/appointments              (private: patient)
 * 5.2 Get Patient's Appointments      — GET   /api/appointments/my           (private: patient)
 * 5.3 Cancel Appointment (Patient)    — PATCH /api/appointments/:id/cancel   (private: patient)
 * 5.4 Get Institution's Appointments  — GET   /api/appointments/institution  (private: institution)
 * 5.5 Accept Appointment (Institution)— PATCH /api/appointments/:id/accept   (private: institution)
 * 5.6 Reject Appointment (Institution)— PATCH /api/appointments/:id/reject   (private: institution)
 * 5.7 Complete Appointment            — PATCH /api/appointments/:id/complete (private: institution)
 */

// 5.1 Book a new appointment (patient)
export const bookAppointment = async ({ institutionId, appointmentDate, appointmentTime, reason }) => {
  const res = await API.post("/appointments", {
    institutionId,
    appointmentDate,  // "YYYY-MM-DD"
    appointmentTime,  // e.g. "10:30 AM"
    reason,
  });
  return res.data; // { message, appointment: { id, patientId, institutionId, date, time, reason, status } }
};

// 5.2 Get logged-in patient's appointments
export const getMyAppointments = async () => {
  const res = await API.get("/appointments/my");
  return res.data; // { appointments: [...] }
};

// 5.3 Cancel an appointment (patient)
export const cancelAppointment = async (id) => {
  const res = await API.patch(`/appointments/${id}/cancel`);
  return res.data; // { message, appointment }
};

// 5.4 Get all appointments for the logged-in institution
export const getInstitutionAppointments = async () => {
  const res = await API.get("/appointments/institution");
  return res.data; // { appointments: [...] }
};

// 5.5 Accept an appointment (institution)
export const acceptAppointment = async (id) => {
  const res = await API.patch(`/appointments/${id}/accept`);
  return res.data; // { message, appointment }
};

// 5.6 Reject an appointment (institution)
export const rejectAppointment = async (id) => {
  const res = await API.patch(`/appointments/${id}/reject`);
  return res.data; // { message, appointment }
};

// 5.7 Mark appointment as completed (institution)
export const completeAppointment = async (id) => {
  const res = await API.patch(`/appointments/${id}/complete`);
  return res.data; // { message, appointment }
};

// 5.8 Fetch booked slots for facility and date
export const fetchBookedSlots = async (institutionId, date) => {
  const res = await API.get("/appointments/booked-slots", {
    params: { institutionId, date }
  });
  return res.data; // { bookedTimes: ["08:00 AM", ...] }
};
