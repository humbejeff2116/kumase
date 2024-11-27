
import _ContactUs from "@/components/_contactUs";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact Kumase College of health technology',
}

export default function ContactUsPage() {
    return (
        <div>
            <_ContactUs/>
        </div>
    )
}

