'use client'
import Heading from "../heading";
import styles from './index.module.css';
import LandingPageSectionWrapper from '../landing/sectionWrapper';
import CourseForm from "../courseForm/index.server";
import BackButton from "../backButton";
import Link from "next/link";
import { IconContext } from "react-icons";
import { RiUser3Line } from "react-icons/ri";
import appRoutes from "@/routes";


export default function _StudentCourseForm({
    studentId
}: {studentId: string}) {

    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionWrapper}
        showWave
        // useWave2
        >
            <Header/>
            <Heading text="Course Form"/>
            <CourseForm studentId={studentId}/>
        </LandingPageSectionWrapper> 
    )
}

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.linksWrapper}>
                <BackButton
                buttonWrapperClassName={styles.backButtonWrapper}
                buttonIconClassName={styles.backButtonIcon}
                />
                <Link href={appRoutes.home} className={styles.link}>
                    <IconContext.Provider value={{className: styles.linkIcon}}>
                        <RiUser3Line/>
                    </IconContext.Provider>
                    My dashboard
                </Link>
            </div>
        </header>
    )
}