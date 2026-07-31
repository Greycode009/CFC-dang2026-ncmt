import Patient from "../models/patientModel.js"
import User from "../models/userModel.js"



async function getPatientProfile(req, res) {
    try {
        const patientId = req.user.id

        const patient = await User.findByPk(patientId, {
            include: Patient
        })

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            })
        }

        return res.status(200).json({
            message: "Patient profile fetched successfully",
            patient: {
                id: patient.id,
                fullName: patient.fullName,
                email: patient.email,
                phoneNumber: patient.phoneNumber,
            }
        })


    } catch (error) {
        console.error("Error fetching patient profile:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function updatePatientProfile(req, res) {
    try {
        const patientId = req.user.id
        const { fullName, email, phoneNumber, password } = req.body

        const patient = await User.findByPk(patientId)

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            })
        }

        if (fullName) {
            patient.fullName = fullName
        }

        if (email) {
            patient.email = email
        }

        if (phoneNumber) {
            patient.phoneNumber = phoneNumber
        }

        await patient.save()

        return res.status(200).json({
            message: "Patient profile updated successfully",
            patient: {
                id: patient.id,
                fullName: patient.fullName,
                email: patient.email,
                phoneNumber: patient.phoneNumber,
            }
        })

    } catch (error) {
        console.error("Error updating patient profile:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



export {
    getPatientProfile,
    updatePatientProfile
}