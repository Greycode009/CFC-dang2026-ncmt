import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Symptom = sequelize.define(
    "Symptom",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        symptoms: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },

        severity: {
            type: DataTypes.ENUM(
                "mild",
                "moderate",
                "severe"
            ),
            allowNull: false
        },

        additionalNotes: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: true
    }
);


export default Symptom;