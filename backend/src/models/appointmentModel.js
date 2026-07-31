import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Appointment = sequelize.define(
    "Appointment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        appointmentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        appointmentTime: {
            type: DataTypes.STRING,
            allowNull: false
        },

        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM("pending", "accepted", "rejected", "completed", "cancelled"),
            defaultValue: "pending"
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default Appointment;