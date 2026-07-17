import express, { Application, Request, Response, NextFunction } from "express";
import Auth from "../service/authService";
import {response} from "../utils/response";
import { signinValidator } from "../validation/validator";

class authController {
    async SigninController(req: Request, res: Response, next: NextFunction) {
        try {
            const {isValid, errMessage} = signinValidator(req.body);
            if (!isValid) {
                return response({ message: errMessage || "Invalid input data", status: "fail" ,code: 400}, res);
            }
            let resp = await Auth.Signin(req, res, next);
            return response({ message: resp, status: "success" ,code: 200}, res);

        } catch (error: any) {
                 return response({ message: error?.message || "An error occurred", status: "fail" ,code: 400}, res);

        }
    }
}

export default new authController();
