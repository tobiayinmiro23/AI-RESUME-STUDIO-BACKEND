import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/resume', resumeRoutes);

export default router;