import { createContext, useContext } from 'react';
import { School } from './types';




interface initialContextType {
    school: School | null
    setSchoolDetails: (school: School) => void
}

const initialContext: initialContextType = {
    school: null,
    setSchoolDetails: () => null 
}

export const CollegeContext = createContext<initialContextType>(initialContext);

export default function useCollegeContext() {
    return useContext(CollegeContext);
}
