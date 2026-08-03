import { ResumeModel } from "../models/resume";

class ResumeRepository{
    async findHashByUserIdAndPdfHash(userId: string, pdfHash: string) {
        return await ResumeModel.findOne({ userId, pdfHash });
    }
}