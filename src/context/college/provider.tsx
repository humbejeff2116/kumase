'use client'
import React, { useEffect, useState } from 'react';
import { CollegeContext } from './context';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';
import { School } from './types';


interface CollegeContextProviderProps {
    children: React.ReactNode
}
export function CollegeContextProvider({children}: CollegeContextProviderProps) {
    const [school, setSchool] = useState<School | null>(null);

    useEffect(() => {
        handlGetSchoolDetails();
    }, []);

    const handlGetSchoolDetails = () => {
        // TODO... get school details from server
        const schoolDetails: School = {
            currentSession: '2023/2024',
            semester: '1'
        }
        setSchool(schoolDetails);
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