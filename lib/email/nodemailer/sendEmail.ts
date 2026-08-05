// services/email.service.ts
import { transporter } from "./config";
import { AppError } from "../../../utils/appError";
import { otpTemplate, } from "./templates/otp";
import { welcomeTemplate, } from "./templates/welcome";
import dotenv from "dotenv";
dotenv.config();

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  name:string
  text?: string;
}
class EmailService {

 async sendWelcomeEmail({to,name}: SendEmailOptions){
    try {
        const response=await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject:"AI Resume Studio",
        // text,
        html:welcomeTemplate(name),
        });
        console.log(response)
    } catch {
        throw new AppError("Unable to send email.", 500);
    }
};

}

const emailService = new EmailService();

export default emailService;