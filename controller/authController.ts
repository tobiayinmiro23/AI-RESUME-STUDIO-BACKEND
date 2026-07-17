import express, { Application, Request, Response, NextFunction } from "express";
import Auth from "../service/authService";
import {response} from "../utils/response";

class authController {
    async SigninController(req: Request, res: Response, next: NextFunction) {
        try {
            // Your signin logic here
            let resp = await Auth.Signin(req, res, next);
            response(resp, res, "success", 200);

        } catch (error) {
            next(error);
        }
    }
}

export default new authController();
