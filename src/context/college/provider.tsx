'use client'
import React, { useEffect, useState } from 'react';
import { CollegeContext } from './context';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';
import { School } from './types';
import { getSchool } from '@/services/services.http';


interface CollegeContextProviderProps {
    children: React.ReactNode
}
export function CollegeContextProvider({children}: CollegeContextProviderProps) {
    const [school, setSchool] = useState<School | null>(null);

    useEffect(() => {
        handlGetSchoolDetails();
    }, []);

    const handlGetSchoolDetails = async () => {
        const { data:school } = await getSchool();
        // const schoolDetails: School = {
        //     currentSession: '2025/2026',
        //     semester: '1'
        // }
        school.semester = school.currentSemester;
        setSchool(school);
    }

   
    const values = {
        school: school,
        setSchoolDetails: setSchool
    }

    return(
        <CollegeContext.Provider value={values}>
            {children}
        </CollegeContext.Provider>
    )  
}