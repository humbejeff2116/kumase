import { Suspense } from 'react';
import { authenticateCourseReg, getStudent } from '@/services/services.http';
import TokenAuth from './tokenAuth';




// get student token from api for the session
//check if student has registered course,
// if student has registered course,
//display the course form component
//if student has not registered course,
// display the token authentication form
//


//if user has a token, display the token
//user enters token in form
// collect token
// if no active token, d
interface CourseRegprops {
    studentId: string
}
export default async function CourseReg({
    studentId
}: CourseRegprops) {
    try {
        // const { isRegistered } = await authenticateCourseReg(studentId);
        // const { studentToken, student } = await getStudent(studentId);

        const { isRegistered } = {
            isRegistered: false
        }
        const { studentToken, student } = {
            studentToken: {
                _id: "string",
                studentId: "hsjd",
                value: "A99bc_b99hyHGf",
                session: "string",
                semester: "string",
                purchaseTime: "string",
            },
            student: {
                _id: 'hsjd',
                id: 'hsjd',
                surname: 'John',
                firstName: 'Doe',
                regNo: 'dt/2012/177',
                level: '100'

            }   
        };
        
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
        console.error('error occured while getting student', err);
    }
}
