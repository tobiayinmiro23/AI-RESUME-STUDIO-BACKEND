import { AppError } from "../utils/appError";
import { Request } from "express";
import { getPdfContent } from "../lib/pdfParser";
import {hashPdf } from "../utils/pdfHash"
import resumeRepository from "../repository/resumeRepository";
import { getResumeDetail } from "../lib/openRouter/extractResumeDetail";
import { deleteUploadedFile } from "../utils/deleteFile";


class ResumeService {
    async uploadResume(req: Request) {
        if (!req.file) throw new AppError("Resume file is required", 400);
        const pdfPath = req.file.path;
        try {
            const userIdHeader = req.headers.userid;
            if (!userIdHeader || Array.isArray(userIdHeader)) throw new AppError("Unauthorized request", 400);
            const userId = userIdHeader;
            const pdfHash= await hashPdf(pdfPath);
            const pdfHashExists = await resumeRepository.findHashByUserIdAndPdfHash(userId, pdfHash);
            if(pdfHashExists)  return { message: "Resume uploaded successfully", success: true };
            const content = await getPdfContent(pdfPath);
            const AIresponse = await getResumeDetail(content.text)
            const promptResult= AIresponse.choices[0].message.content
            console.log("AI response",AIresponse)
            await resumeRepository.createResume(userId, req.file.originalname, pdfHash, content.text, promptResult);
            return { message: "Resume uploaded successfully", success: true };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Error uploading resume", 500);
        } finally {
            await deleteUploadedFile(req.file.path);
        }
        
    }

}

const resumeService = new ResumeService();

export default resumeService;