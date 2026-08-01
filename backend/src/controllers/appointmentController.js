import Appointment from "../models/appointmentModel.js";
import Institution from "../models/institutionModel.js";
import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";



async function bookAppointment(req, res) {
    try {
        const { institutionId, appointmentDate, appointmentTime, reason } = req.body;

        if (!institutionId || !appointmentDate || !appointmentTime || !reason) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found."
            });
        }

        if (!patient.profileCompleted) {
            return res.status(400).json({
                message: "Complete your profile before booking an appointment."
            });
        }

        const institution = await Institution.findByPk(institutionId);

        if (!institution) {
            return res.status(404).json({
                message: "Institution not found."
            });
        }

        if (institution.verificationStatus !== "verified") {
            return res.status(400).json({
                message: "Institution is not verified."
            });
        }

        const appointment = await Appointment.create({
            patientId: patient.id,
            institutionId: institution.id,
            appointmentDate,
            appointmentTime,
            reason,
            status: "pending"
        });

        return res.status(201).json({
            message: "Appointment booked successfully.",
            appointment
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function getMyAppointments(req, res) {
    try {
        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient profile not found."
            });
        }

        const appointments = await Appointment.findAll({
            where: {
                patientId: patient.id
            },
            include: [
                {
                    model: Institution,
                    include: [
                        {
                            model: User,
                            attributes: [
                                "fullName",
                                "phoneNumber"
                            ]
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json({
            appointments
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function getInstitutionAppointments(req, res) {
    try {
        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!institution) {
            return res.status(404).json({
                message: "Institution profile not found."
            });
        }

        const appointments = await Appointment.findAll({
            where: {
                institutionId: institution.id
            },
            include: [
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                            attributes: [
                                "fullName",
                                "phoneNumber"
                            ]
                        }
                    ]
                }
            ],
            order: [["appointmentDate", "ASC"]]
        });
        return res.status(200).json({
            appointments
        });
    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function acceptAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (appointment.institutionId !== institution.id) {
            return res.status(403).json({
                message: "You are not authorized to manage this appointment."
            });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only pending appointments can be accepted."
            });
        }

        appointment.status = "accepted";

        await appointment.save();
        return res.status(200).json({
            message: "Appointment accepted.",
            appointment
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function rejectAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (appointment.institutionId !== institution.id) {
            return res.status(403).json({
                message: "You are not authorized to manage this appointment."
            });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only pending appointments can be rejected."
            });
        }

        appointment.status = "rejected";

        await appointment.save();
        return res.status(200).json({
            message: "Appointment rejected.",
            appointment
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function cancelAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        const patient = await Patient.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (appointment.patientId !== patient.id) {
            return res.status(403).json({
                message: "You are not authorized to cancel this appointment."
            });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only accepted appointments can be cancelled."
            });
        }

        appointment.status = "cancelled";

        await appointment.save();
        return res.status(200).json({
            message: "Appointment cancelled.",
            appointment
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

async function completeAppointment(req, res) {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        const institution = await Institution.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (appointment.institutionId !== institution.id) {
            return res.status(403).json({
                message: "You are not authorized to manage this appointment."
            });
        }

        if (appointment.status !== "accepted") {
            return res.status(400).json({
                message: "Only accepted appointments can be completed."
            });
        }

        appointment.status = "completed";

        await appointment.save();
        return res.status(200).json({
            message: "Appointment completed.",
            appointment
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}


export {
    bookAppointment,
    getMyAppointments,
    getInstitutionAppointments,
    acceptAppointment,
    rejectAppointment,
    cancelAppointment,
    completeAppointment
}