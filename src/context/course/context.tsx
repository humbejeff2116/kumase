import { Course } from '@/data/courses';
import { createContext, useContext } from 'react';




interface initialContextType {
    getCourse: () => Course | null
    setCourse: (course: Course ) => void
}

const initialContext: initialContextType = {
    getCourse: () => null,
    setCourse: () => null 
}

export const CourseContext = createContext<initialContextType>(initialContext);

export default function useCourseContext() {
    return useContext(CourseContext);
}
