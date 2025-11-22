// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// const connectDB = async ()=>{
//     try {
//      const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//      console.log(`DATABASE CONNECTED || DB HOST : ${connectionInstance.connection.host}`);
     
//     } catch (error) {
//         console.log("error in connecting to the database", error);
//         process.exit(1);
//     }
// }

// export default connectDB;

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { DB_NAME } from "../constants.js";

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const finalUri = `${process.env.MONGODB_URI}/${DB_NAME}`;
//     console.log("Connecting to:", finalUri);

//     const connectionInstance = await mongoose.connect(finalUri);

//     console.log(`DATABASE CONNECTED || DB HOST : ${connectionInstance.connection.host}`);
//     console.log("Connected to DB:", connectionInstance.connection.name);

//   } catch (error) {
//     console.log("error in connecting to the database", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
const connectDB=async ()=>{
    mongoose.connection.on('connected',()=> console.log("database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/HCL_HACKATHON_DB`)
}
export default connectDB