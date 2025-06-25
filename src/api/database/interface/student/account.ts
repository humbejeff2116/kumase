import { Types } from 'mongoose';
import StudentAccountModel, { StudentAccount } from '../../models/studentAccount';

const studentAccountDbInterface = {
    async createAccount(studentDetails: StudentAccount) { 
        try {
            const student = await StudentAccountModel.createAccount(studentDetails);
            return student;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountByRegNo(regNo: string) {
        try {
            const studentAccount = await StudentAccountModel.getByRegNo(regNo);
            return studentAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountById(id: Types.ObjectId | string) {
        try {
            const studentAccount = await StudentAccountModel.getById(id);
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

}

export default studentAccountDbInterface;