import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
const router = express.Router()

router.use('/api/auth', authRoutes);
router.use('/api/resume', resumeRoutes);

// app.use("/api/ats", atsRoutes);           
export default router;