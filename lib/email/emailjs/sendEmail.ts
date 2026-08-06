import emailjs from "@emailjs/nodejs";
import dotenv from "dotenv";
import { AppError } from "../../../utils/appError";
dotenv.config();

class EmailService {
    async sendWelcomeEmail (user_email: string, to_name: string) {
        try {
            await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_WELCOMETEMPLATE_ID!,
            {
                user_email,
                to_name,
            },
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY!,
                privateKey: process.env.EMAILJS_PRIVATE_KEY!,
            });
        } catch (error) {
            console.log(error)
        }
    };
    async sendOtpEmail (to_email: string, to_name: string, otp:string) {
        try {
            const response=await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_OTPTEMPLATE_ID!,
            {
                to_email,
                to_name,  
                otp
            },
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY!,
                privateKey: process.env.EMAILJS_PRIVATE_KEY!,
            });
            console.log(response)
        } catch (error) {
            console.log("error",error)
            if (error instanceof Error) throw new AppError(`Signup not successful, unable to send otp email: ${error.message} please try again`, 500);
            throw new AppError("Signup not successful, unable to send otp email, please try again", 500);
        }
    };
}

const emailService = new EmailService();

export default emailService;

