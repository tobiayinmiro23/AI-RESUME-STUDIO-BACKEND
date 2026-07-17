import express, { Application, Request, Response, NextFunction } from "express";

type ResponseType = {
    message: string | undefined | object | unknown[];
    status: string;
    code?: number;
  };
  
    
export const response=({ message, status ,code}: ResponseType, res:Response)=>{
   
    res.status(code ?? 200).json({ status, message });
}
