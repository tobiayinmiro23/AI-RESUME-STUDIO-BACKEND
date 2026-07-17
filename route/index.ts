import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./authRoutes";
const router = express.Router()

router.use('/api/auth', authRoutes);

// app.use("/api/resume", resumeRoutes);       
// app.use("/api/ats", atsRoutes);           
export default router;