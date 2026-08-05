import emailjs from "@emailjs/nodejs";
import { AppError } from "../../utils/appError";

class EmailService {
    async sendEmail (toEmail: string, name: string) {
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
            throw new AppError("Unable to send email.", 500);
        }
    };
}

const emailService = new EmailService();

export default emailService;