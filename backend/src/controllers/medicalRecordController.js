import MedicalRecord from "../models/medicalRecordModel.js";
import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";

async function uploadMedicalRecord(req, res) {
    try {
        const { title, recordType, description } = req.body;
        if (!title || !recordType || !req.file) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });
        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found."
            });
        }
        const record = await MedicalRecord.create({
            patientId: patient.id,
            title,
            recordType,
            description,
            fileUrl: req.file.path
        });
        return res.status(201).json({
            message: "Medical record uploaded successfully.",
            record
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function getMyMedicalRecords(req, res) {
    try {
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found."
            });
        }

        const records = await MedicalRecord.findAll({
            where: {
                patientId: patient.id
            },
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json({
            records
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function deleteMedicalRecord(req, res) {
    try {
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        const record = await MedicalRecord.findByPk(req.params.id);

        if (!record) {
            return res.status(404).json({
                message: "Medical record not found."
            });
        }

        if (record.patientId !== patient.id) {
            return res.status(403).json({
                message: "Unauthorized."
            });
        }

        await record.destroy();

        return res.status(200).json({
            message: "Medical record deleted successfully."
        });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export {
    uploadMedicalRecord,
    getMyMedicalRecords,
    deleteMedicalRecord,
};