import { ResumeModel } from "../models/resume";

class ResumeRepository{
    async findHashByUserIdAndPdfHash(userId: string, pdfHash: string) {
        return await ResumeModel.findOne({ userId, pdfHash });
    }
    async createResume(userId: string, fileName: string, pdfHash: string, extractedText: string, resumeData: any) {
        return await ResumeModel.create({ userId, fileName, pdfHash, extractedText, resumeData });
    }
}

const resumeRepository = new ResumeRepository();
export default resumeRepository;