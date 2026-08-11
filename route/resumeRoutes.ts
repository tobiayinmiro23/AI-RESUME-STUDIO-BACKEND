import express from "express";
import resumeController from "../controller/resumeController";
import { uploadMiddleware } from "../middleware/fileUpload";
import { streamMiddleware } from "../middleware/httpStream";
const resumeRoutes = express.Router()


resumeRoutes.post('/upload', streamMiddleware ,uploadMiddleware.single('resume'), resumeController.UploadController)


export default resumeRoutes;