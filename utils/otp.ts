import crypto from "crypto";

export const generateOtp = (length = 6): string => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  return otp;
};

type OtpPayload = {
  code: string;
  expiresAt: Date;
};

export const generateOtpWithExpiry = (length = 6, ttlMinutes = 8): OtpPayload => {
  return {
    code: generateOtp(length),
    expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000),
    
  };
};