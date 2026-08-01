import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const MedicalRecord = sequelize.define(
    "MedicalRecord",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        recordType: {
            type: DataTypes.ENUM(
                "Prescription",
                "Lab Report",
                "X-Ray",
                "MRI",
                "CT Scan",
                "Vaccination",
                "Discharge Summary",
                "Other"
            ),
            allowNull: false
        },

        fileUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default MedicalRecord;