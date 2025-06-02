import { StaticImageData } from 'next/image';
import { createContext, useContext } from 'react';
import { StudentToken } from './types';



interface initialContextType {
    studentToken: StudentToken | null
    setStudentToken: (studentToken: StudentToken) => void
}

const initialContext: initialContextType = {
    studentToken: null,
    setStudentToken: () => null
}



export const StudentTokenContext = createContext<initialContextType>(initialContext);
export default function useStudentToken() {
    return useContext(StudentTokenContext);
}
