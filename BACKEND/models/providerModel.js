import mongoose from "mongoose";
const ProviderSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    slots_booked: { type: Object, default: {} },   
    date:{
        type:Number,
        required:true
    },
    
}
)
const providerModel=mongoose.models.provider || mongoose.model("provider",ProviderSchema);
export default providerModel