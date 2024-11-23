'use client'
import Image from 'next/image';
import defaultIllustration from '@/images/illustration/freepick/med-students-2.svg';
import BackButton from '../backButton';
import styles from './index.module.css';
import { Course, getCoursesAuthor } from '@/data/courses';
import { PostProfile, ProfileAndShare } from '../aboutUs/postCard';
import { IconContext } from 'react-icons';
import { BiBuilding } from 'react-icons/bi';
import LandingPageSectionWrapper from '../landing/sectionWrapper';


interface CourseProps {
    course: Course | null
}



export default function CoursePageComp({
    course,
}: CourseProps) {

    // TODO... modify to return empty course component
    if (!course) return null;

    const {
        id,
        title:courseTitle,
        department,
        // date,
        content,
        duration,
        entryRequirement,
        certificateType,
        tags,
        image
    } = course;

    return (
            <LandingPageSectionWrapper 
            useDefaultChildWrapper
            containerModifyClass={styles.sectionContainer}
            childWrapperModifyClass={styles.sectionWrapper}
            showWave
            >
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarButtons}>
                        <BackButton
                        buttonWrapperClassName={styles.backButtonWrapper}
                        buttonIconClassName={styles.backButtonIcon}
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.imageWrapper}>
                        <Image src={image || defaultIllustration} alt=""/>
                    </div>
                    <div className={styles.body}>
                        <ProfileAndShare
                        profile={
                            <PostProfile 
                            {...getCoursesAuthor()}
                            // date={date}
                            />
                        }
                        />
                        <div className={styles.title}>
                            {courseTitle}
                        </div>
                        <div className={styles.department}>
                            <div>
                                <IconContext.Provider value={{className: styles.icon}}>
                                    <BiBuilding/>
                                </IconContext.Provider>
                            </div>
                            {department}
                        </div>
                        {tags && (
                            <div className={styles.tagsWrapper}>
                            <ul className={styles.tagsUl}>
                            {tags.map((tag, i) => 
                                <li key={i} className={styles.tagsLi}>
                                    #{tag}
                                </li>
                            )}
                            </ul>
                        </div>
                        )}
                        <div className={styles.content}>
                            {content}
                        </div>
                        <div className={styles.entryRequirements}>
                            <EntryRequirementsTable 
                            duration={duration} 
                            entryRequirement={entryRequirement} 
                            certificateType={certificateType}/>
                        </div>
                    </div>
                </div>
            </div>
            </LandingPageSectionWrapper>
    )
}

interface EntryRequirementsTableProps {
    duration: string
    entryRequirement: string
    certificateType: string
}

export function EntryRequirementsTable({
    duration,
    entryRequirement,
    certificateType
}: EntryRequirementsTableProps) {
    return (
        <table 
        className={styles.requirementsTable} 
        cellPadding="5%" 
        cellSpacing="0"
        >
            <caption>Entry Requirement</caption>
            <thead>
                <tr>
                    <th>DURATION</th>
                    <th>ENTRY REQUIREMENT</th>
                    <th>CERTIFICATION</th>
                </tr> 
            </thead>
            <tbody>
                <tr>
                    <td>{duration}</td>
                    <td><div>{entryRequirement}</div></td>
                    <td>{certificateType}</td>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
    )
}