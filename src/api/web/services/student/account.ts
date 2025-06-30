import { Types } from "mongoose";
import { studentAccountDbInterface } from "../../../database/interface/student";
import { StudentAccount } from "../../../database/models/studentAccount";

const studentAccountService = {
    async createAccount(studentDetails: StudentAccount) { 
        try {
            const student = await studentAccountDbInterface.createAccount(studentDetails);
            return student;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updatePassword(accountId: Types.ObjectId | string, newPassword: string) { 
        try {
            const student = await studentAccountDbInterface.updatePassword(accountId, newPassword);
            return student;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountByRegNo(regNo: string) {
        try {
            const studentAccount = await studentAccountDbInterface.getAccountByRegNo(regNo);
            return studentAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountById(id: Types.ObjectId | string) {
        try {
            const studentAccount = await studentAccountDbInterface.getAccountById(id);
            return studentAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountByStudentId(studentId: Types.ObjectId | string) {
        try {
            const studentAccount = await studentAccountDbInterface.getAccountByStudentId(studentId);
            return studentAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async checkAccountPassword(password: string, user: any): Promise<{error: boolean, match: boolean}> {
        return new Promise((res, rej) => {
            user.checkPassword(password, function (err: Error, isMatch: boolean) {
                if (err) {
                    rej(err);
                }
                if (!isMatch) {
                    res({error: false, match: false });
                }
                res({error: false, match: true });
            })
        })
    },

    async accountExist(id: string, idType: string): Promise<boolean> {
        const accountWithIdExist = async (id: string): Promise<boolean> => {
            return await this.getAccountById(id) ? true : false;
        }

        const accountWithRegNoExist = async (regNo: string): Promise<boolean> => {
            return await this.getAccountByRegNo(regNo) ? true : false;
        }

        switch (idType) {
            case "regNo":
                return accountWithRegNoExist(id);
            case "id": 
                return accountWithIdExist(id);
            default:
                throw new Error('idType is not defined');
        }
    }
}

export default studentAccountService;