import express from "express";
import authController from "../controller/authController";
const authRoutes = express.Router()
import { loginLimiter, otpLimiter } from "../middleware/rateLimiter";

authRoutes.post('/signup', authController.SignUpController)
authRoutes.post('/signin', loginLimiter, authController.SignInController)
authRoutes.post('/reset-password', loginLimiter, authController.ResetPasswordController)
authRoutes.post('/verify-otp', otpLimiter, authController.VerifyOtpController)
authRoutes.post('/resend-otp', otpLimiter, authController.ResendOtpController)

export default authRoutes;