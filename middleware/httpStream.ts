import { Response,NextFunction, Request } from "express";

export const streamMiddleware = (req:Request,res: Response,next: NextFunction) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  next();
};