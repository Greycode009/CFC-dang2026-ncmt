import { envConfig } from "../config/config.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


async function register(req, res) {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const existingUser = await User.findOne({
            where:
            {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const allowedRoles = ["patient", "institution"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Only patient and institution registration is allowed."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, envConfig.jwtSecret, {
            expiresIn: envConfig.jwtExpiresIn
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, envConfig.jwtSecret, {
        expiresIn: envConfig.jwtExpiresIn
    });

    res.status(200).json({
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }
    });
}

export {
    register,
    login
}