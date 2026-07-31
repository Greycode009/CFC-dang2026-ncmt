import { Sequelize } from "sequelize";
import { envConfig } from "./config.js";

const sequelize = new Sequelize(envConfig.connectionString, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

sequelize.sync({ force: false, alter: true }).then(() => {
    console.log("All models were synchronized successfully.")
}).catch((error) => {
    console.error("Error synchronizing models:", error)
})

export { 
    sequelize, 
    connectDB 
}