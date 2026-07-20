import express from "express";
import authController from "../controller/authController";
const authRoutes = express.Router()

authRoutes.post('/signup', authController.SignUpController)
authRoutes.post('/signin', authController.SignInController)
authRoutes.post('/verify-otp', authController.VerifyOtpController)
authRoutes.post('/resend-otp', authController.ResendOtpController)

export default authRoutes;