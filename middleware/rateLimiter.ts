import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 90, // Maximum 90 requests per IP within the window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 14,
  message: {
    success: false,
    message: "Too many OTP requests. Try again later.",
  },
});