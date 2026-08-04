import express from "express";
import resumeController from "../controller/resumeController";
import { uploadMiddleware } from "../middleware/fileUpload";
const resumeRoutes = express.Router()


resumeRoutes.post('/upload',uploadMiddleware.single('resume'), resumeController.UploadController)


export default resumeRoutes;