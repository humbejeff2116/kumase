import { Types } from 'mongoose';
import SchoolModel, { School } from '../../models/school';

const schoolDbInterface = {
    async createSchool(school: School) { 
        try {
            const schoolResponse = await SchoolModel.createSchool(school);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async get() {
        const schoolResponse = await SchoolModel.get();
        return schoolResponse;
    },

    async updateSession(id: Types.ObjectId | string, session: string) {
        try {
            const schoolResponse = await SchoolModel.updateSession(id, session);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updateSemester(id: Types.ObjectId | string, semester: string) {
        try {
            const schoolResponse = await SchoolModel.updateSemester(id, semester);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default schoolDbInterface;