import express from "express"
import isAuthenticated from "../middleware/authMiddleware.js"
import { getInstitutionProfile, updateInstitutionProfile } from "../controllers/institutionController.js"

const insitutionRoute = express.Router()

insitutionRoute.get("/profile", isAuthenticated, getInstitutionProfile)
insitutionRoute.patch("/profile", isAuthenticated, updateInstitutionProfile)


export default insitutionRoute