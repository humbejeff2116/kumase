import _StudentOnboarding from "@/components/_student-onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Onboarding Page',
    description: 'This is the student onboarding page',
}



export default function OnbardingPage() {
    return (
        <_StudentOnboarding/>
    )
}