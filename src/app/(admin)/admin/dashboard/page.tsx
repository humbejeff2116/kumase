import _AdminDashboard from "@/components/_admin";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Admin Dashboard Page',
    description: 'This is the admin page',
}


export default function AdminDashboardPage() {
    return (
        <div>
            <_AdminDashboard/>
        </div>
    )
}
  