'use client'
import Image from 'next/image';
import { ContactAddress, section10Data } from '../landing/contactUs';
import LandingPageSectionWrapper from '../landing/sectionWrapper';
import styles from './index.module.css';
import defaultIllustration from '@/images/illustration/freepick/med-students-2.svg';
import { Header } from '../courses';



export default function ContactUs() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionTwoWrapper}
        // backgroundImage={<BackgroundImages />}
        showWave
        >
            <Header text="Contact us"/>
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    <ContactAddress 
                    heading={section10Data.contact1.place} 
                    address={section10Data.contact1.address} 
                    number={section10Data.contact1.number} 
                    email={section10Data.contact1.email}
                    />
                </div>
                <div className={styles.topRight}>
                    <Image src={defaultIllustration} alt='contact us photo'/>
                </div>
            </div>
            <div>

            </div> 
        </LandingPageSectionWrapper>
    )
}