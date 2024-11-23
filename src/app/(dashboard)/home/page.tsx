import _Profile from "@/components/_profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home Page',
    description: 'This is the home page',
}


export default function HomePage() {
    return (
        <div>
            <_Profile/>
        </div>
    )
}
  