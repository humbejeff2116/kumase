'use client'
import { useEffect, useState } from 'react';
import AdvertBanner from '../AdvertBanner';
import { ButtonEvent } from '../types/events';
import Intro from './component1';
import WHoWeAre from './component2';
import Courses from './component3';
import Explore from './component4';
import ContactUs from './contactUs';
import styles from './index.module.css';
import { Timer } from '../types';
// import { FullPageLoader } from "../loader/spinner";
// import { Suspense } from "react";



export default function Landing() {
    const [showAdvertBanner, setShowAdvertBanner] = useState(false);
    let timer: Timer = null;

    const handleCloseAdvertBanner = (e: ButtonEvent) => {
        e.stopPropagation();
        setShowAdvertBanner(false);
    }

    useEffect(() => {
        timer = setTimeout(() => setShowAdvertBanner(true), 3000)

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <AdvertBanner 
            show={showAdvertBanner}
            handleClose={handleCloseAdvertBanner}
            />
            <Intro/>
            <WHoWeAre/>
            <Courses/>
            {/* <Suspense fallback={<FullPageLoader/>}> */}
                <Explore/>  
            {/* </Suspense> */}
            <ContactUs/>
        </div>
    )
}