import {sequelize} from "../config/database.js";
import User from "./userModel.js";
import Patient from "./patientModel.js";
import Institution from "./institutionModel.js";


Patient.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Patient, { foreignKey: "userId" });

Institution.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Institution, { foreignKey: "userId" })