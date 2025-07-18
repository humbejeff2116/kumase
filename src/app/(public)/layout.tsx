import type { Metadata } from "next";
import localFont from "next/font/local";
import { CourseFormLayout, MainLayout, PublicLayout } from '@/components/layout';
import AdminLayoutComp from "@/components/layout/admin";
// import "../globals.css";

// const geistSans = localFont({
//     src: "../fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });

// const geistMono = localFont({
//     src: "../fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="en">
            // <body
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            // >
            <MainLayout>
                {children}
            </MainLayout>
            // </body>
        // </html>
    );
}

export function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="en">
            // <body
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            // >
            <PublicLayout dontShowFooter>
                {children}
            </PublicLayout>
            // </body>
        // </html>
    );
}

export function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminLayoutComp>
            {children}
        </AdminLayoutComp>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="en">
            // <body
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            // >
            <PublicLayout>
                {children}
            </PublicLayout>
            // </body>
        // </html>
    );
}

export function StudentCourseFormLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CourseFormLayout>
            {children}
        </CourseFormLayout>
    )
}