import Institution from "../models/institutionModel"


async function getInstitutionProfile(req, res) {
    try {
        const institutionId = req.user.id
        const institution = await User.findByPk(institutionId, {
            include: Institution
        })

        if (!institution) {
            return res.status(404).json({
                message: "Institution not found"
            })
        }

        return res.status(200).json({
            message: "Institution profile fetched successfully",
            institution: {
                id: institution.id,
                fullName: institution.fullName,
                email: institution.email,
                phoneNumber: institution.phoneNumber,
                role: institution.role
            }
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
        const institutionId = req.user.id
        const { fullName, email, phoneNumber, password } = req.body
        const institution = await User.findByPk(institutionId)

        if (!institution) {
            return res.status(404).json({
                message: "Institution not found"
            })
        }

        if (fullName) {
            institution.fullName = fullName
        }

        if (email) {
            institution.email = email
        }

        if (phoneNumber) {
            institution.phoneNumber = phoneNumber
        }

        if (password) {
            institution.password = password
        }

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


export {
    getInstitutionProfile,
    updateInstitutionProfile
}