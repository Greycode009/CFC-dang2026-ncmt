import express from "express"
import authRouter from "./routes/authRoutes.js"
import patientRoute from "./routes/patientRoutes.js"
import institutionRoute from "./routes/institutionRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import hospitalRoute from "./routes/hospitalRoutes.js"
import path from "path";
import medicalRecordRoute from "./routes/medicalRecordRoutes.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    "/uploads",
    express.static(path.resolve("uploads"))
);

app.use("/api/auth", authRouter)
app.use("/api/patients", patientRoute)
app.use("/api/institutions", institutionRoute)
app.use("/api/admin", adminRoute)
app.use("/api/hospitals", hospitalRoute);
app.use("/api/medical-records", medicalRecordRoute);

export default app