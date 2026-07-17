import { Request, Response, NextFunction } from "express";
import {UserModel} from "../models/index";
import bcrypt from "bcrypt";
import { response } from "../utils/response";
class AuthService {
    async SignUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user) return response({ message: "User already exists", status: "fail" ,code: 409}, res);
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
            await UserModel.create({ email, password: hashedPassword });
            return  response({ message: "Signup successful", status: "success", code: 201 }, res);
        } catch (error) {
            // next(error);
            return response({ message: "An error occurred during signup", status: "fail" ,code: 500}, res);
        }
    }
     async SignIn(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) return response({ message: "Invalid credentials", status: "fail" ,code: 401}, res);
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return response({ message: "Invalid credentials", status: "fail" ,code: 401}, res);
            return response({ message: "Signin successful", status: "success", code: 200 }, res);
        } catch (error) {
            // next(error);
            return response({ message: "An error occurred during signin", status: "fail" ,code: 500}, res);
        }
    }
}

const authService = new AuthService();

export default authService;