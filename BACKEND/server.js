import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import mongoose from "mongoose";
import userRouter from './routes/patientRoute.js'
import providerRouter from './routes/providerRoute.js'



const app = express();
const port = process.env.PORT || 4000
connectDB()
.then(
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`app is listening at PORT ${process.env.PORT || 8000}`);
  })
)
.catch((error)=>{
  console.log("mongoDB connection error",error);
})
console.log("Connected to DB:", mongoose.connection.name);

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter)
app.use('/api/provider', providerRouter)
app.get('/', (req, res) => {
  res.send("api fetching")
})
