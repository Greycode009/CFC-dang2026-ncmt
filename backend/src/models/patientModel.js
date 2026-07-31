import {DataTypes} from "sequelize";
import { sequelize } from "../config/database.js";

const Patient = sequelize.define(
    "Patient", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: false
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        bloodGroup: {
            type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
            allowNull: false
        },
        allergies: {
            type: DataTypes.STRING,
            allowNull: true
        },
        chronicConditions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        curretMedications: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emergencyContactName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emergencyContactNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: true
    }
)

export default Patient;