import { Request } from "express";
import bcrypt from "bcrypt";
import {sign} from "../lib/jwt"
import { AppError } from "../utils/appError";
import {signInType,signUpType } from "../types/user"
import authRepository from "../repository/authRepository"
import { generateOtpWithExpiry } from "../utils/otp";
import emailService from "../lib/email/nodemailer/sendEmail";
// import emailService from "../lib/email/emailjs/sendEmail";

class AuthService {
    async SignUp(req: Request ): Promise<signUpType> {
            const { email, password } = req.body;
            const user = await authRepository.findUserByEmail(email);
            if (user) throw new AppError("User already exists", 409);
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
            // otp
            const { code , expiresAt } = generateOtpWithExpiry();
             console.log("Generated OTP:", code); // generated OTP for debugging
            const codeHash = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 10);
            const name=email.split("@")[0]
            await emailService.sendOtpEmail(email,name,code)
            // transaction needs to start here
            await authRepository.createOtp(email, codeHash, expiresAt);
            await authRepository.createUser(email, hashedPassword);
            // and end here
            let data: signUpType ={ message: "Enter otp to complete signup", success: true };
            return data;
    }
     async SignIn(req: Request): Promise<signInType> {
            const { email, password } = req.body;
            const user = await authRepository.findUserByEmail(email);
            if (!user) throw new AppError("Invalid credentials", 404); 
            const isMatch =await bcrypt.compare(password, user?.password);
            if (!isMatch) throw new AppError("Invalid credentials", 404);  
            if (!user.verified) throw new AppError("User is not verified", 403);
            let accessToken = sign({ userId: user._id.toString(), email: user.email},"30d");
             let data: signInType ={ message: {
                email: user.email,
                id: user._id.toString(),
                accessToken: accessToken.message as string
            }, success: true };
            return data;
    }
    async ResetPassword(req: Request): Promise<signUpType> {
        const { email, password } = req.body;
        const user = await authRepository.findUserByEmail(email);
        if (!user) throw new AppError("Email not found", 404);
        if (String(user?._id) !== req.userId) throw new AppError("Unauthorized request", 401);
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
        await authRepository.updatePasswordByEmail(email, hashedPassword);
        return { message: "Password reset successful", success: true };
    }
    async VerifyOtp(req: Request): Promise<signUpType> {
        const { email, otp, reason } = req.body;
        if  (reason !== "signup" && reason !== "reset-password") throw new AppError("Invalid otp request", 400);
        const otpRecord = await authRepository.findOtpByEmail(email);
        if (!otpRecord) throw new AppError("User does not exist", 404);
        if (new Date() > otpRecord.expiresAt) throw new AppError("OTP has expired", 400);
        const isMatch = await bcrypt.compare(otp, otpRecord.codeHash);
        if (!isMatch) throw new AppError("Invalid OTP", 400);
        if (reason === "signup") {
            const name=email.split("@")[0]
            await emailService.sendWelcomeEmail(email,name)
            await authRepository.markUserVerified(email);
        } else if (reason === "reset-password") return { message: "password reset request approved", success: true };
        await authRepository.deleteOtpByEmail(email);
        return { message: "OTP verified successfully", success: true };

    }
    async ResendOtp(req: Request): Promise<signUpType> {
        const { email, reason } = req.body;
        if  (reason !== "signup" && reason !== "reset-password") throw new AppError("Invalid otp request", 400);
        console.log(req.userId);
        const user = await authRepository.findUserByEmail(email);
        if (!user) throw new AppError("User not found", 404);
        if (reason === "signup" && user.verified) throw new AppError("User is already verified", 400);
        const { code , expiresAt } = generateOtpWithExpiry();
        console.log("Generated OTP:", code); // generated OTP for debugging
        const codeHash = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 10);
        const name=email.split("@")[0]
        await emailService.sendOtpEmail(email,name,code)
        await authRepository.updateOtpByEmail(email, codeHash, expiresAt);
        return { message: "OTP sent successfully", success: true };
    }
}

const authService = new AuthService();

export default authService;