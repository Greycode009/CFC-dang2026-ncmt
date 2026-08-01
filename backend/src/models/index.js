import {sequelize} from "../config/database.js";
import User from "./userModel.js";
import Patient from "./patientModel.js";
import Institution from "./institutionModel.js";
import Appointment from "./appointmentModel.js";

Patient.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Patient, { foreignKey: "userId" });

Institution.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Institution, { foreignKey: "userId" })

Patient.hasMany(Appointment, { foreignKey: "patientId"})
Appointment.belongsTo(Patient, { foreignKey: "patientId"})

Institution.hasMany(Appointment, { foreignKey: "institutionId"})
Appointment.belongsTo(Institution, { foreignKey: "institutionId"})
