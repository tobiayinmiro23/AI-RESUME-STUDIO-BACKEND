import express from "express";
import authController from "../controller/authController";
const authRoutes = express.Router()
import { loginLimiter, otpLimiter } from "../middleware/rateLimiter";
import { authMiddleware } from "../middleware/authorization";


authRoutes.post('/signup', authController.SignUpController)
authRoutes.post('/signin', loginLimiter, authController.SignInController)
authRoutes.post('/reset-password', authMiddleware ,loginLimiter, authController.ResetPasswordController)
authRoutes.post('/verify-otp', otpLimiter, authController.VerifyOtpController)
authRoutes.post('/resend-otp', otpLimiter, authMiddleware, authController.ResendOtpController)
authRoutes.post('/refresh',  authController.)

export default authRoutes;