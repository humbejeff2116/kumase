import Courses from "@/components/courses";
import { FullPageLoader } from "@/components/loader/spinner";
import coursesService from "@/lib/courses";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: 'Courses | Kuchtech',
    description: 'Courses page',
}


export default async function CoursesPage() {
    const courses = await coursesService.getAll();

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <Courses courses={courses}/>   
        </Suspense>
    )
}