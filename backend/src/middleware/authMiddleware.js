import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js";

async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const decodedToken = jwt.verify(token, envConfig.jwtSecret);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default isAuthenticated;