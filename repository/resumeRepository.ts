import { ResumeModel } from "../models/resume";

class ResumeRepository{
    async findHashByUserIdAndPdfHash(userId: string, pdfHash: string) {
        return await ResumeModel.findOne({ userId, pdfHash });
    }
    async createResume(userId: string, fileName: string, pdfHash: string, extractedText: string, resumeData: any) {
        return await ResumeModel.create({ userId, fileName, pdfHash, extractedText, resumeData });
    }
    async getResumeDetail(userId: string) {
        return await ResumeModel.find({ userId });
    }
}

const resumeRepository = new ResumeRepository();
export default resumeRepository;