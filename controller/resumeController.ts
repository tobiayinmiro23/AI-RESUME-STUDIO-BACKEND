import { Request, Response } from "express";
import resumeService from "../service/resumeService"
import {ResumeFileValidator} from "../utils/resumeValidator"

class resumeController {

    async UploadController(req: Request, res:Response) {
            ResumeFileValidator(req);
            // console.log(req.file);
            let result = await resumeService.uploadResume(req);
            return res.status(200).json(result);
    }
     
}

export default new resumeController();