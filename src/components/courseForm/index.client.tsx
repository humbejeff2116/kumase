'use client'
import useAuth, { Student, User, userEnum } from "@/context/auth/context"
import Image from "next/image"
import styles from './index.module.css';
import { Course } from "@/data/courses/communityHealth";
import { useEffect, useState, useMemo } from "react";
import getCourseFormCourses from "@/data/courses/index";
import EmptyState from "../emptyState";
import useCollegeContext from "@/context/college/context";
import logo from '@/images/logo/JPG/kumase.jpg';
import React from "react";
import { getCoursesABreviation, getDepartmentABreviation } from "@/lib";
import ProfileImageUpdater from "../ProfileImageUpdater";
import { ButtonEvent } from "../types/events";
import { IMAGE_DOMAIN, APIBase } from '@/services/http.config';
import { School } from "@/context/college/types";
import Link from "next/link";
import appRoutes from "@/routes";
import { Timer } from "../types";


interface CourseFormProps {
    isRegistered: boolean
}

export default function CourseFormClient({
    isRegistered
}: CourseFormProps) {
    const [showImageSelector, setShowImageSelector] = useState(false);
    const { student } = useAuth();
    const { school } = useCollegeContext();
    let timer: Timer = null;

    const courses = useMemo(() => {
        if (student?.department && student?.level && school?.semester) {
            return getCourseFormCourses(student.department, student?.level, school.semester);
        } 
        return null;  
    }, [student, school]);

    useEffect(() => {
        if (!student?.profileImage) {
            setShowImageSelector(true);
        }
    }, [student]);

    useEffect(() => {
        if (isRegistered) {
            timer = setTimeout(() => window.print(), 300);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const handleCLoseImageSelector = (e?: ButtonEvent) => {
        e?.stopPropagation();
        e?.preventDefault();
        setShowImageSelector(false);
    }

    return (
        <>
        <div className={styles.container1}>
            <Heading/>
            {student && (
                <StudentDetails student={student}/>
            )}
            {!isRegistered ? (
                <EmptyForm 
                student={student} 
                school={school}
                />
            ) : (
                <>
                <CoursesOffering courses={courses}/>
                <AdminSignatures/>
                </>  
            )}                    
        </div>
        </>
    )
}


function Heading() {
    const { student } = useAuth();
    const src = `${IMAGE_DOMAIN}/${student?.profileImage}`;

    return (
        <div className={styles.headingWrapper}>
            <div className={styles.headingLeft}>
                <div className={styles.headingLogoWrapper}>
                    <Image alt='KUCHTECH' src={logo}/>
                </div>
                <div className={styles.headingLogoText}>
                    Kumase College of Health Technology
                </div>
            </div>

            <div className={styles.headingRight}>
                <div className={styles.userImageWrapper}>
                    <Image 
                    width={50} 
                    height={50} 
                    alt={`Photo of ${student?.firstName}`} 
                    src={src}
                    />
                </div>
            </div>
        </div>
    )
}


function chunkCols(student: any) {
    const userKeys = Object.keys(student);
    let start = 0;
    let rows = 3
  	const cols = Math.ceil(userKeys.length / rows);
    const arr = [];
  
    for (let i = 0; i < cols; i++) {
        arr.push(userKeys.slice(start, rows));
        start = start + 3;
        rows = rows + 3;
    }
    return arr;
}

interface StudentDetailsProps {
    student: Student
}


interface UserEnumClone extends User {
    session?: string 
    semester?: string
}
function StudentDetails({
    student,
}: StudentDetailsProps) {
    const { school } = useCollegeContext();

    const userEnumClone: UserEnumClone | null = useMemo(() => {
        if (school) {
            return ({
                ...userEnum, 
                currentSession: 'Session', 
                semester: 'Semester'
            })
        }
        return null

    }, [school]);

    return (
        <div className={styles.userDetailsWrapper}>
            {userEnumClone && school && (
                chunkCols(userEnumClone).map((col, i) => {
                    return (
                        <div key={i} className={styles.userDetailCol}>
                        {col.map((key, i) =>
                            <div key={i} className={styles.userDetail}>
                                {userEnumClone[key]}:
                                <span>
                                {student[key] ? (
                                    key === 'department' ? (
                                        getDepartmentABreviation(student[key])
                                    ) : key === 'course' ? (
                                        getCoursesABreviation(student[key])
                                    ) : (
                                        student[key]  
                                    )
                                ) : school[key] ? school[key] : null}
                                </span>  
                            </div> 
                        )}
                        </div>
                    )
                })
            )}
        </div>
    )
}

interface EmptyFormProps {
    student: Student | null
    school: School | null
}

function EmptyForm({
    student,
    school
}: EmptyFormProps) {

    // TODO... use extracted student link hook
    const href = useMemo(() => {
        return ((student: Student | null) => {
            return `${appRoutes.courseReg}/${student && 
            encodeURIComponent(student.id || student._id)}`;
        })(student);
    }, [student])

    return (
        <div className={styles.emptyFormContainer}>
            <EmptyState 
            // emptyContainerClassName={styles.emptyContainer}
            // emptyContentWrapperClassName={styles.emptyContentWrapper}
            heading="Courses Not Available!!!" 
            writeUp=''
            >
                <div className={styles.emptyFormChildTop}>
                    <div className={styles.emptyFormChild}>
                        Hi{' '} 
                        <Link href={appRoutes.profile}>
                        {student?.surname} {student?.firstName}
                        </Link> 
                        <span className={styles.regNo}>
                        {' '}({student?.regNo})
                        </span>
                    </div> 

                    <div className={styles.emptyFormChild}>
                        You are yet to register your courses for 
                        <span>{' '}{school?.semester}</span>
                        <sup>{(school?.semester)?.toString() === '1' ? 'st' : 'nd'}</sup>
                        {' '}(semester) of the <span>{school?.currentSession}</span> Academic (session)
                    </div>
                </div>
                <div className={styles.emptyFormLinkWrapper}>
                    <Link href={href}> 
                    Register Courses
                    </Link>
                </div>
            </EmptyState>
        </div>
    )
}


interface CoursesOfferingProps {
    courses: Array<Course> | null
}

function CoursesOffering({
    courses
}: CoursesOfferingProps) {
        return (
            <div className={styles.tableWRapper}>
                <table>
                    <thead>
                        <tr>
                            <th scope="row" colSpan={4} className={styles.tableHeading}>Courses Offering</th>
                        </tr>
                        <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Unit Load</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Lecturer</th>
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
                                <td></td>
                            </tr>
                        )}
                        <CarryOverCourses/>
                        </>
                    )}
                    </tbody>
                </table>
            </div>
    )
}

function CarryOverCourses() {
    return (
        <>
        <tr>
            <th scope="row" colSpan={4}>Carry Over Course</th>
        </tr>
        {[1,2,3].map((_, i) =>
            <tr key={i}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>  
        )}
        </>

    )
}

function AdminSignatures() {
    return (
        <div className={styles.signaturesWrapper}>
            <div className={styles.signaturesTop}>
                <div className={styles.signaturesTopChild}>
                    <Signature name="Officer 1"/>
                </div>
                <div className={styles.signaturesTopChild}>
                <Signature name="Officer 2"/>
                </div>
            </div>
            <div className={styles.signaturesBottom}>
            <Signature name="Provost"/>
            </div>
        </div>
    )
}

interface SignatureProps {
    name: string
}
function Signature({
    name
}: SignatureProps) {
    return (
        <div className={styles.signature}>
            ........................................................
            <div className={styles.signatureName}>{name}</div>
        </div>
    )
}
