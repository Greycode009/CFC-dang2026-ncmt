import express from "express"
import isAuthenticated from "../middleware/authMiddleware.js";
import { getPatientProfile, updatePatientProfile } from "../controllers/patientController.js";


const patientRoute = express.Router();

patientRoute.get("/profile", isAuthenticated, getPatientProfile)
patientRoute.patch("/profile", isAuthenticated, updatePatientProfile)

export default patientRoute