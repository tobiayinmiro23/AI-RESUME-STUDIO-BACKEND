import {OtpModel, UserModel} from "../models/auth";

export class AuthRepository {
    // user related methods
    async findUserByEmail(email: string) {
        return await UserModel.findOne({ email });
    }
    async createUser(email: string, password: string) {
        return await UserModel.create({ email, password });
    }
     async updatePasswordByEmail(email: string, password: string) {
        return await UserModel.updateOne({ email }, { password });
    }
     async markUserVerified(email: string) {
        return await UserModel.updateOne({ email }, { verified: true });
    }
    // otp related methods
    async createOtp(email: string, codeHash: string, expiresAt: Date) {
        return await OtpModel.create({ email, codeHash, expiresAt });
    }
    async updateOtpByEmail(email: string, codeHash: string, expiresAt: Date) {
        return await OtpModel.updateOne({ email }, { email, codeHash, expiresAt }, { upsert: true });
    }
    async findOtpByEmail(email: string) {
        return await OtpModel.findOne({ email });
    }
    async deleteOtpByEmail(email: string) {
        return await OtpModel.deleteOne({ email });
    }
   
}

const authRepository = new AuthRepository();
export default authRepository;