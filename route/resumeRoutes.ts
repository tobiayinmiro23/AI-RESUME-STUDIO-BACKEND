import express from "express";
import authController from "../controller/authController";
const resumeRoutes = express.Router()


resumeRoutes.post('/signup', authController.SignUpController)

export default resumeRoutes;