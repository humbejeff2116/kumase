import Image, { StaticImageData } from 'next/image';
import styles from './index.module.css';
import { FaQuoteLeft } from 'react-icons/fa';
import studentLondon from '@/images/reviews/istockphoto-1447889800-612x612.jpg'
import studentsMatric1 from '@/images/students-matric7-crop.jpg';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

interface ReviewProps {
    review: string
    name: string
    location: string
    school: string
    imageSrc: StaticImageData | string
}

export default function Review({
    review,
    name,
    location,
    school,
    imageSrc
}: ReviewProps) {
    const [showMore, setShowMore] = useState(false);
    const chunkLen = 45;

    const toggleMoreText = () => {
        setShowMore(prevState => !prevState);
    }

    const chunkBody = (body: string) => {
        return `${body.trim().split(" ").splice(0, chunkLen).join(" ")}...`;
    }

    const bodylengthGreaterThan = (body: string) => {
        if (body.length > chunkLen) {
            return true;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <p>
                    <FaQuoteLeft className={styles.qoute}/>
                    {showMore ? (
                        <>
                        {review}
                        </>   
                    ) : (
                        bodylengthGreaterThan(review) ? (
                            chunkBody(review)  
                        ) : (
                        review  
                        ) 
                    )}
                    </p>
                </div>
                {bodylengthGreaterThan(review) && (
                    <div className={styles.buttonWrapper}>
                        <button onClick={toggleMoreText} className={`${styles.button} ${showMore && styles.activeButton}`}>
                            {/* {showMore ? `Show Less` : `Show More`} */}
                            {showMore ? (
                                <MdExpandLess className={styles.buttonIcon}/>
                            ) : (
                                <MdExpandMore className={styles.buttonIcon}/>
                            )}
                        </button>
                    </div>
                )}
                <div className={styles.contentName}>
                    <p>
                    {name}   
                    </p>
                </div>

                <div className={styles.contentSchool}>
                    <p>
                    {school}
                    </p>
                </div>
            </div>

            <div className={styles.imageWrapper}>
                {/* TODO... remove default image */}
                <Image src={imageSrc ||studentsMatric1} alt={`a student of ${school}`}/>
            </div>
        </div>
    )
}