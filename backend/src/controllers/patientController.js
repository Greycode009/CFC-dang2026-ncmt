import { Op } from "sequelize"
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
                        "fullName",
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
        const { fullName, email, phoneNumber, age, gender, height, weight, bloodGroup, allergies, chronicConditions, currentMedications, emergencyContactName, emergencyContactNumber, address } = req.body
        const user = await User.findByPk(req.user.id)
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!user || !patient) {
            return res.status(404).json({
                message: "Patient profile not found"
            })
        }

        if (email || phoneNumber) {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        ...(email ? [{ email }] : []),
                        ...(phoneNumber ? [{ phoneNumber }] : [])
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
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        await user.save();

        patient.age = (age !== undefined && age !== null && age !== "" && !isNaN(Number(age))) ? Number(age) : null;
        patient.gender = (gender && ["Male", "Female", "Other"].includes(gender)) ? gender : null;
        patient.height = (height !== undefined && height !== null && height !== "" && !isNaN(Number(height))) ? Number(height) : null;
        patient.weight = (weight !== undefined && weight !== null && weight !== "" && !isNaN(Number(weight))) ? Number(weight) : null;
        patient.bloodGroup = (bloodGroup && ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodGroup)) ? bloodGroup : null;
        patient.allergies = allergies || null;
        patient.chronicConditions = chronicConditions || null;
        patient.currentMedications = currentMedications || null;
        patient.emergencyContactName = emergencyContactName || null;
        patient.emergencyContactNumber = emergencyContactNumber || null;
        patient.address = address || null;

        patient.profileCompleted =
            !!patient.age &&
            !!patient.gender &&
            !!patient.height &&
            !!patient.weight &&
            !!patient.bloodGroup &&
            !!patient.emergencyContactName &&
            !!patient.emergencyContactNumber &&
            !!patient.address;

        await patient.save();

        return res.status(200).json({
            message: "Patient profile updated successfully",
            user,
            patient
        });
    } catch (error) {
        console.error("Error updating patient profile:", error);
        return res.status(500).json({
            message: error.message || "Failed to update patient profile."
        });
    }
}

export {
    getPatientProfile,
    updatePatientProfile
}