import { Suspense } from "react";
import CourseFormClient from "./index.client";
import { authenticateCourseReg } from "@/services/services.http";
import { ErrorState } from "../errorState";


interface CourseFormprops {
    studentId: string
}

export default async function CourseForm({
    studentId
}: CourseFormprops) {
    try {
        const { isRegistered } = await authenticateCourseReg(studentId);
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <CourseFormClient isRegistered={isRegistered}/>
            </Suspense>
        )
    } catch (err) {
        console.error('error occured while getting student', err);
        return (
            <ErrorState
            dontShowReloadButton
            heading="Error!!!"
            writeUp="Error occured while authenticating course registration" 
            imageAlt={"Photo of authenticating course registration"}            
            />
        )
    }
}