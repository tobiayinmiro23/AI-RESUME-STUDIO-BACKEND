import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 90, // Maximum 90 requests per IP within the window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many requests. Please try again later.",
  },
});
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: "fail",
    message: "Too many login attempts. Try again later.",
  },
});
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 4,
  message: {
    status: "fail",
    message: "Too many OTP requests. Try again later.",
  },
});