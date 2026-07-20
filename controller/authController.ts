import { Request, Response, NextFunction } from "express";
import authService from "../service/authService";
import {response} from "../utils/response";
import { signinValidator } from "../validation/validator";
import { AppError } from "../utils/appError";

const authValidator=(req:Request)=>{
        const {isValid, errMessage} = signinValidator(req.body);
        if (!isValid)  throw new AppError(errMessage || "Invalid user input", 400);
    }
class authController {

    async SignUpController(req: Request, res:Response) {
        // try {
            authValidator(req);
            let serviceResponse = await authService.SignUp(req);
            return res.status(201).json(serviceResponse);
        // } catch (error: any) {
        //          return response({ message: error?.message || "An error occurred", status: "fail" ,code: 400}, res);
        // }
    }
     async SignInController(req: Request, res:Response) {
        // try {
             authValidator(req);
            let serviceResponse = await authService.SignIn(req);
            return res.status(200).json(serviceResponse);

        // } catch (error: any) {
        //          return response({ message: error?.message || "An error occurred", status: "fail" ,code: 400}, res);

        // }
    }
}

export default new authController();
