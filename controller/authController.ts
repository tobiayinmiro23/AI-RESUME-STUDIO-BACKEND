import express, { Request, Response, NextFunction } from "express";
import authService from "../service/authService";
import {response} from "../utils/response";
import { signinValidator } from "../validation/validator";

const authValidator=(req:Request, res:Response)=>{
        const {isValid, errMessage} = signinValidator(req.body);
            if (!isValid) {
                return response({ message: errMessage || "Invalid input data", status: "fail" ,code: 400}, res);
            }
    }
class authController {

    async SignUpController(req: Request, res: Response, next: NextFunction) {
        try {
            authValidator(req, res);
            let serviceResponse = await authService.SignUp(req, res, next);
            return serviceResponse 
        } catch (error: any) {
                 return response({ message: error?.message || "An error occurred", status: "fail" ,code: 400}, res);
        }
    }
     async SignInController(req: Request, res: Response, next: NextFunction) {
        try {
             authValidator(req, res);
            let serviceResponse = await authService.SignIn(req, res, next);
            return serviceResponse 

        } catch (error: any) {
                 return response({ message: error?.message || "An error occurred", status: "fail" ,code: 400}, res);

        }
    }
}

export default new authController();
