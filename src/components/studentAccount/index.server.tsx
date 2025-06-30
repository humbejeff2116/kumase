import { getStudent } from "@/services/services.http"
import { Suspense } from "react"
import StudentAccountClient from "./index.client";



interface StudentAccountProps {
    studentId: string
}

export default async function StudentAccountServer({
    studentId
}: StudentAccountProps) {
    // const student = await getStudent(studentId, 'id');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentAccountClient 
            // student={student}
            />
        </Suspense>
    )
}