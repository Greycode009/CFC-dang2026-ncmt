import express from "express"
import isAuthenticated from "../middleware/authMiddleware.js"
import { getInstitutionProfile, requestVerification, updateInstitutionProfile } from "../controllers/institutionController.js"
import authorize from "../middleware/roleMiddleware.js"

const insitutionRoute = express.Router()

insitutionRoute.get("/profile", isAuthenticated, authorize("institution"), getInstitutionProfile)
insitutionRoute.patch("/profile", isAuthenticated, authorize("institution"), updateInstitutionProfile)
insitutionRoute.post("/request-verification", isAuthenticated, authorize("institution"), requestVerification)

export default insitutionRoute