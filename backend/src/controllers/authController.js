import { envConfig } from "../config/config.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Patient from "../models/patientModel.js";
import Institution from "../models/institutionModel.js";
import { Op } from "sequelize";
import { sequelize } from "../config/database.js";


async function register(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { fullName, email, phoneNumber, password, confirmPassword, role } = req.body;
        if ( !fullName || !email || !phoneNumber || !password || !role ) {
            await transaction.rollback();
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }
        if (!["patient", "institution"].includes(role)) {
            await transaction.rollback();
            return res.status(400).json({
                message: "Invalid role."
            });
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { phoneNumber }
                ]
            }
        });

        if (existingUser) {
            await transaction.rollback();
            return res.status(400).json({
                message: "Email or phone number already exists."
            });
        }

        if (password !== confirmPassword) {
            await transaction.rollback();
            return res.status(400).json({
                message: "Passwords do not match."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                fullName,
                email,
                phoneNumber,
                password: hashedPassword,
                role
            },
            {
                transaction
            }
        );

        if (role === "patient") {
            await Patient.create(
                {
                    userId: user.id,
                    profileCompleted: false
                },
                {
                    transaction
                }
            );
        } else {
            await Institution.create(
                {
                    userId: user.id,
                    profileCompleted: false,
                    verificationStatus: "draft"
                },
                {
                    transaction
                }
            );
        }
        await transaction.commit();

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            envConfig.jwtSecret,
            {
                expiresIn: envConfig.jwtExpiresIn
            }
        );

        return res.status(201).json({
            message: "Registration successful.",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function login(req, res) {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        let profileCompleted = false;

if (user.role === "patient") {
    const patient = await Patient.findOne({
        where: {
            userId: user.id
        }
    });

    profileCompleted = patient?.profileCompleted ?? false;

} else if (user.role === "institution") {

    const institution = await Institution.findOne({
        where: {
            userId: user.id
        }
    });

    profileCompleted = institution?.profileCompleted ?? false;
}

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            envConfig.jwtSecret,
            {
                expiresIn: envConfig.jwtExpiresIn
            }
        );

        return res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profileCompleted
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export {
    register,
    login
}