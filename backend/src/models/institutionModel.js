import {DataTypes} from "sequelize";
import { sequelize } from "../config/database.js";

const Institution = sequelize.define(
    "Institution", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        institutionType: {
            type: DataTypes.ENUM("hospital", "clinic"),
            allowNull: true
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true
        },
        municipality: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fullAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true
        },
        services: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        openingTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        closingTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        beds: {
            type: DataTypes.STRING,
            allowNull: true
        },
        noOfDoctor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        authPersonName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        authPersonNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        verificationStatus: {
            type: DataTypes.ENUM("pending", "verified", "rejected"),
            defaultValue: "pending"
        }
    },
    {
        timestamps: true
    }
)

export default Institution;