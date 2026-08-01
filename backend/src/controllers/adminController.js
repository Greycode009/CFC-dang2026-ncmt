import Institution from "../models/institutionModel.js";
import User from "../models/userModel.js";

async function getAllInstitutions(req, res) {
    try {
        const institutions = await Institution.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phoneNumber"
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json({
            message: "Institutions fetched successfully.",
            institutions
        });
    } catch (error) {
        console.error("Error fetching institutions:", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function getPendingInstitutions(req, res) {
    try {
        const institutions = await Institution.findAll({
            where: {
                verificationStatus: "pending"
            },
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "fullName",
                        "email",
                        "phoneNumber"
                    ]
                }
            ],
            order: [["createdAt", "ASC"]]
        });

        return res.status(200).json({
            message: "Pending institutions fetched successfully.",
            institutions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function verifyInstitution(req, res) {
    try {
        const institution = await Institution.findByPk(req.params.id);
        if (!institution) {
            return res.status(404).json({
                message: "Institution not found."
            });
        }

        institution.verificationStatus = "verified";

        await institution.save();

        return res.status(200).json({
            message: "Institution verified successfully.",
            institution
        });
    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function rejectInstitution(req, res) {
    try {
        const institution = await Institution.findByPk(req.params.id);
        if (!institution) {
            return res.status(404).json({
                message: "Institution not found."
            });
        }

        institution.verificationStatus = "rejected";

        await institution.save();

        return res.status(200).json({
            message: "Institution rejected successfully.",
            institution
        });
    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export {
    getAllInstitutions,
    getPendingInstitutions,
    verifyInstitution,
    rejectInstitution
}