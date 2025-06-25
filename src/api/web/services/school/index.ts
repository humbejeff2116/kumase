import { Types } from 'mongoose';
import { School } from '../../../database/models/school';
import schoolDbInterface from '../../../database/interface/school';


const schoolService = {
    async createSchool(school: School) { 
        try {
            const schoolResponse = await schoolDbInterface.createSchool(school);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getSchool() {
        try {
            const schoolResponse = await schoolDbInterface.get();
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updateSession(id: Types.ObjectId | string, session: string) {
        try {
            const schoolResponse = await schoolDbInterface.updateSession(id, session);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updateSemester(id: Types.ObjectId | string, semester: string) {
        try {
            const schoolResponse = await schoolDbInterface.updateSemester(id, semester);
            return schoolResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default schoolService;