import { Request, Response, NextFunction } from "express";
import authService from "../service/authService";
import { signinValidator } from "../validation/validator";
import { AppError } from "../utils/appError";

const authValidator=(req:Request)=>{
        const {isValid, errMessage} = signinValidator(req.body);
        if (!isValid)  throw new AppError(errMessage || "Invalid user input", 400);
    }
class authController {

    async SignUpController(req: Request, res:Response) {
            authValidator(req);
            let serviceResponse = await authService.SignUp(req);
            return res.status(201).json(serviceResponse);
    }
     async SignInController(req: Request, res:Response) {
             authValidator(req);
            let serviceResponse = await authService.SignIn(req);
            return res.status(200).json(serviceResponse);
    }
}

export default new authController();
