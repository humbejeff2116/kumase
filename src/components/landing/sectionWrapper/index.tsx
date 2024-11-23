import Image from 'next/image';
import styles from './index.module.css';
import wave1 from '@/images/background/wave1.svg';
import wave2 from '@/images/background/wave2.svg';


interface LandingPageSectionWrapperProps {
    children: React.ReactNode
    useWhiteWave?: boolean
    flipWave?: boolean
    showWave?: boolean
    childWrapperModifyClass?: string
    containerModifyClass?: string 
    useDefaultChildWrapper: boolean 
    backgroundImage?: React.ReactNode
    useWave2?: boolean
}

export default function LandingPageSectionWrapper({
    children,
    showWave,
    childWrapperModifyClass,
    containerModifyClass,
    useDefaultChildWrapper,
    backgroundImage,
    useWave2
} : LandingPageSectionWrapperProps) {
    const containerClass = containerModifyClass ?
    `${styles.container} ${containerModifyClass}` : 
    `${styles.container} ${styles.containerAdd}`

    return (
        <div className={`${styles.container} ${containerModifyClass}`}>
        {backgroundImage}
        {useDefaultChildWrapper ? (
            <div className={`${styles.childWrapper} ${childWrapperModifyClass}`}>
            {children}
            </div>
        ) : (
            children
        )}
        {showWave && (
            <Wave useWave2={useWave2}/>
        )}
        </div>
    )
}

interface WaveProps {
    useWave2?: boolean
}

export function Wave({
    useWave2
}: WaveProps) {
    return (
        <div className={styles.svgWrapper}>
            {useWave2 ? (
                <Image src={wave2} alt='' className={styles.svg} />
            ) : (
                <Image src={wave1} alt='' className={styles.svg} />
            )}
        </div>
    )
}