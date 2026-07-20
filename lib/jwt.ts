import jwt, {JwtPayload} from "jsonwebtoken";
import { AppError } from "../utils/appError";


interface AuthPayload extends JwtPayload {
  userId: string;
  email: string;
}
interface userType  {
  userId: string;
  email: string;
}
type jwtResponseType = {
    message: string | AuthPayload | object | unknown[];
    success: boolean;
  };
  
    
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new AppError("JWT_SECRET is not defined in environment variables",400);

export const sign=(user: userType, options?: jwt.SignOptions): jwtResponseType => {
         const token=  jwt.sign( {
                userId: user.userId,
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: options?.expiresIn || "7d" }
        )
        let jwtResponse={ message: token, success: true };
        return jwtResponse;

};
export const verify=(jwtToken: string) :jwtResponseType => {
        try{
             const decodedToken=  jwt.verify( 
                jwtToken,
                JWT_SECRET,
            ) as AuthPayload;
        return { message: decodedToken, success: true };

        }catch(err: unknown){
            if (err instanceof jwt.TokenExpiredError)   throw new AppError("Token has expired",401);
                // return { message: "", success: false };
            if (err instanceof jwt.JsonWebTokenError) throw new AppError("Invalid token",401);
                // return { message: "Invalid token", success: false };
            // if (err instanceof Error) return { message: err.message, success: false };
            // return { message: "Unable to verify token", success: false };
            throw new AppError("Unable to verify token",401);
        }

}