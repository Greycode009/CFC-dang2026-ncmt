import express from "express"
import authRouter from "./routes/authRoutes.js"
import patientRoute from "./routes/patientRoutes.js"
import institutionRoute from "./routes/institutionRoutes.js"
import adminRoute from "./routes/adminRoutes.js"
import hospitalRoute from "./routes/hospitalRoutes.js"
import path from "path";
import appointmentRoute from "./routes/appointmentRoutes.js"
import cors from "cors"
import symptomRoute from "./routes/symptomRoutes.js"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

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
app.use("/api/appointments", appointmentRoute)
app.use("/api/symptoms", symptomRoute);

export default app