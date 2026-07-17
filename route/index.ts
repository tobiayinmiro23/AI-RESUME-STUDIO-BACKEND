import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./authRoutes";
const router = express.Router()

router.use('/api/auth', authRoutes);

export default router;