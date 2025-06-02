import { getStudentsSlugs } from "@/services/services.http";
import { Course, getAllCourses } from "../data/courses";

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
    async getStudentsSlugs(studentId?: string) {
        try {
            const { data:students } = await getStudentsSlugs(studentId);

            if (students && students.length > 0) {
                return students.map((student: { _id: string }) => ({id: (student._id)}));
            }
            return [];
        } catch (err) {
            console.error(err);
            // TODO... return empty array
            return [{id: 'hsjd'}];
        }
    }
}


const studentService = new Service();
export default studentService;