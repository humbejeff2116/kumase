"use client"
import Link from "next/link";
import { Course as CourseCard } from "../landing/component3";
import { Course, departments, getCoursesByDepartment } from "@/data/courses";
import styles from './index.module.css';
import LandingPageSectionWrapper from "../landing/sectionWrapper";
import { useEffect, useMemo, useState } from "react";
import { SelectChangeEvent } from "../types/events";
import { IconContext } from "react-icons";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiSettings2Line } from "react-icons/ri";
import { Timer } from "../types";
import { Spinner } from "../loader/spinner";

interface CoursesProps {
    courses: Array<Course>
}


export default function Courses({
    courses,
}: CoursesProps) {
    const [activeTab, setActiveTab] = useState(Object.keys(departments)[0]);
    const [loading, setloading] = useState(false);
    let timer: Timer = null;

    useEffect(() => {
        
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        };
    }, []);

    const handleSetTab = (e: SelectChangeEvent) => {
        if (!e.target || !e.target.value) return;
        setActiveTab(e.target.value);
        setloading(true);
        
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            timer = setTimeout(() => setloading(false), 800);
            return;
        }
        setloading(true);
        timer = setTimeout(() => setloading(false), 500);
    }

    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.coursesContainer}
        childWrapperModifyClass={styles.sectionOneWrapper}
        showWave
        >
           <Header text="Courses We Offer"/>
            <div className={styles.selectWrapper}>
                <div className={styles.selectLeft}>
                    <IconContext.Provider value={{className: styles.selectIcon}}>
                        <RiSettings2Line/>
                    </IconContext.Provider>
                </div>
                <div className={styles.selectRight}>
                    <label>
                        Department
                    </label>
                    <select onChange={handleSetTab} value={activeTab}>
                    {Object.keys(departments).map((key, _) =>
                        <option key={key} value={key}>
                            {departments[key as keyof typeof departments]}
                        </option>
                    )}
                    </select>
                </div>
            </div>
            <CoursesList 
            department={activeTab} 
            courses={courses}
            loading={loading}
            />
        </LandingPageSectionWrapper>

    )
}

export function Header({
    text
}: {text: string}) {
    return (
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>
            {text}
            </h1>
        </div>
    )
}

interface CoursesListProps extends CoursesProps {
    department: string
    loading: boolean
}

function CoursesList({
    courses,
    department,
    loading
}: CoursesListProps) {

    const displayCourses = useMemo(() => {
        return getCoursesByDepartment(courses, department)
    }, [courses, department]);

    return (
        <>
        {loading ? (
            <Spinner/>
        ) : (
            <ul className={styles.coursesList}>
            {displayCourses?.map((course, i) =>
                <li key={course.id ?? i} className={styles.li}>
                    <Link href={`/courses/${encodeURIComponent(course.title)}`}>
                        <CourseCard {...course}/>
                    </Link>
                </li>     
            )}
            </ul> 
        )}
        </>
    )
}
