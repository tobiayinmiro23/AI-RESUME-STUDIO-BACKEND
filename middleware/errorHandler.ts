import { NextFunction, Response,Request } from "express";
import { AppError } from "../utils/appError";

export const errorHandler = (err: AppError,_req:  Request,res: Response,_next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};