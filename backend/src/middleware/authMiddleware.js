import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js";
import User from "../models/userModel.js";

async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const decodedToken = jwt.verify(token, envConfig.jwtSecret);
        const user = await User.findByPk(decodedToken.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }
        req.user = {
            id: user.id,
            role: user.role,
            email: user.email
        };
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default isAuthenticated;