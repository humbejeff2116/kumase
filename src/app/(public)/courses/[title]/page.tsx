import Course from "@/components/course";
import coursesService from "@/lib/courses";


interface Params {
    title: string
}

interface CoursePageProps {
    params: Params
}


export async function generateStaticParams() {
    const params = await coursesService.getAllCoursesTitle(); 
    return params;
}

export default async function CoursePage({
    params
}: CoursePageProps) {
    const course = await coursesService.getCourse(decodeURIComponent(params.title));

    return (
        <Course course={course}/>
    )
}