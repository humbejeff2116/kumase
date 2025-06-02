'use client'
import React, { useEffect, useState } from 'react';
import { StudentTokenContext } from './context';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';
import { StudentToken } from './types';



interface StudentTokenContextProviderProps {
    children: React.ReactNode
}
export function AuthContextProvider({children}: StudentTokenContextProviderProps) {
    const [studentToken, setStudentToken] = useState<StudentToken | null>(null);
   
    // useEffect(()=> {
    //     setStateOnload();
    // }, []);



    const setTokenData = (studentToken: StudentToken) => {
        setStudentToken(studentToken);
    }

   
    const values = {
        studentToken: studentToken,
        setStudentToken: setTokenData,

    }

    return(
        <StudentTokenContext.Provider value = { values }>
            { children }
        </StudentTokenContext.Provider>
    )  
}