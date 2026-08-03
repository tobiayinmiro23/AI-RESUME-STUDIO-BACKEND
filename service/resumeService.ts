import { AppError } from "../utils/appError";
import { Request, Response } from "express";
import { getPdfContent } from "../lib/pdfParser";
import {hashPdf } from "../utils/pdfHash"

class ResumeService {
    async uploadResume(req: Request) {
        if (!req.file) throw new AppError("Resume file is required", 400);
        const pdfPath = `../${req.file.path}`;
        const pdfHash= await hashPdf(pdfPath);
        
        const content = await getPdfContent(pdfPath);
        return content;
        // Process the PDF content as needed
    }

}