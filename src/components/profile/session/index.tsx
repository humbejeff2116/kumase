import useCollegeContext from '@/context/college/context';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { BiBuilding } from 'react-icons/bi';
import { semesters } from '@/context/college/types';
import defaultIllustration from '@/images/illustration/freepick/13297215_5182546.svg';
import Image from 'next/image';



export default function CurrentSession() {
    const { school } = useCollegeContext();
    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <div className={styles.left}>
                    <SessionDetail
                    heading='Current Session'
                    body={school?.currentSession}
                    />
                    <SessionDetail
                    heading='Current Semester'
                    body={
                    <span>{school?.semester}
                        <sup>{school?.semester === semesters.first ? 'st' : 'nd'}</sup>
                    </span>}
                    />
                </div>
                <div className={styles.right}>
                    <Image src={defaultIllustration} alt=''/>                
                </div>
            </div>
        </div>
    )
}

interface SessionDetailProps {
    heading: string
    body: string | React.ReactNode
}

function SessionDetail({
    heading,
    body
}: SessionDetailProps) {
    return (
        <div className={styles.sessionDetail}>
            <div className={styles.detailIconWrapper}>
                <IconContext.Provider value={{className: styles.detailIcon}}>
                    <BiBuilding/>
                </IconContext.Provider>
            </div>
            <h2>{heading}</h2>
            <p>{body}</p>
        </div>
    )
}