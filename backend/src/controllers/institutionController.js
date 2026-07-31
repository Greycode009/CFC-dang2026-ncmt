import { where } from "sequelize"
import Institution from "../models/institutionModel"
import User from "../models/userModel"


async function getInstitutionProfile(req, res) {
    try {
        const institution = await User.findOne({
            where: {
                id: req.user.id
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
        const { fullName, email, phoneNumber, institutionType, registrationNumber, province, district, municipality, fullAddress, department, services, openingTime, closingTime, beds, noOfDoctor, authPersonName, authPersonNumber } = req.body
        const user = await User.findByPk(req.user.id)
        const institution = await User.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!user || !institution) {
            return res.status(404).json({
                message: "Institution not found"
            })
        }

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

        if (institutionType) {
            institution.institutionType = institutionType
        }

        if (registrationNumber) {
            institution.registrationNumber = registrationNumber
        }

        if (province) {
            institution.province = province
        }

        if (district) {
            institution.district = district
        }

        if (municipality) {
            institution.municipality = municipality
        }

        if (fullAddress) {
            institution.fullAddress = fullAddress
        }

        if (department) {
            institution.department = department
        }

        if (services) {
            institution.services = services
        }

        if (openingTime) {
            institution.openingTime = openingTime
        }

        if (closingTime) {
            institution.closingTime = closingTime
        }

        if (beds !== undefined) {
            institution.beds = beds
        }

        if (noOfDoctor !== undefined) {
            institution.noOfDoctor = noOfDoctor
        }

        if (authPersonName) {
            institution.authPersonName = authPersonName
        }

        if (authPersonNumber) {
            institution.authPersonNumber = authPersonNumber
        }

        institution.profileCompleted =
            !!institution.institutionType &&
            !!institution.registrationNumber &&
            !!institution.province &&
            !!institution.district &&
            !!institution.municipality &&
            !!institution.openingTime &&
            !!institution.closingTime &&
            !!institution.authPersonName &&
            !!institution.authPersonNumber;

        await institution.save()

        return res.status(200).json({
            message: "Institution profile updated successfully",
            institution
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