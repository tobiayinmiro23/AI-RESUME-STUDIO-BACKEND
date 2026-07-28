import express, { Request, Response } from "express";
import resumeController from "../controller/resumeController";
import { uploadMiddleware } from "../middleware/fileUpload";
import { promptTest } from "../jottings/openRouter";
const resumeRoutes = express.Router()


resumeRoutes.post('/upload',uploadMiddleware.single('resume'), resumeController.UploadController)
resumeRoutes.post('/extract-data',async(req:Request,res:Response)=>{
    console.log(req.body)
    let response = await promptTest()
    res.status(200).json(response)
})

export default resumeRoutes;