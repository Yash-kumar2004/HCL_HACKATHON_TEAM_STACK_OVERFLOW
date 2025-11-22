import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listOfAppointments } from '../controllers/patientController.js'
import authUser from '../middlewares/authUser.js'
const userRouter = express.Router();
userRouter.post('/register',registerUser)
        userRouter.post('/login',loginUser)
         userRouter.get('/me',authUser,getProfile)
           userRouter.post('/me',authUser,updateProfile)
        userRouter.post('/appointment',authUser,bookAppointment)
        userRouter.get('/appointments',authUser,listOfAppointments)
        export default userRouter;
