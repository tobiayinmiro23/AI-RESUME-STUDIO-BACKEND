import express, { Request, Response } from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
// import emailService from "../lib/email/nodemailer/sendEmail";
import emailService from "../lib/email/emailjs/sendEmail";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
router.use('/api/v1/welcome-email', async (req:Request, res:Response)=>{
});

export default router;