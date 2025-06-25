import { Suspense } from 'react';
import { authenticateCourseReg, getStudent } from '@/services/services.http';
import TokenAuth from './tokenAuth';


interface CourseRegprops {
    studentId: string
}
export default async function CourseReg({
    studentId
}: CourseRegprops) {
    try {
        const { isRegistered } = await authenticateCourseReg(studentId);
        const { studentToken, data:student } = await getStudent(studentId, 'id');
        
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <TokenAuth 
                student={student} 
                studentToken={studentToken}
                isRegistered={isRegistered}
                />
            </Suspense>
        )
    } catch (err) {
        console.error('error occured while rendering CouresReg component');
        return (
        // TODO... display a proper error component
            <div>
               Oppps!!! (An Error has  occured)!!!
            </div>
        )
    }
}
