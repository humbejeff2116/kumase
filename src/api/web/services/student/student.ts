import { Types } from "mongoose";
import { Response } from 'express';
import fs from 'node:fs';
import path from "node:path";
import { studentDbInterface } from "../../../database/interface/student";
import { CourseReg, PurchasedToken, Student } from "../../../database/models/student";
import { CreateStudentToken } from "../../../database/models/studentToken";
import { NextResponse } from "next/server.js";

const studentService = {
    async createStudentRecord(details: Student) { 
        try {
            const user = await studentDbInterface.createStudentRecord(details);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getAll() {
        try {
            const users = await studentDbInterface.getAllStudents();
            return users;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getStudentByRegNo(regNo: string) {
        try {
            const user = await studentDbInterface.getStudentByRegNo(regNo);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    async getStudentById(studentId: Types.ObjectId | string) {
        try {
            const user = await studentDbInterface.getStudentById(studentId);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async updateProfileImage(studentId: Types.ObjectId | string, profileImage: string) {
        try {
            const userResponse = await studentDbInterface.updateStudentProfileImage(studentId, profileImage);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getProfileImage(studentId: Types.ObjectId | string, res: NextResponse) {
        const imagePath = path.join(__dirname, 'public', 'profile-images', `${studentId}`);
        console.log('image path is', imagePath);
        // fs.createReadStream(imagePath).pipe(res);
    },
    
    async studentExist(id: string, idType: 'id' | 'regNo'): Promise<boolean> {
        const studentWithIdExist = async (id: string): Promise<boolean> => {
            return await this.getStudentById(id) ? true : false;
        }

        const studentWithRegNoExist = async (email: string): Promise<boolean> => {
            return await this.getStudentByRegNo(email) ? true : false;
        }

        switch (idType) {
            case "regNo":
                return studentWithRegNoExist(id);
            case "id": 
                return studentWithIdExist(id);
            default:
                throw new Error('idType is not defined');
        }
    },

    async addPurchaseToken(
        studentId: Types.ObjectId | string, 
        token: CreateStudentToken
    ) {
        const { session, level, semester } = token;
        const purchasedToken: PurchasedToken = {
            session: session, 
            level: level, 
            semester: semester, 
            time: null
        }
        
        try {
            const userResponse = await studentDbInterface.addPurchaseToken(studentId, purchasedToken);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async registerCourse(
        studentId: Types.ObjectId | string, 
        courseReg: CourseReg
    ) {
        try {
            const userResponse = await studentDbInterface.regCourse(studentId, courseReg);
            return userResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async getStudentsIds() {
        try {
            const studentsIdsResponse = await studentDbInterface.getStudentsIds();
            return studentsIdsResponse;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export default studentService;