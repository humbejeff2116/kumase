import LandingPageSectionWrapper from "@/components/landing/sectionWrapper";
import GenStudentToken from "../genStudentToken";
import styles from './index.module.css';
import Heading from "@/components/heading";


export default function _StudentToken() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionTwoWrapper}
        // backgroundImage={<BackgroundImages />}
        showWave
        >
            <Heading text="Generate Student Token" />
            <GenStudentToken/>
        </LandingPageSectionWrapper>
    )
}