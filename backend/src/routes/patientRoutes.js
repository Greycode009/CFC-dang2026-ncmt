import express from "express"
import isAuthenticated from "../middleware/authMiddleware.js";
import { getPatientProfile, updatePatientProfile } from "../controllers/patientController.js";
import authorize from "../middleware/roleMiddleware.js";


const patientRoute = express.Router();

patientRoute.get("/profile", isAuthenticated, authorize("patient"), getPatientProfile)
patientRoute.patch("/profile", isAuthenticated, authorize("patient"), updatePatientProfile)

export default patientRoute