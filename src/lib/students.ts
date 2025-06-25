import { getStudentsSlugs } from "@/services/services.http";
import { Course, getAllCourses } from "../data/courses";
import fs from 'node:fs';
import path from "node:path";

class Service {
    courses = getAllCourses();

    async getAll(): Promise<Array<Course>> {
        return this.courses
    }

    /**
     * 
     * @param studentId 
     * @returns students slugs from API 
     * 
     * NOTE: no error handling for this async function, please wrap 
     * in try catch and handle error when calling this function
     */
    async getStudentsSlugs(studentId?: string): Promise<Array<any>> {
        try {
            const studentsFilePath = path.join(process.cwd(), 'src/data/students/students-lock.json');
            // const { data:students } = await getStudentsSlugs(studentId);
            return new Promise((res, rej) => {
                if (!fs.existsSync(studentsFilePath)) {
                    return res([]);
                }
                fs.readFile(studentsFilePath, 'utf-8', async (err, data) => {
                    if (err) {
                        rej(err)
                    }
                    const { allStudents:students } = JSON.parse(data);
                    if (students && students.length > 0) {
                        res(students.map((student: { _id: string }) => ({id: (student._id)})));
                    }
                    res([]);
                });
            }) 

        } catch (err) {
            console.error(err);
            return [];
        }
    }
}


const studentService = new Service();
export default studentService;