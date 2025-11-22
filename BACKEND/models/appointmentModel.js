import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String,
         required: true },  // yeh frontend me req h
    proid: { type: String, 
        required: true },          // yeh frontend me req h
    slotDate: { type: String, 
        required: true },         // yeh frontend me req h
    slotTime: { type: String,
         required: true },         // yeh frontend me req h
    userData: { type: Object, 
        required: true },
    pData: { type: Object, 
        required: true },
    date: { type: Number,
         required: true },
    isCompleted: { type: Boolean,
         default: false }
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel