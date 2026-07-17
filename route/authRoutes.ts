import express, { Application, Request, Response, NextFunction } from "express";
import authController from "../controller/authController";
const authRoutes = express.Router()

authRoutes.post('/signin', authController.SigninController)

export default authRoutes;