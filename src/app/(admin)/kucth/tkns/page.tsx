import _StudentToken from "@/components/admin/_genStudentToken";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Admin Page',
    description: 'This is the admin page',
}


export default function AdminPage() {
    return (
        <div>
            <_StudentToken/>
        </div>
    )
}
  