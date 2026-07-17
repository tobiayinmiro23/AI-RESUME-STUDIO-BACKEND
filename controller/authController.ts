import express, { Application, Request, Response, NextFunction } from "express";
import Auth from "../service/auth";

class authController {
    async SigninController(req: Request, res: Response, next: NextFunction) {
        try {
            // Your signin logic here
            let resp = await Auth.Signin(req, res, next);
            res.status(200).json(resp);

        } catch (error) {
            next(error);
        }
    }
}

export default new authController();
