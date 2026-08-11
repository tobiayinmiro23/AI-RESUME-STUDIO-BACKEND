import { Request, Response } from "express";
import resumeService from "../service/resumeService"
import {ResumeFileValidator} from "../utils/resumeValidator"
import { AppError } from "../utils/appError";

class resumeController {

    async UploadController(req: Request, res:Response) {
            ResumeFileValidator(req);
            // let result = await resumeService.uploadResume(req);
            // return res.status(200).json(result);
            try {
                for await ( const progress of resumeService.uploadResume(req)) {
                    res.write(JSON.stringify(progress) + "\n");
                }
                res.end();
            } catch (error) {
                if (res.headersSent) {
                    const message = error instanceof AppError ? error.message : "Error uploading resume";
                    res.write(JSON.stringify({
                        type: "error",
                        success: false,
                        message
                    }) + "\n");
                    res.end();
                    return;
                }
                if (error instanceof AppError) throw error;
                throw new AppError("Error uploading resume", 500);
            }
    }
     
}

export default new resumeController();