'use client'
import Link from 'next/link';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { BiBookBookmark } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';
import LandingPageSectionWrapper from '../sectionWrapper';
import Image, { StaticImageData } from 'next/image';
import appRoutes from '@/routes';
import { getAllCourses } from '@/data/courses/index';

export default function Courses() {

    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionOneWrapper}
        showWave
        // useWave2
        >
            <div className={styles.headerWrapper}>
                <h1 className={styles.header}>
                Courses We Offer
                </h1>

                <Link href={appRoutes.courses} className={styles.viewCoursesLink}>
                View All Courses
                <IconContext.Provider value={{className: styles.viewCoursesLinkIcon}}>
                    <FiArrowRight/>
                </IconContext.Provider>
                </Link>
            </div>
            <div className={styles.body}>
            {getAllCourses().slice(0, 6).map((course, i) =>
                <Course key={i} {...course} showDept/>
            )}
            </div>
        </LandingPageSectionWrapper>
    )
}

export interface CourseProps {
    title: string
    department: string
    image: StaticImageData | string
    showDept?: boolean
}
export function Course({
    title,
    department,
    image,
    showDept
}: CourseProps) {
    return (
        <div className={styles.childWrapper}>
            <div className={styles.courseWrapper}>
                <div className={styles.imageWrapper}>
                    <div className={styles.iconWrapper}>
                        <IconContext.Provider value={{className: styles.courseImageIcon}}>
                            <BiBookBookmark/>
                        </IconContext.Provider>
                    </div>
                    <Image src={image} alt={title}/>
                </div>
                <div className={styles.courseContentWrapper}>
                    <h3>
                        {title}
                    </h3>
                    {showDept && (
                        <p>
                        Department of {department}
                        </p>
                    )}
                    <div className={styles.linkWrapper}>
                        <Link 
                        href={`/courses/${encodeURIComponent(title)}`}
                        className={styles.courselink}
                        >
                            View
                            <IconContext.Provider value={{className: styles.linkIcon}}>
                                <FiArrowRight/>
                            </IconContext.Provider>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}