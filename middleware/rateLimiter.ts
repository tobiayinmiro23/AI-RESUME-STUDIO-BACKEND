import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: Number(process.env.APILIMITER_TIME_WINDOW) * 60 * 1000, // Time window in minutes
  limit: Number(process.env.APILIMITER_REQUEST_LIMIT), // Maximum requests per IP within the window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
export const loginLimiter = rateLimit({
  windowMs: Number(process.env.LOGIN_TIME_WINDOW) * 60 * 1000,
  limit: Number(process.env.LOGIN_REQUEST_LIMIT),
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