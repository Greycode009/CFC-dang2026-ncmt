import express from "express";

import isAuthenticated from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import uploadMedicalRecordMiddleware from "../middleware/uploadMedicalRecord.js";

import { uploadMedicalRecord, getMyMedicalRecords, updateMedicalRecord, deleteMedicalRecord, getPatientMedicalRecords } from "../controllers/medicalRecordController.js";

const medicalRecordRoute = express.Router();
medicalRecordRoute.post("/", isAuthenticated, authorize("patient"), uploadMedicalRecordMiddleware.single("medicalRecord"), uploadMedicalRecord);
medicalRecordRoute.get("/my", isAuthenticated, authorize("patient"), getMyMedicalRecords);
medicalRecordRoute.patch("/:id", isAuthenticated, authorize("patient"), updateMedicalRecord);
medicalRecordRoute.delete("/:id", isAuthenticated, authorize("patient"), deleteMedicalRecord);
medicalRecordRoute.get("/patient/:patientId",isAuthenticated, authorize("institution"), getPatientMedicalRecords);

export default medicalRecordRoute;