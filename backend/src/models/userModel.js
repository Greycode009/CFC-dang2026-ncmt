import {DataTypes} from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
    "User", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Role: {
            type: DataTypes.ENUM("patient", "institution", "admin"),
            defaultValue: "patient",
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

export default User;