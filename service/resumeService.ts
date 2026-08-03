import { AppError } from "../utils/appError";
import { Request, Response } from "express";
import { getPdfContent } from "../lib/pdfParser";

class ResumeService {
    async uploadResume(req: Request) {
        if (req.file) {
            const pdfPath = `../${req.file.path}`;
            const content = await getPdfContent(pdfPath);
            return content;
        }
        // Process the PDF content as needed
    }

}