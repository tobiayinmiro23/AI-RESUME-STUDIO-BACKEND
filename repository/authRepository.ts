import {OtpModel, UserModel} from "../models/auth";

export class AuthRepository {
    async findUserByEmail(email: string) {
        return await UserModel.findOne({ email });
    }
    async createUser(email: string, password: string) {
        return await UserModel.create({ email, password });
    }
    async createOtp(email: string, codeHash: string, expiresAt: Date) {
        return await OtpModel.create({ email, codeHash, expiresAt });
    }
    async updateOtpByEmail(email: string, codeHash: string, expiresAt: Date) {
        return await OtpModel.updateOne({ email }, { codeHash, expiresAt }, { upsert: true });
    }
    async updatePasswordByEmail(email: string, password: string) {
        return await UserModel.updateOne({ email }, { password });
    }
    async findOtpByEmail(email: string) {
        return await OtpModel.findOne({ email });
    }
    async deleteOtpByEmail(email: string) {
        return await OtpModel.deleteOne({ email });
    }
    async markUserVerified(email: string) {
        return await UserModel.updateOne({ email }, { verified: true });
    }
}

const authRepository = new AuthRepository();
export default authRepository;