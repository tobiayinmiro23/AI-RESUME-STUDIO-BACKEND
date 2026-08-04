import { Request, Response } from "express";
import { AppError } from "../utils/appError";
import resumeService from "../service/resumeService"

const ResumeFileValidator=(req:Request)=>{
        if (!req.file) throw new AppError("Resume file is required", 400);
        if (req.file.mimetype !== "application/pdf" && req.file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            throw new AppError("Only PDF and DOCX files are allowed", 400);
        }
        if (req.file.size > 5 * 1024 * 1024) throw new AppError("File cannot exceed 5MB", 400);
    }
class resumeController {

    async UploadController(req: Request, res:Response) {
            ResumeFileValidator(req);
            console.log(req.file);
            let result = await resumeService.uploadResume(req);
            return res.status(200).json(result);
    }
     
}

export default new resumeController();