import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import providerModel from "../models/providerModel.js";
import appointmentModel from "../models/appointmentModel.js";
import validator from "validator";


// API to get all doctors list for Frontend
const providerList = async (req, res) => {
    try {

        const providers = await providerModel.find({}).select(['-password', '-email'])
        res.json({ success: true, providers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for provider Login 
const loginProvider = async (req, res) => {

    try {

        const { email, password } = req.body
        const provider = await providerModel.findOne({ email })

        if (!provider) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, provider.password)

        if (isMatch) {
  const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET)
  res.json({ 
    success: true, 
    token, 
    
  })
}
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API TO GET PROVIDER'S APPOINTMENTS 
const appointmentsOfProvider = async (req, res) => {
    try {

        const { proid } = req.body
        const appointments = await appointmentModel.find({ proid })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to mark appointment completed for provider panel
const appointmentComplete = async (req, res) => {
    try {

        const { proid, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.proid === proid) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for provider panel
const providerDashboard = async (req, res) => {
    try {

        const { proid } = req.body

        const appointments = await appointmentModel.find({ proid })

        let users = []  // to get unique users

        appointments.map((item) => {
            if (!users.includes(item.userId)) {
                users.push(item.userId)
            }
        })
        const dashData = {
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0, 10)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get provider profile data

const providerProfile = async (req, res) => {
    try {

        const { proid } = req.body
        const profileData = await providerModel.findById(proid).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { providerList, loginProvider, appointmentsOfProvider, appointmentComplete, providerDashboard, providerProfile };