import express from "express";

import { getVerifiedHospitals, searchHospitals, getHospitalDetails } from "../controllers/hospitalController.js";

const hospitalRoute = express.Router();
hospitalRoute.get("/", getVerifiedHospitals);
hospitalRoute.get("/search", searchHospitals);
hospitalRoute.get("/:id", getHospitalDetails);

export default hospitalRoute;