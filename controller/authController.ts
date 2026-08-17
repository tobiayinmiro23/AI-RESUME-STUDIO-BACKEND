import { Request, Response } from "express";
import authService from "../service/authService";
import { signinValidator, otpValidator,resendOtpValidator } from "../validation/validator";
import { AppError } from "../utils/appError";

const AuthValidator=(req:Request)=>{
        const {isValid, errMessage} = signinValidator(req.body);
        if (!isValid)  throw new AppError(errMessage || "Invalid user input", 400);
    }
    const OtpValidator=(req:Request)=>{
        const {isValid, errMessage} = otpValidator(req.body);
        if (!isValid)  throw new AppError(errMessage || "Invalid OTP input", 400);
    }
    const ResendOtpValidator=(req:Request)=>{
        const {isValid, errMessage} = resendOtpValidator(req.body);
        if (!isValid)  throw new AppError(errMessage || "Invalid user input", 400);
    }
class authController {

    async SignUpController(req: Request, res:Response) {
            AuthValidator(req);
            let serviceResponse = await authService.SignUp(req);
            return res.status(201).json(serviceResponse);
    }
     async SignInController(req: Request, res:Response) {
             AuthValidator(req);
            let serviceResponse = await authService.SignIn(req);
            return res.status(200).json(serviceResponse);
    }
    async VerifyOtpController(req: Request, res:Response) {
        OtpValidator(req);
        let serviceResponse = await authService.VerifyOtp(req);
        return res.status(200).json(serviceResponse);
    }
    async ResendOtpController(req: Request, res:Response) {
        ResendOtpValidator(req);
        let serviceResponse = await authService.ResendOtp(req);
        return res.status(200).json(serviceResponse);
    }
    async ResetPasswordController(req: Request, res:Response) {
        AuthValidator(req);
        let serviceResponse = await authService.ResetPassword(req);
        return res.status(200).json(serviceResponse);
    }
    async RefreshTokenController(req: Request, res:Response) {
        let serviceResponse = await authService.ResetPassword(req);
        return res.status(200).json(serviceResponse);
    }
}

export default new authController();
