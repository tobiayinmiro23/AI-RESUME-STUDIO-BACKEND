import { Request, Response } from "express";
import authService from "../service/authService";
import { AppError } from "../utils/appError";

class resumeController {

    async UploadController(req: Request, res:Response) {
            let serviceResponse = await authService.SignUp(req);
            return res.status(201).json(serviceResponse);
    }
     
}

export default new resumeController();