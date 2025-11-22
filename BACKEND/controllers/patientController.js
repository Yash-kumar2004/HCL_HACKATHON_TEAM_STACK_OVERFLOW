import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import providerModel from "../models/providerModel.js";
import appointmentModel from "../models/appointmentModel.js";
import validator from "validator";

// API TO REGISTER USER

const registerUser=async (req,res)=>{
try {
    const {name,email,password}=req.body
      // checking for all data to register user
      if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' })
    }
    // validating email format
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" })
    }
      // validating strong password
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" })
    }
     // hashing user password
     const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
     const hashedPassword = await bcrypt.hash(password, salt)
     const userData = {
        name,
        email,
        password: hashedPassword,
    }
    const newUser = new patientModel(userData)
    const user = await newUser.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    
    res.json({ success: true, token })
} 
catch (error) {
    console.log(error)
        res.json({ success: false, message: error.message })
}
}

// API TO LOGIN USER
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await patientModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;  // ✔ From middleware
        const userData = await patientModel.findById(userId).select("-password");

        res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            name,
            phone,
            address,
            dob,
            gender,
            sleep_goals,
            walking_goals,
            water_goals
        } = req.body;

        await patientModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address,
            dob,
            gender,
            sleep_goals,
            walking_goals,
            water_goals
        });

        res.json({ success: true, message: 'Profile Updated' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to book appointment 
const bookAppointment = async (req, res) => {
    try {
        
        const userId = req.userId;  // ✔ Correct
        const { proid, slotDate, slotTime } = req.body;

        const pData = await providerModel.findById(proid).select("-password");

        let slots_booked = pData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await patientModel.findById(userId).select("-password");

        delete pData.slots_booked;

        const appointmentData = {
            userId,
            proid,
            userData,
            pData,
            slotTime,
            slotDate,
            date: Date.now()
        };

        await new appointmentModel(appointmentData).save();
        await providerModel.findByIdAndUpdate(proid, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user's all appointments for frontend my-appointments 
const listOfAppointments = async (req, res) => {
    try {
        
        const userId = req.userId;   // ✔ Get from middleware

        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listOfAppointments }