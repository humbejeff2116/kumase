import { Types } from 'mongoose';
import StudentModel, { CourseReg, PurchasedToken, Student } from '../../models/student';

const studentDbInterface = {
    async createStudentRecord(studentRecord: Student) { 
        try {
            const student = await StudentModel.createStudent(studentRecord);
            return student;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAllStudents() {
        try {
            const students = await StudentModel.getAll();
            return students;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getStudentByRegNo(regNo: string) { 
        try {
            const student = await StudentModel.getByRegNo(regNo);
            return student;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getStudentById(id: Types.ObjectId | string) {
        try {
            const user = await StudentModel.getById(id);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updateStudentProfileImage(userId: Types.ObjectId | string, profileImage: string) {
        try {
            const userResponse = await StudentModel.updateProfileImage(userId, profileImage);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async addPurchaseToken(
        studentId: Types.ObjectId | string, 
        purchasedToken: PurchasedToken
    ) {
        try {
            const userResponse = await StudentModel.addPurchaseToken(studentId, purchasedToken);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async regCourse(
        studentId: Types.ObjectId | string, 
        courseReg: CourseReg
    ) {
        try {
            const userResponse = await StudentModel.regCourse(studentId, courseReg);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    
    async getStudentsIds() {
        try {
            const userResponse = await StudentModel.getStudentsIds();
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default studentDbInterface;