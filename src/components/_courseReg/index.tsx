import styles from './index.module.css';
import LandingPageSectionWrapper from '../landing/sectionWrapper';
import Heading from "../heading";

export default function _StudentCourseReg({
    children
}: {children: React.ReactNode}) {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionWrapper}
        showWave
        // useWave2
        >
            <Heading heading="Course Reg"/>
            <div className={styles.formWrapper}>
                {children}
            </div>
        </LandingPageSectionWrapper> 
    )
}