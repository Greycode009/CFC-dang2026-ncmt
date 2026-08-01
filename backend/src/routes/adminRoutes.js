import express from "express"
import authorize from "../middleware/roleMiddleware.js"
import isAuthenticated from "../middleware/authMiddleware.js"
import {
  getAllInstitutions,
  getPendingInstitutions,
  rejectInstitution,
  verifyInstitution
} from "../controllers/adminController.js"

const adminRoute = express.Router()

adminRoute.get("/institutions", isAuthenticated, authorize("admin"), getAllInstitutions)
adminRoute.get("/institutions/pending", isAuthenticated, authorize("admin"), getPendingInstitutions)
adminRoute.patch("/institutions/:id/verify", isAuthenticated, authorize("admin"), verifyInstitution)
adminRoute.patch("/institutions/:id/reject", isAuthenticated, authorize("admin"), rejectInstitution)

export default adminRoute