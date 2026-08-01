import express from "express";
import { symptomChecker } from "../controllers/symptomController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const symptomRoute = express.Router();

symptomRoute.post("/check", isAuthenticated, authorize("patient"), symptomChecker);

export default symptomRoute;