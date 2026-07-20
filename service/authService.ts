import { Request } from "express";
import bcrypt from "bcrypt";
import {sign} from "../lib/jwt"
import { AppError } from "../utils/appError";
import {signInType,signUpType } from "../types/user"
import authRepository from "../repository/authRepository"
import { generateOtpWithExpiry } from "../utils/otp";
import mongoose from "mongoose";

class AuthService {
    async SignUp(req: Request ): Promise<signUpType> {
            const { email, password } = req.body;
            const user = await authRepository.findUserByEmail(email);
            if (user) throw new AppError("User already exists", 409);
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
            await authRepository.createUser(email, hashedPassword);
            // otp
            const { code , expiresAt } = generateOtpWithExpiry(email);
             console.log("Generated OTP:", code); // Log the generated OTP for debugging
            const codeHash = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 10);
            await authRepository.createOtp(email, codeHash, expiresAt);

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
            let token = sign({ userId: user._id.toString(), email: user.email });
             let data: signInType ={ message: {
                email: user.email,
                id: user._id.toString(),
                token: token.message as string
            }, success: true };
            return data;
    }
    async VerifyOtp(req: Request): Promise<signUpType> {
        const { email, otp } = req.body;
        const otpRecord = await authRepository.findOtpByEmail(email);
        if (!otpRecord) throw new AppError("OTP not found", 404);
        if (new Date() > otpRecord.expiresAt) throw new AppError("OTP has expired", 400);
        const isMatch = await bcrypt.compare(otp, otpRecord.codeHash);
        if (!isMatch) throw new AppError("Invalid OTP", 400);
    
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
            await authRepository.markUserVerified(email, session);
            await authRepository.deleteOtpByEmail(email, session);
            });
        } finally { session.endSession(); }
        return { message: "OTP verified successfully", success: true };

    }
    async ResendOtp(req: Request): Promise<signUpType> {
        const { email } = req.body;
        const user = await authRepository.findUserByEmail(email);
        if (!user) throw new AppError("User not found", 404);
        if (user.verified) throw new AppError("User is already verified", 400);
        const { code , expiresAt } = generateOtpWithExpiry(email);
        const codeHash = await bcrypt.hash(code, Number(process.env.SALT_ROUNDS) || 10);
        await authRepository.updateOtpByEmail(email, codeHash, expiresAt);
        return { message: "OTP sent successfully", success: true };
    }
}

const authService = new AuthService();

export default authService;