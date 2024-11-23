import { AuthContextProvider } from "@/context/auth/provider";
import { CollegeContextProvider } from "@/context/college/provider";
import NprogressProvider from "@/context/nprogress/provider";
import { CourseContextProvider } from "@/context/course/provider";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <NprogressProvider>
            <AuthContextProvider>
            <CollegeContextProvider>
            <CourseContextProvider>
            {children}
            </CourseContextProvider>
            </CollegeContextProvider>
            </AuthContextProvider>
            </NprogressProvider>  
        </body>
        </html>
    );
}