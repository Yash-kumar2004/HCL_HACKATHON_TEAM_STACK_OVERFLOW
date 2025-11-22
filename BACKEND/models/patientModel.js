import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        default: 'Not Selected'
    },
    phone: {
        type: Number
    },
    address: {
        type: String,

    },
    dob: {
        type: String,
        default: 'Not Selected'
    },
    sleep_goals:{
        type: String,
        default: ''
    },
    walking_goals:{
        type: String,
        default: ''
    },
    water_goals:{
        type: String,
        default: ''
    }
}, { minimize: false }
)
const patientModel = mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
export default patientModel;
