import _AboutUs from "@/components/_aboutUs";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'About Us',
    description: 'About Kuchtech page description',
}

export default function AboutUsPage() {
    return (
        <div>
            <_AboutUs/>
        </div>
    )
}
