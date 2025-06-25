import { Types } from 'mongoose';
import StudentTokenModel, { CreateStudentToken } from '../../models/studentToken';

const studentTokenDbInterface = {
    async createToken(token: CreateStudentToken) {
        try {
            const studentToken = await StudentTokenModel.createToken(token);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAllTokens() {
        try {
            const tokens = await StudentTokenModel.getAll();
            return tokens;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async activateToken(studentId: Types.ObjectId | string) {
        try {
            const studentToken = await StudentTokenModel.activateToken(studentId);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async deActivateToken(studentId: Types.ObjectId | string) {
        try {
            const studentToken = await StudentTokenModel.deActivateToken(studentId);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getTokensByStudentId(id: Types.ObjectId | string) {
        try {
            const studentToken = await StudentTokenModel.getByStudentId(id);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getTokenById(id: Types.ObjectId | string) {
        try {
            const studentToken = await StudentTokenModel.getById(id);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getTokenByValue(tokenValue: string) {
        try {
            const studentToken = await StudentTokenModel.getByValue(tokenValue);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getActiveToken(
        studentId: Types.ObjectId | string,
        session: string,
        semester: string,
    ) {
        try {
            const studentToken = await StudentTokenModel.getActiveToken(
                studentId,
                session,
                semester
            );
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default studentTokenDbInterface;