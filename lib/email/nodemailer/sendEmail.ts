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
            // text,
            html:welcomeTemplate(name),
            });
        } catch(error) {
            if (error instanceof Error) throw new AppError(`Unable to send email: ${error.message}`, 500);
            throw new AppError("Unable to send email.", 500);
        }
    };
    async sendOtp(otp: string,to: string, name: string){
        try {
            await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject:"AI Resume Studio",
            // text,
            html:welcomeTemplate(name),
            });
        } catch(error) {
            if (error instanceof Error) throw new AppError(`Unable to send email: ${error.message}`, 500);
            throw new AppError("Unable to send email.", 500);
        }
    };


}

const emailService = new EmailService();

export default emailService;