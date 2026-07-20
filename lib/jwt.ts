import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  userId: string;
  email: string;
}
interface userType  {
  userId: string;
  email: string;
}
export const sign=(user: userType, options?: jwt.SignOptions): string => {
         const token=  jwt.sign( {
                userId: user.userId,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: options?.expiresIn || "7d",
            }
        )
        return token;

};
export const verify=(payload: string, userid:string) : string | boolean => {
        try{
             const token=  jwt.verify( 
                payload,
                process.env.JWT_SECRET!,
            ) as AuthPayload;
        if (token?.userId !== userid) return  "Invalid token"
        return true;

        }catch(err: unknown){
            if (err instanceof jwt.TokenExpiredError)  return "Token has expired";
            if (err instanceof jwt.JsonWebTokenError) return "Invalid token";
            if (err instanceof Error) return err.message;
            return "Unable to verify token";
        }

    }