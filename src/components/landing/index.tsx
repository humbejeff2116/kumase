'use client'
import Intro from './component1';
import WHoWeAre from './component2';
import Courses from './component3';
import Explore from './component4';
import ContactUs from './contactUs';
import styles from './index.module.css';
// import { FullPageLoader } from "../loader/spinner";
// import { Suspense } from "react";



export default function Landing() {
    return (
        <div className={styles.container}>
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