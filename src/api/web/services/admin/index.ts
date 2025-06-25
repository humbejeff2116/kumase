import { Types } from "mongoose";
import { Admin } from "../../../database/models/adminAccount";
import adminAccountDbInterface from "../../../database/interface/admin";

const adminAccountService = {
    async createAccount(adminDetails: Admin) { 
        try {
            const admin = await adminAccountDbInterface.createAccount(adminDetails);
            return admin;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccount() {
        try {
            const adminAccount = await adminAccountDbInterface.getAccount();
            return adminAccount;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAccountById(id: Types.ObjectId | string) {
        try {
            const adminAccount = await adminAccountDbInterface.getAccountById(id);
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

    async accountExist(): Promise<boolean> {
        return await this.getAccount() ? true : false;
    }
}

export default adminAccountService;