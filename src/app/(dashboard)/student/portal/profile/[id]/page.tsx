import _StudentCourseReg from "@/components/_courseReg";
import CourseReg from "@/components/courseReg";
import studentService from "@/lib/students";



interface Params {
    id: string
}

interface CourseRegPageProps {
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

export default async function ProfilePage({
    params
}: CourseRegPageProps) {
    return (
        <_StudentCourseReg>
            <CourseReg studentId={params.id}/>
        </_StudentCourseReg>
    )
}