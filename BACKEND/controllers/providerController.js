import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import providerModel from "../models/providerModel.js";
import appointmentModel from "../models/appointmentModel.js";
import validator from "validator";

// API to get provider's appointments
const appointmentsOfProvider = async (req, res) => {
    try {
        const providerId = req.providerId;
        const appointments = await appointmentModel.find({ proid: providerId });
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to mark appointment completed
const appointmentComplete = async (req, res) => {
    try {
        const providerId = req.providerId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.proid == providerId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        }

        res.json({ success: false, message: "Appointment Cancelled" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API for provider dashboard
const providerDashboard = async (req, res) => {
    try {
        const providerId = req.providerId;
        const appointments = await appointmentModel.find({ proid: providerId });

        let users = [];

        appointments.forEach(a => {
            if (!users.includes(a.userId)) users.push(a.userId);
        });

        res.json({
            success: true,
            dashData: {
                appointments: appointments.length,
                users: users.length,
                latestAppointments: appointments.reverse().slice(0, 10)
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to get provider profile
const providerProfile = async (req, res) => {
    try {
        const providerId = req.providerId;
        const profileData = await providerModel.findById(providerId).select("-password");
        res.json({ success: true, profileData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { providerList, loginProvider, appointmentsOfProvider, appointmentComplete, providerDashboard, providerProfile };