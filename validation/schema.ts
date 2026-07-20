import { z } from "zod";

export const signInSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(3, "Password must be at least 3 characters long").max(50, "Password must be at most 50 characters long"),
});
export const otpSchema = z.object({
  email: z.email().trim().toLowerCase(),
  otp: z.number().min(100000, "Invalid OTP input").max(999999, "Invalid OTP input"),
});