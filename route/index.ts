import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
import emailService from "../lib/email/sendEmail";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
router.use('/api/v1/welcome-email', ()=>{
    emailService.sendEmail("tobicollins15@gmail.com","tobi")
});

export default router;