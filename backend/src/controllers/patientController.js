import Patient from "../models/patientModel.js"
import User from "../models/userModel.js"



async function getPatientProfile(req, res) {
    try {
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "fullnName",
                        "email",
                        "phoneNumber",
                        "role"
                    ]
                }
            ]
        })

        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found"
            })
        }

        return res.status(200).json({
            message: "Patient profile fetched successfully",
            patient
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
        const { fullName, email, phoneNumber, age, gender, height, weight, bloodGroup, allergies, chronicConditions, currentMedications, emergencyContactName, emergencyContactNumber, address} = req.body
        const user = await Patient.findByPk(req.user.id)
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        })

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { phoneNumber }
                ],
                id: {
                    [Op.ne]: req.user.id
                }
            }
        });

        if (existingUser) {
    return res.status(400).json({
        message: "Email or phone number already exists."
    });
}

        if (!user || !patient) {
            return res.status(404).json({
                message: "Patient not found"
            })
        }

        if (fullName) {
            user.fullName = fullName
        }

        if (email) {
            user.email = email
        }

        if (phoneNumber) {
            user.phoneNumber = phoneNumber
        }
        await user.save()

        if (age !== undefined) {
            patient.age = age
        }

        if (gender !== undefined) {
            patient.gender = gender
        }

        if (height !== undefined) {
            patient.height = height
        }

        if (weight !== undefined) {
            patient.weight = weight
        }

        if (bloodGroup) {
            patient.bloodGroup = bloodGroup
        }

        if (allergies !== undefined) {
            patient.allergies = allergies
        }

        if (chronicConditions !== undefined) {
            patient.chronicConditions = chronicConditions
        }

        if (currentMedications !== undefined) {
            patient.currentMedications = currentMedications
        }

        if (emergencyContactName) {
            patient.emergencyContactName = emergencyContactName
        }

        if (emergencyContactNumber) {
            patient.emergencyContactNumber = emergencyContactNumber
        }

        if (address) {
            patient.address = address
        }

        patient.profileCompleted =
            !!patient.age &&
            !!patient.gender &&
            !!patient.height &&
            !!patient.weight &&
            !!patient.bloodGroup &&
            !!patient.emergencyContactName &&
            !!patient.emergencyContactNumber &&
            !!patient.address;
        await patient.save()

        return res.status(200).json({
            message: "Patient profile updated successfully",
            patient
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