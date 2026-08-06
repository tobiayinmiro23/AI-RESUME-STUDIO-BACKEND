import { transporter } from "./config";
import { AppError } from "../../../utils/appError";
import { otpTemplate } from "./templates/otp";
import { welcomeTemplate } from "./templates/welcome";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
    async sendWelcomeEmail(to: string, name: string){
        try {
            await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject:"AI Resume Studio",
            html:welcomeTemplate(name),
            });
        } catch(error) {
            console.log(error)
        }
    };
    async sendOtpEmail(otp: string,to: string, name: string){
        try {
           const response= await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject:"OTP for AI Resume Studio authentication",
            html:otpTemplate(name,otp),
            });
            console.log(response)
        } catch(error) {
            if (error instanceof Error) throw new AppError(`Signup not successful, unable to send otp email: ${error.message} please try again`, 500);
            throw new AppError("Signup not successful, unable to send otp email, please try again", 500);
        }
    };


}

const emailService = new EmailService();

export default emailService;