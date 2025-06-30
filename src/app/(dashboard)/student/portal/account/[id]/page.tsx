import _Account from "@/components/_account";
import CourseReg from "@/components/courseReg";
import StudentAccount from "@/components/studentAccount/index.server";
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
}

export default async function AccountPage({
    params
}: CourseRegPageProps) {
    return (
        <_Account>
            <StudentAccount studentId={params.id}/>
        </_Account>
    )
}