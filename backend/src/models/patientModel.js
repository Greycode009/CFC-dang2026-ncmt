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
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        bloodGroup: {
            type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
            allowNull: true
        },
        allergies: {
            type: DataTypes.STRING,
            allowNull: true
        },
        chronicConditions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currentMedications: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emergencyContactName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emergencyContactNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, 
    {
        timestamps: true
    }
)

export default Patient;