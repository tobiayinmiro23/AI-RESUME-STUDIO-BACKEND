import express, { Request, Response } from "express";
import resumeController from "../controller/resumeController";
import { uploadMiddleware } from "../middleware/fileUpload";
const resumeRoutes = express.Router()


resumeRoutes.post('/upload',uploadMiddleware.single('resume'), resumeController.UploadController)
// resumeRoutes.post('/extract-data',async(req:Request,res:Response)=>{
//     console.log(req.body)
//    
//     // console.log(response)
//     res.status(200).json(response)
// })

export default resumeRoutes;