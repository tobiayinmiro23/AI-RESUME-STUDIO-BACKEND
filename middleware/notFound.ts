import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const notFound = (req: Request,res: Response,next: NextFunction) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404)
  );
};