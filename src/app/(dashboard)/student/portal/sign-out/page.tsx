import _Logout from "@/components/_logout";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Log out',
    description: 'log out page deacription',
}

export default function SignoutPage() {
    return (
        <div>
            <_Logout/>
        </div>
    )
}