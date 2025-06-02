import React from 'react';
import LandingPageSectionWrapper from '../sectionWrapper';
import styles from './index.module.css';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import defaultIllustration from '@/images/illustration/freepick/med-students-1.svg';
import appRoutes from '@/routes';

export default function Intro() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper={false}
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionOneWrapper}
        backgroundImage={
            <>
            {/* <Polygon containerModifyClass={styles.polygon}/> */}
            <BackgroundImages/>
            </>   
        }
        showWave
        useWave2
        >
            <div className={styles.child}>
                <h1>
                    Kumase Coll<span>e</span>ge Of <span>Health</span> Technology
                </h1>
                <p>
                Promoting health care devilery service through 
                training and retraining of health personnel.
                </p>
                <div className={styles.linkWrapper}>
                    <Link href={appRoutes.courses}>
                    Apply Here
                    </Link>
                </div>
            </div>
        </LandingPageSectionWrapper>
    )
}


interface BackgroundImagesProps {
    dontShowDefaultImage?: boolean 
    illustration?: string | StaticImageData
    children?: React.ReactNode 
}
export function BackgroundImages({
    dontShowDefaultImage,
    illustration,
    children
}: BackgroundImagesProps) {
    return (
        <div className={styles.backgroundImagesContainer}>
            {children}
            {dontShowDefaultImage ? null : (
                <Image src={illustration ?? defaultIllustration} alt='' className={styles.svg1}/>
            )}
            {/* <svg
            className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,0L0,128L62.6,128L62.6,96L125.2,96L125.2,128L187.8,128L187.8,288L250.4,288L250.4,192L313,192L313,64L375.7,64L375.7,224L438.3,224L438.3,128L500.9,128L500.9,192L563.5,192L563.5,256L626.1,256L626.1,96L688.7,96L688.7,96L751.3,96L751.3,192L813.9,192L813.9,192L876.5,192L876.5,128L939.1,128L939.1,128L1001.7,128L1001.7,256L1064.3,256L1064.3,128L1127,128L1127,160L1189.6,160L1189.6,96L1252.2,96L1252.2,0L1314.8,0L1314.8,288L1377.4,288L1377.4,128L1440,128L1440,320L1377.4,320L1377.4,320L1314.8,320L1314.8,320L1252.2,320L1252.2,320L1189.6,320L1189.6,320L1127,320L1127,320L1064.3,320L1064.3,320L1001.7,320L1001.7,320L939.1,320L939.1,320L876.5,320L876.5,320L813.9,320L813.9,320L751.3,320L751.3,320L688.7,320L688.7,320L626.1,320L626.1,320L563.5,320L563.5,320L500.9,320L500.9,320L438.3,320L438.3,320L375.7,320L375.7,320L313,320L313,320L250.4,320L250.4,320L187.8,320L187.8,320L125.2,320L125.2,320L62.6,320L62.6,320L0,320L0,320Z">
                </path>
            </svg> */}
        </div>
    )
}