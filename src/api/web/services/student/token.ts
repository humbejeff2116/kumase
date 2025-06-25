import { Types } from "mongoose";
import { studentTokenDbInterface } from "../../../database/interface/student";
import { CreateStudentToken, tokenStatus } from "../../../database/models/studentToken";
import studentTokenHandler from "../../lib/studentToken";
import schoolDbInterface from "../../../database/interface/school";
import schoolService from "../school";

const studentTokenService = {
    async createToken(token: CreateStudentToken) {
        try {
            const tokenValue = studentTokenHandler.generateToken();
            token.value = tokenValue;

            console.log('token --tokenservice', token);

            const studentToken = await studentTokenDbInterface.createToken(token);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async tokenIsActive(tokenValue: string) {
        try {
            const token = await studentTokenDbInterface.getTokenByValue(tokenValue);
            const school = await schoolDbInterface.get();

            if (token) {
                return token.isActive(school);
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAllTokens() {
        try {
            const tokens = await studentTokenDbInterface.getAllTokens();
            return tokens;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    // async activateToken(studentId: Types.ObjectId | string) {
    //     try {
    //         const studentToken = await studentTokenDbInterface.activateToken(studentId);
    //         return studentToken;
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // },

    async deActivateToken(studentId: Types.ObjectId | string) {
        try {
            const studentToken = await studentTokenDbInterface.deActivateToken(studentId);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getTokenByStudentId(id: Types.ObjectId | string) {
       
        try {
            const studentToken = await studentTokenDbInterface.getTokensByStudentId(id);
            return studentToken;

        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getTokenById(id: Types.ObjectId | string) {
        try {
            const studentToken = await studentTokenDbInterface.getTokenById(id);
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getActiveToken(studentId: Types.ObjectId | string) {
        try {
            const school = await schoolService.getSchool();
            const studentToken = await studentTokenDbInterface.getActiveToken(
                studentId,
                school.currentSession, 
                school.currentSemester
            );
            
            return studentToken;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default studentTokenService;