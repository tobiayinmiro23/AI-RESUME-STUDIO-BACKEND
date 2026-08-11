import { AppError } from "../utils/appError";
import { Request } from "express";
import { getPdfContent } from "../lib/pdfParser";
import {hashPdf } from "../utils/pdfHash"
import resumeRepository from "../repository/resumeRepository";
import { getResumeDetail } from "../lib/openRouter/extractResumeDetail";
import { deleteUploadedFile } from "../utils/deleteFile";
import { asyncGeneratorResponse } from "../utils/asyncGeneratorResponse";


class ResumeService {
    async *uploadResume(req: Request) {
        if (!req.file) throw new AppError("Resume file is required", 400);
        const pdfPath = req.file.path;
        try {
            const userIdHeader = req.headers.userid;
            if (!userIdHeader || Array.isArray(userIdHeader)) throw new AppError("Unauthorized request", 400);
            const userId = userIdHeader;
            yield* asyncGeneratorResponse("hashing pdf..","progress")
            const pdfHash= await hashPdf(pdfPath);
            const pdfHashExists = await resumeRepository.findHashByUserIdAndPdfHash(userId, pdfHash);
            if(pdfHashExists) return yield* asyncGeneratorResponse("Resume uploaded successfully","complete", true);
            yield* asyncGeneratorResponse("parsing pdf..", "progress")
            const content = await getPdfContent(pdfPath);
            yield* asyncGeneratorResponse("processing pdf..","complete")
            const AIresponse = await getResumeDetail(content.text)
            const result= AIresponse.choices[0].message.content
            // console.log("AI response",AIresponse)
            await resumeRepository.createResume(userId, req.file.originalname, pdfHash, content.text, result);
            // return { message: "Resume uploaded successfully", success: true };
            yield* asyncGeneratorResponse("Resume uploaded successfully","complete", true)
        } catch (error) {
            // console.log("AI error",error)
            if (error instanceof AppError) throw error;
            throw new AppError("Error uploading resume", 500);
        } finally {
            await deleteUploadedFile(req.file.path);
        }
    }

}

const resumeService = new ResumeService();

export default resumeService;