'use client'
import Image from 'next/image';
import LandingPageSectionWrapper from '../sectionWrapper';
import { IconContext } from 'react-icons';
import { BiBookmark } from 'react-icons/bi';
import styles from './index.module.css';
import Link from 'next/link';
import provostimage from '@/images/provost-crop-min.jpg';
import wave1 from '@/images/background/wave1.svg';
import appRoutes from '@/routes';


const whoWeAreData = {
    tag: `Down Memory Lane`,
    heading: `The Ideas Of How It All Began`,
    body: `Dependence on government on all spheres of life is no longer feasible. 
        Non-governmental organizations including well meaning individuals have to embark 
        on a number of calculated strategies to compliment government efforts in all aspects 
        of human endeavours. Despite the existence of numerous colleges or schools of Health 
        Technologies in each state of the Federation...`

}

export default function WHoWeAre() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionTwoWrapper}
        // backgroundImage={<BackgroundImages />}
        showWave
        >
            <div className={styles.childWrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentTag}>
                        {whoWeAreData.tag}
                    </div>
                    <h1 className={styles.contentHeading}>
                        {whoWeAreData.heading}
                    </h1>
                    <p className={styles.contentbody}>
                        {whoWeAreData.body}
                    </p>
                    <div className={styles.linkWrapper}>
                        <Link href={appRoutes.about}>
                        Read On
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.childWrapper}>
                <div className={styles.imageWrapper}>
                    <Image src={provostimage} alt='picture of the school provost'/>
                    <div className={styles.imageCaptionWrapper}>
                        <div className={styles.imageCaptionIconWrapper}>
                        <IconContext.Provider value={{className: styles.icon}}>
                            <BiBookmark/>
                        </IconContext.Provider>
                        </div>
                        <div className={styles.imageCaption}>
                            <figcaption>
                                <cite>
                                    <strong className={styles.imageCaptionName}>
                                        Orayima Philip .T,  
                                    </strong>
                                    <span className={styles.imageCaptionTitle}>
                                     {' '}Provost Kumase college of health technology
                                    </span>
                                </cite>
                          </figcaption>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageSectionWrapper>
    )
}

export function BackgroundImagesWrapper({
    children
}: {children: React.ReactNode}) {
    return (
        <div className={styles.svgWrapper}>
        {children}
        {/* <Image src={wave1} alt='' className={styles.svg} /> */}
        </div>
    )
}