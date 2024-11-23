import _StudentCourseForm from "@/components/_courseForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Course form',
    description: 'This is the student course form page',
}



export default function OnbardingPage() {
    return (
        <_StudentCourseForm/>
    )
}