import _StudentCourseForm from "@/components/_courseForm";
import CourseForm from "@/components/courseForm/index.server";
import studentService from "@/lib/students";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Course form',
    description: 'This is the student course form page',
}


interface Params {
    id: string
}

interface CourseFormPageProps {
    params: Params
}

export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
    // try {
        const params = await studentService.getStudentsSlugs(); 
        return params;
    // } catch(err) {
    //     console.error(err);
    //     return [];
    // }
}

export default function CourseFormPage({
    params
}: CourseFormPageProps) {
    return (
        <_StudentCourseForm studentId={params.id}/>
    )
}