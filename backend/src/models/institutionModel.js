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
            allowNull: false
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        municipality: {
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: false
        },
        ClosingTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        beds: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noOfDoctor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        authPersonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authPersonNumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

export default Institution;