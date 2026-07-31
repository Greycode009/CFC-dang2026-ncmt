import { config } from "dotenv";
config()

export const envConfig = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTIONSTRING,
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminConfirmPassword: process.env.ADMIN_CONFIRM_PASSWORD,
    adminFullName: process.env.ADMIN_FULLNAME,
    adminPhone: process.env.ADMIN_PHONE,
}