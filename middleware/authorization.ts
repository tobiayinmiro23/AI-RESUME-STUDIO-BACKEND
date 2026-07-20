import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/response";
import { AppError } from "../utils/appError";
import {verify} from "../lib/jwt";

export const authenticate = (req: Request,res: Response,next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) throw new AppError("Unauthorized request",401);
        const authPayload = authHeader.trim().split(/\s+/);
        if (authPayload.length !== 2 || authPayload[0] !== "Bearer") throw new AppError("Unauthorized request",401);
        const token = authPayload[1];
        if (!token) throw new AppError("Unauthorized request", 401);
        const decodedToken = verify(token);
        req.userId = decodedToken.userId;
        next();
   
};
