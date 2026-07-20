import { ClientSession } from "mongoose";
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
        return await OtpModel.updateOne({ email }, { codeHash, expiresAt });
    }
    async findOtpByEmail(email: string) {
        return await OtpModel.findOne({ email });
    }
    async deleteOtpByEmail(email: string, session: ClientSession) {
        return await OtpModel.deleteOne({ email },{ session });
    }
    async markUserVerified(email: string, session: ClientSession) {
        return await UserModel.updateOne({ email }, { verified: true },{ session });
    }
}

const authRepository = new AuthRepository();
export default authRepository;