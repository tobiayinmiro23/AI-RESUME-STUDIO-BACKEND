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
        const pdfPath = `../${req.file.path}`;
        try {
            if (!req.userId) throw new AppError("Unauthorized request", 400);
            const pdfHash= await hashPdf(pdfPath);
            const pdfHashExists = await resumeRepository.findHashByUserIdAndPdfHash(req.userId, pdfHash);
            if(pdfHashExists)  return { message: "Resume uploaded successfully", success: true };
            const content = await getPdfContent(pdfPath);
            let response = await getResumeDetail(content.text)
            await resumeRepository.createResume(req.userId, req.file.originalname, pdfHash, content.text, response);
        } catch (error) {
            throw new AppError("Error uploading resume", 500);
        } finally {
            await deleteUploadedFile(pdfPath);
        }
        
    }

}