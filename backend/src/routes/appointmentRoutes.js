import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import { bookAppointment, getMyAppointments, getInstitutionAppointments, acceptAppointment, rejectAppointment, cancelAppointment, completeAppointment, getBookedSlots } from "../controllers/appointmentController.js";

const appointmentRoute = express.Router();

appointmentRoute.get("/booked-slots", getBookedSlots);
appointmentRoute.post("/", isAuthenticated, authorize("patient"), bookAppointment);
appointmentRoute.get("/my", isAuthenticated, authorize("patient"), getMyAppointments);
appointmentRoute.patch("/:id/cancel", isAuthenticated, authorize("patient"), cancelAppointment);
appointmentRoute.get("/institution", isAuthenticated, authorize("institution"), getInstitutionAppointments);
appointmentRoute.patch("/:id/accept", isAuthenticated, authorize("institution"), acceptAppointment);
appointmentRoute.patch("/:id/reject", isAuthenticated, authorize("institution"), rejectAppointment);
appointmentRoute.patch("/:id/complete", isAuthenticated, authorize("institution"), completeAppointment);

export default appointmentRoute;