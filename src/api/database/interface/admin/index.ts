import { Types } from 'mongoose';
import AdminAccountModel , { Admin } from '../../models/adminAccount';

const adminAccountDbInterface = {
    async createAccount(adminDetails: Admin) { 
        try {
            const admin = await AdminAccountModel.createAccount(adminDetails);
            return admin;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccount() {
        try {
            const adminAccount = await AdminAccountModel.get();
            return adminAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountById(id: Types.ObjectId | string) {
        try {
            const adminAccount = await AdminAccountModel.getById(id);
            return adminAccount;
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

export default adminAccountDbInterface;