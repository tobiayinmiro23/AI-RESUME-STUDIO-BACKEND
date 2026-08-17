import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { AppError } from "../utils/appError";

interface AuthPayload extends JwtPayload {
  userId: string;
  email: string;
}
interface userType {
  userId: string;
  email: string;
}
type jwtResponseType = {
  message: string;
  success: boolean;
};

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new AppError("JWT_SECRET is not defined in environment variables", 400);

export const sign = (
  user: userType,
  expiresIn: jwt.SignOptions["expiresIn"] = "7d"
): jwtResponseType => {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: expiresIn ?? "7d" }
  );

  return { message: token, success: true };
};

export const verify = (jwtToken: string): AuthPayload => {
  try {
    return jwt.verify(jwtToken, JWT_SECRET) as AuthPayload;
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) throw new AppError("Token has expired", 401);
    if (err instanceof jwt.JsonWebTokenError) throw new AppError("Invalid token", 401);
    throw new AppError("Unable to verify token", 401);
  }
};