import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { envConfig } from "../config/config.js";

async function seedAdmin() {
    try {
        const existingAdmin = await User.findOne({
            where: {
                email: envConfig.adminEmail
            }
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(envConfig.adminPassword, 10);

        await User.create({
            fullName: envConfig.adminFullName,
            email: envConfig.adminEmail,
            phoneNumber: envConfig.adminPhone,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin account created.");
    } catch (error) {
        console.error("Admin seeding failed:", error);
    }
}

export default seedAdmin;