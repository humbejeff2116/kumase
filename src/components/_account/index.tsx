import LandingPageSectionWrapper from "../landing/sectionWrapper";
import Heading from "../heading";
import styles from './index.module.css';





export default function _Account({
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
            <Heading text="My Acount"/>
            <div className={styles.formWrapper}>
                {children}
            </div>
        </LandingPageSectionWrapper> 
    )
}