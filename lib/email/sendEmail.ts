import emailjs from "@emailjs/nodejs";
import { AppError } from "../../utils/appError";

export const sendEmail = async (
  toEmail: string,
  subject: string,
  message: string
) => {
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        to_email: toEmail,
        subject,
        message,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );
  } catch (error) {
    throw new AppError("Unable to send email.", 500);
  }
};