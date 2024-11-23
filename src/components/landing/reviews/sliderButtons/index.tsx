'use client'
import { useSwiper } from "swiper/react";
import { MdArrowForwardIos, MdArrowBackIosNew }  from 'react-icons/md';
import styles from './index.module.css';
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";




interface SwiperNavButtonsProps {
    sliderChange: number  
}
export default function SwiperNavButtons({
    sliderChange
}: SwiperNavButtonsProps) {
    const [isBeginning, setIsBeginning] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const swiper = useSwiper();

    useEffect(() => {
        setIsEnd(false);
        if (swiper.isBeginning) {
            setIsBeginning(true);
            return
        }
        setIsBeginning(false);

        if (swiper.isEnd) {
            setIsEnd(true);
            return;
        }

    }, [sliderChange])


    const handlePrevious = () => {
        swiper.slidePrev();

        setIsEnd(false);
        if (swiper.isBeginning) {
            setIsBeginning(true);
        }
    }

    const handleNext = () => {
        swiper.slideNext();

        setIsBeginning(false);
        if (swiper.isEnd) {
            setIsEnd(true);
        }
    }

    return (
        <>
            <button 
            disabled={isBeginning}
            className={`${styles.prevButton} ${isBeginning ? styles.disabled : ''}`}
            onClick={() => handlePrevious()}
            >
                <IconContext.Provider value={{className: styles.icon}}>
                    <MdArrowBackIosNew/>
                </IconContext.Provider>
            </button>
            <button 
            disabled={isEnd}
            className={`${styles.nextButton} ${isEnd ? styles.disabled : ''}`}
            onClick={() => handleNext()}
            >
                <IconContext.Provider value={{className: styles.icon}}>
                    <MdArrowForwardIos/>
                </IconContext.Provider>
            </button>
        </>
    )
}