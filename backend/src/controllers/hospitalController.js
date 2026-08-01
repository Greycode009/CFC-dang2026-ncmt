import Institution from "../models/institutionModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

async function getVerifiedHospitals(req, res) {
    try {
        const hospitals = await Institution.findAll({
            where: {
                verificationStatus: "verified"
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
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json({
            hospitals
        });
    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function searchHospitals(req, res) {
    try {
        const { district, municipality, department, services } = req.query;
        if (district) {
            where.district = district;
        }
        if (municipality) {
            where.municipality = municipality;
        }
        if (department) {
            where.department = {
                [Op.iLike]: `%${department}%`
            };
        }
        if (services) {
            where.services = {
                [Op.iLike]: `%${services}%`
            };
        }
        const hospitals = await Institution.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ["fullName", "email", "phoneNumber"]
                    }
                ]
            }
        )
        return res.status(200).json({
            count: hospitals.length,
            hospitals
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function getHospitalDetails(req, res) {
    try {
        const hospital = await Institution.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: User,
                        attributes: [
                            "fullName",
                            "email",
                            "phoneNumber"
                        ]
                    }
                ]
            }
        );
        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found."
            });
        }
        return res.status(200).json({
            hospital
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}



export {
    getVerifiedHospitals,
    searchHospitals,
    getHospitalDetails
};

