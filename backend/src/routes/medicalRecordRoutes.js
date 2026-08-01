import express from "express";

import isAuthenticated from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import uploadMedicalRecordMiddleware from "../middleware/uploadMedicalRecord.js";

import { uploadMedicalRecord, getMyMedicalRecords, deleteMedicalRecord } from "../controllers/medicalRecordController.js";

const medicalRecordRoute = express.Router();
medicalRecordRoute.post("/", isAuthenticated, authorize("patient"), uploadMedicalRecordMiddleware.single("medicalRecord"), uploadMedicalRecord);
medicalRecordRoute.get("/my", isAuthenticated, authorize("patient"), getMyMedicalRecords);
medicalRecordRoute.delete("/:id", isAuthenticated, authorize("patient"), deleteMedicalRecord);

export default medicalRecordRoute;