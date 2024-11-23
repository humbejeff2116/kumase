'use client'
import React, { useEffect, useState } from 'react';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';
import { CourseContext } from './context';
import { Course } from '@/data/courses';


interface CourseContextProviderProps {
    children: React.ReactNode
}
export function CourseContextProvider({children}: CourseContextProviderProps) {
    const [course, setCourse] = useState<Course | null>(null);

    const getCourse = () => course;

    const values = {
        getCourse: getCourse,
        setCourse: setCourse
    }

    return(
        <CourseContext.Provider value={values}>
            {children}
        </CourseContext.Provider>
    )  
}