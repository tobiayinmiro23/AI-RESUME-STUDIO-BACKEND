import { Request, Response, NextFunction } from "express";
import {UserModel} from "../models/index";
import bcrypt from "bcrypt";
import {sign} from "../utils/jwt"
import { AppError } from "../utils/appError";
import {signInType,signUpType } from "../types/user"

class AuthService {
    async SignUp(req: Request ): Promise<signUpType> {
        // try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user) throw new AppError("User already exists", 409); 
            // if (user) return response({ message: "", status: "fail" ,code: 409}, res);
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
            await UserModel.create({ email, password: hashedPassword });
            let data: signUpType ={ message: "Signup successful", success: true };
            return data;
            // return  response({ message: , status: "success", code: 201 }, res);
        // } catch (error) {
        //     // next(error);
        //     return response({ message: "An error occurred during signup", status: "fail" ,code: 500}, res);
        // }
    }
     async SignIn(req: Request): Promise<signInType> {
        // try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) throw new AppError("Invalid credentials", 404); 
            // response({ message: "Invalid credentials", status: "fail" ,code: 401}, res);
            const isMatch = bcrypt.compare(password, user?.password);
            if (!isMatch) throw new AppError("Invalid credentials", 404);  
            // response({ message: "Invalid credentials", status: "fail" ,code: 401}, res);
            let token = sign({ userId: user._id.toString(), email: user.email });
             let data: signInType ={ message: {
                email: user.email,
                id: user._id.toString(),
                token
            }, success: true };
            return data;
        // } catch (error) {
        //     next(error);
        //     console.log(error);
        //     return response({ message: "An error occurred during signin", status: "fail" ,code: 500}, res);
        // }
    }
}

const authService = new AuthService();

export default authService;