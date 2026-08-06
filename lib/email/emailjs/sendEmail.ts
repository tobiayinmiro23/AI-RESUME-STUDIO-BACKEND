import emailjs from "@emailjs/nodejs";
import dotenv from "dotenv";
import { AppError } from "../../../utils/appError";
dotenv.config();

class EmailService {
    async sendWelcomeEmail (toEmail: string, name: string) {
        try {
            await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_TEMPLATE_ID!,
            {
                user_email: toEmail,
                to_name:name,
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
            await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_TEMPLATE_ID!,
            {
                to_email,
                to_name,
                otp
            },
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY!,
                privateKey: process.env.EMAILJS_PRIVATE_KEY!,
            });
        } catch (error) {
            console.log(error)
        }
    };
}

const emailService = new EmailService();

export default emailService;

