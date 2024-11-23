import { Course, getAllCourses } from "../data/courses";

class CoursesService {
    courses = getAllCourses();

    async getAll(): Promise<Array<Course>> {
        return this.courses
    }

    async getAllCoursesTitle() {
        const courses = await this.getAll();

        if (courses && courses.length > 0) {
            return courses.map(course => ({title: course.title}))
        }
        return courses;
    }
    
    async getCourse(title: string) {
        const courses = await this.getAll();

        for (let i = 0; i < courses.length; i++) {
            let course = courses[i];
            if (title === course.title) {
                return course; 
            }
        }
        return null;
    }
}


const coursesService = new CoursesService();
export default coursesService;