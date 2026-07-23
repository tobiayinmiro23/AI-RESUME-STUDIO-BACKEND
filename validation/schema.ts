import { z } from "zod";

export const signInSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(3, "Password must be at least 3 characters long").max(50, "Password must be at most 50 characters long"),
}).strict();

export const resetPasswordSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(3, "Password must be at least 3 characters long").max(50, "Password must be at most 50 characters long"),
}).strict();

export const verifyOtpSchema = z.object({
  email: z.email().trim().toLowerCase(),
  otp: z.string().length(6, "invalid otp input"),
  reason: z.enum(["signup", "reset-password"], { message: "Required fields are missing" }),
}).strict();

export const resendOtpSchema = z.object({
  email: z.email().trim().toLowerCase(),
  reason: z.enum(["signup", "reset-password"], { message: "Required fields are missing" }),
}).strict();