import { levels, semesters } from "@/context/college/types"
import levelOneCourses from "./level1"
import levelTwoCourses from "./level2"
import levelThreeCourses from "./level3"


export interface Course {
    code: string
    unitLoad: string
    title: string
    duration?: string
}



const communityHealthCoursesService = {
    getSemesterCourses(level: string, semester: string) {
        const courses = this.getCourses(level);
        switch (semester) {
            case semesters.first:
                return courses.firstSemester;
            case semesters.second:
                return courses.secondSemester;
            default:
                return courses.firstSemester;
        }
    },

    getCourses(level: string) {
        switch (level) {
            case levels.one:
                return levelOneCourses  

            case levels.two:
                return levelTwoCourses  

            case levels.three: 
                return levelThreeCourses 
            default:
                return levelOneCourses
        }  
    }
}

export default communityHealthCoursesService;