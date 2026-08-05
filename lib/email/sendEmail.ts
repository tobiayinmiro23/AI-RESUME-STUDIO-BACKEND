import emailjs from "@emailjs/nodejs";
import dotenv from "dotenv";
import { AppError } from "../../utils/appError";
dotenv.config();

class EmailService {
    async sendEmail (toEmail: string, name: string) {
        try {
            const response=await emailjs.send(
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
            if (response.status === 200) return response
            throw new AppError(response.text || "Unable to send email.", response.status || 500);
        } catch (error) {
            console.log(error)
            throw new AppError("Unable to send email.", 500);
        }
    };
}

const emailService = new EmailService();

export default emailService;

// status: 403,
//   text: 'API access from non-browser environments is currently disabled.