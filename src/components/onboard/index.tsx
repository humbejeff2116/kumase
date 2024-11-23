import FormWrapper from "./formWrapper";
import LandingPageSectionWrapper from '../landing/sectionWrapper';
import styles from './index.module.css';
import Heading from "../heading";




export default function OnboardStudent() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionWrapper}
        showWave
        // useWave2
        >
            <Heading heading="Student Onboarding"/>
            <FormWrapper/>
        </LandingPageSectionWrapper>
    )
}