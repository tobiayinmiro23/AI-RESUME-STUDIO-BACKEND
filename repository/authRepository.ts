import {UserModel} from "../models/index";

export class AuthRepository {
    async findUserByEmail(email: string) {
        return await UserModel.findOne({ email });
    }
    async createUser(email: string, password: string) {
        return await UserModel.create({ email, password });
    }
}

const authRepository = new AuthRepository();

export default authRepository;