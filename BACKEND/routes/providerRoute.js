import express from 'express';
import { providerList, loginProvider, appointmentsOfProvider, appointmentComplete, providerDashboard, providerProfile } from '../controllers/providerController.js';
import authProvider from '../middlewares/authProvider.js';
const providerRouter = express.Router();
providerRouter.get("/list",providerList)
providerRouter.post('/login',loginProvider)
providerRouter.get('/appointments',authProvider,appointmentsOfProvider)
providerRouter.post('/finish',authProvider,appointmentComplete)
providerRouter.get('/dashboard',authProvider,providerDashboard)
providerRouter.get('/profile',authProvider,providerProfile)
export default providerRouter