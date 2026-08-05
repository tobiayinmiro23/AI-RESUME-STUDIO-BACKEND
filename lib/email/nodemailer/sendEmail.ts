// services/email.service.ts

import { transporter } from "./config";
import { AppError } from "../../../utils/appError";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({to,subject,html,text}: SendEmailOptions) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch {
    throw new AppError("Unable to send email.", 500);
  }
};