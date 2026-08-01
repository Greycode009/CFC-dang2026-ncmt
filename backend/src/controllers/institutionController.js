import { Op } from "sequelize"
import Institution from "../models/institutionModel.js"
import User from "../models/userModel.js"


async function getInstitutionProfile(req, res) {
    try {
        const institution = await Institution.findOne({
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

        if (!institution) {
            return res.status(404).json({
                message: "Institution not found"
            })
        }

        return res.status(200).json({
            message: "Institution profile fetched successfully",
            institution
        })
    } catch (error) {
        console.error("Error fetching institution profile:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function updateInstitutionProfile(req, res) {
    try {
        const { fullName, email, phoneNumber, institutionType, registrationNumber, province, district, municipality, fullAddress, department, services, openingTime, closingTime, beds, noOfDoctor, authPersonName, authPersonNumber, registrationFee, availableTimeSlots } = req.body
        const user = await User.findByPk(req.user.id)
        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!user || !institution) {
            return res.status(404).json({
                message: "Institution not found"
            })
        }

        if (email || phoneNumber) {

            const conditions = [];

            if (email) {
                conditions.push({ email });
            }

            if (phoneNumber) {
                conditions.push({ phoneNumber });
            }

            const existingUser = await User.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: conditions
                        },
                        {
                            id: {
                                [Op.ne]: req.user.id
                            }
                        }
                    ]
                }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email or phone number already exists."
                });
            }
        }

        if (fullName !== undefined) {
            user.fullName = fullName
        }

        if (email !== undefined) {
            user.email = email
        }

        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber
        }
        await user.save()

        if (institutionType !== undefined) {
            institution.institutionType = institutionType
        }

        if (registrationNumber !== undefined) {
            institution.registrationNumber = registrationNumber
        }

        if (province !== undefined) {
            institution.province = province
        }

        if (district !== undefined) {
            institution.district = district
        }

        if (municipality !== undefined) {
            institution.municipality = municipality
        }

        if (fullAddress !== undefined) {
            institution.fullAddress = fullAddress
        }

        if (department !== undefined) {
            institution.department = department
        }

        if (services !== undefined) {
            institution.services = services
        }

        if (openingTime !== undefined) {
            institution.openingTime = openingTime
        }

        if (closingTime !== undefined) {
            institution.closingTime = closingTime
        }

        if (beds !== undefined) {
            institution.beds = beds
        }

        if (noOfDoctor !== undefined) {
            institution.noOfDoctor = noOfDoctor
        }

        if (authPersonName !== undefined) {
            institution.authPersonName = authPersonName
        }

        if (authPersonNumber !== undefined) {
            institution.authPersonNumber = authPersonNumber
        }

        if (registrationFee !== undefined) {
            institution.registrationFee = registrationFee
        }

        if (availableTimeSlots !== undefined) {
            institution.availableTimeSlots = availableTimeSlots
        }

        institution.profileCompleted =
            !!institution.institutionType &&
            !!institution.registrationNumber &&
            !!institution.province &&
            !!institution.district &&
            !!institution.municipality &&
            !!institution.authPersonName &&
            !!institution.authPersonNumber;

        await institution.save()

        return res.status(200).json({
            message: "Institution profile updated successfully",
            institution,
            user
        })
    } catch (error) {
        console.error("Error updating institution profile:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function requestVerification(req, res) {
    try {
        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!institution) {
            return res.status(404).json({
                message: "Institution not found."
            });
        }

        if (!institution.profileCompleted) {
            return res.status(400).json({
                message: "Complete your profile before requesting verification."
            });
        }

        if (institution.verificationStatus === "pending") {
            return res.status(400).json({
                message: "Verification request is already pending."
            });
        }

        if (institution.verificationStatus === "verified") {
            return res.status(400).json({
                message: "Institution is already verified."
            });
        }

        institution.verificationStatus = "pending";

        await institution.save();

        return res.status(200).json({
            message: "Verification request submitted successfully."
        });

    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({
            message: "Internal server error."
        });

    }

}


export {
    getInstitutionProfile,
    updateInstitutionProfile,
    requestVerification
}