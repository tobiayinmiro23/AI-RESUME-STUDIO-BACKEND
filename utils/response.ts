import express, { Application, Request, Response, NextFunction } from "express";

type ResponseType = {
    message: string | undefined | object | unknown[];
    success: boolean;
    code?: number;
  };
  
    
export const response=({ message, success ,code}: ResponseType, res:Response)=>{
   
    res.status(code ?? 200).json({ success, message });
}
