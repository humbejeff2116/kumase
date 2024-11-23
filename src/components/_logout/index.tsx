'use client'
import React, { useEffect } from 'react';
import { Timer } from '@/components/types';
import styles from './logout.module.css';
import useAuth from '@/context/auth/context';
import { useRouter } from 'next/navigation';
import appRoutes from '@/routes';
import { Spinner } from '../loader/spinner';
import LandingPageSectionWrapper from '../landing/sectionWrapper';



export default function _Logout() {
    const { logOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        let timer: Timer;
        const logOutUser = async () => {
            timer = setTimeout(async () => {
                await logOut();
                router.push(appRoutes.signIn);
            }, 2000)
        }
        // logOutUser();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [logOut, router]);
  
    
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionOneWrapper}
        showWave
        // useWave2
        >
        <div className={styles.childWrapper}>
            <div className={styles.content}>
                <Spinner
                containerClassName={styles.spinnerContainer}
                loaderClassName={styles.spinner}
                />
                <div className={styles.contentWriteup}>
                    <span>Signing out...</span>
                </div>
            </div>
        </div>
        </LandingPageSectionWrapper>
    )
}