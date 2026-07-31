import express from "express"
import authRouter from "./routes/authRoutes.js"
import patientRoute from "./routes/patientRoutes.js"
import institutionRoute from "./routes/institutionRoutes.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)
app.use("/api/patients", patientRoute)
app.use("/api/institutions", institutionRoute)

export default app