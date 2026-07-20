import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/response";
import {verify} from "../utils/jwt";

export const authenticate = (req: Request,res: Response,next: NextFunction) => {
    try{
         const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
        return response({ message: "Unauthorized", status: "fail" ,code: 401}, res);
  }
  const token = authHeader.split(" ")[1];
    const valid=verify(token, req.body.userId);
  if (valid !== true) {
    return response({ message: valid , status: "fail" ,code: 401}, res);
  }
    next();
    }
    catch {
       return response({ message: "Unauthorized", status: "fail" ,code: 401}, res);
     }
};
