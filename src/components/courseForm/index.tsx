'use client'
import useAuth, { User, userEnum } from "@/context/auth/context"
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
import { APIBase } from "@/services/services.http";
import { IMAGE_DOMAIN } from '@/services/http.config';


interface CourseFormProps {
    level: string | null
}

export default function CourseForm({
    level
}: CourseFormProps) {
    // const [courses, setCourses] = useState<Array<Course> | null>(null);
    const [showImageSelector, setShowImageSelector] = useState(false);

    const { user } = useAuth();
    const { school } = useCollegeContext();
    const courses = useMemo(() => {
        if (user?.department && level && school?.semester) {
            return getCourseFormCourses(user.department, level, school.semester);
        } 
        return null;  
    }, [level])

    useEffect(() => {
        if (!user?.profileImage) {
            setShowImageSelector(true);
        }
    }, []);

    const handleCLoseImageSelector = (e?: ButtonEvent) => {
        e?.stopPropagation();
        e?.preventDefault();
        setShowImageSelector(false);
    }

    return (
        <div className={styles.container1}>
            <ProfileImageUpdater 
            show={showImageSelector}
            handleCLose={handleCLoseImageSelector}
            />
            <Heading/>
            {user && (
                <UserDetails user={user}/>
            )}                    
            {!level ? (
                <EmptyForm/>
            ) : (
                <>
                    <CoursesOffering courses={courses}/>
                    <AdminSignatures/>
                </> 
            )}
        </div>
    )
}


function Heading() {
    const { user } = useAuth();
    const src = `${IMAGE_DOMAIN}/${user?.profileImage}`;

    return (
        <div className={styles.headingWrapper}>
            <div className={styles.headingLeft}>
                <div className={styles.headingLogoWrapper}>
                    <Image alt='KUCHTECH' src={logo}/>
                </div>
                <div className={styles.headingLogoText}>
                    Kumase college og Health tech
                </div>
            </div>

            <div className={styles.headingRight}>
                <div className={styles.userImageWrapper}>
                    <Image 
                    width={50} 
                    height={50} 
                    alt={`Photo of ${user?.firstName}`} 
                    src={src}
                    />
                </div>
            </div>
        </div>
    )
}

// TODO...
// type userDetails with user interface defined in auth context
// move userDetails to auth context


function chunkCols(user: User) {
    const userKeys = Object.keys(user);
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

interface UserDetailsProps {
    user: User
}

function UserDetails({
    user,
}: UserDetailsProps) {
    return (
        <div className={styles.userDetailsWrapper}>
            {chunkCols(userEnum).map((col, i) => {
                return (
                    <div key={i} className={styles.userDetailCol}>
                    {col.map((key, i) =>
                        <div key={i} className={styles.userDetail}>
                            {userEnum[key]}:
                            <span>
                                {key === 'department' ? (
                                    getDepartmentABreviation(user[key])
                                ) : key === 'course' ? (
                                    getCoursesABreviation(user[key])
                                ) : (
                                    user[key]  
                                )}
                            </span>  
                        </div> 
                    )}
                    </div>
                )
            })}
        </div>
    )
}


function EmptyForm() {
    return (
        <div className={styles.emptyFormContainer}>
            <EmptyState 
            heading="No Course Form" 
            writeUp="Kindly select your current level to get your course form"
            />
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
