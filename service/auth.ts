import express, { Application, Request, Response, NextFunction } from "express";

class Auth {
    async Signin(req: Request, res: Response, next: NextFunction) {
        try {
            // Your signin logic here
            console.log(req.body)
            return { message: "Signin successful" };
        } catch (error) {
            next(error);
        }
    }
}

export default new Auth();