'use client';
import { useMemo } from 'react';
import styles from './index.module.css';
// import { Course } from "@/data/courses/communityHealth";
import useAuth from '@/context/auth/context';
import useCollegeContext from '@/context/college/context';
import getCourseFormCourses from '@/data/courses';
import logo from '@/images/logo/JPG/kumase.jpg';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { BiPrinter } from 'react-icons/bi';
import Link from 'next/link';
import appRoutes from '@/routes';


export default function StudentCourses() {
    // TODO... replace/remove user with student
        const { student, user } = useAuth();
        const { school } = useCollegeContext();
        
    const courses = useMemo(() => {
        if (user?.department && user?.level && school?.semester) {
            return getCourseFormCourses(user.department, user.level, school.semester);
        } 
        return null;  
    }, []);


    return (

        <>
        <div className={styles.tableWRapper}>
            <div className={styles.schoolDetailsWrapper}>
                <div className={styles.schoolDetailsLeft}>
                    <div className={styles.headingLogoWrapper}>
                        <Image alt='KUCHTECH' src={logo}/>
                    </div>
                </div>

                <div className={styles.schoolDetailsRight}>
                    <div className={styles.schoolDetailWrapper}>
                        Session
                        <div className={styles.schoolDetail}>
                            {school?.currentSession || 2025/2026}
                        </div>
                    </div>
                    <div className={styles.schoolDetailWrapper}>
                        Semester
                        <div className={styles.schoolDetail}>
                            {school?.semester || 1}<sup>st</sup>
                        </div>
                    </div>
                    <div className={styles.schoolDetailWrapper}>
                        Level
                        <div className={styles.schoolDetail}>
                            {student?.level || 100}
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Unit Load</th>
                        <th scope="col">Course Title</th>
                        {/* <th scope="col">Lecturer</th> */}
                    </tr>
                </thead>

                <tbody>
                {!courses ? (
                    <tr>
                        Loading courses...
                    </tr>
                ) : (
                    <>
                    {courses.map((course, i) => 
                        <tr key={i}>
                            <td>{course.code}</td>
                            <td>{course.unitLoad}</td>
                            <td>{course.title}</td>
                            {/* <td></td> */}
                        </tr>
                    )}
                    </>
                )}
                </tbody>
            </table>
        </div>
        {courses && (
            <PrintCourseForm/>
        )}
        </>
    )
}



function PrintCourseForm() {
    return (
        <div className={styles.printCourseFormWrapper}>
            <Link href={appRoutes.courseForm}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <BiPrinter/>
                </IconContext.Provider>
                Print Course Form
            </Link>
        </div>
    )
}