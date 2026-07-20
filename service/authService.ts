import { Request } from "express";
import bcrypt from "bcrypt";
import {sign} from "../lib/jwt"
import { AppError } from "../utils/appError";
import {signInType,signUpType } from "../types/user"
import authRepository from "../repository/authRepository"

class AuthService {
    async SignUp(req: Request ): Promise<signUpType> {
            const { email, password } = req.body;
            const user = await authRepository.findUserByEmail(email);
            if (user) throw new AppError("User already exists", 409);
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
            await authRepository.createUser(email, hashedPassword);
            let data: signUpType ={ message: "Signup successful", success: true };
            return data;
    }
     async SignIn(req: Request): Promise<signInType> {
            const { email, password } = req.body;
            const user = await authRepository.findUserByEmail(email);
            if (!user) throw new AppError("Invalid credentials", 404); 
            const isMatch =await bcrypt.compare(password, user?.password);
            if (!isMatch) throw new AppError("Invalid credentials", 404);  
            let token = sign({ userId: user._id.toString(), email: user.email });
             let data: signInType ={ message: {
                email: user.email,
                id: user._id.toString(),
                token: token.message as string
            }, success: true };
            return data;
    }
}

const authService = new AuthService();

export default authService;