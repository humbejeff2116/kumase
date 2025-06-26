'use client'
import React, { useEffect, useState } from 'react';
import { Timer } from '@/components/types';
import styles from './logout.module.css';
import useAuth from '@/context/auth/context';
import { useRouter } from 'next/navigation';
import appRoutes from '@/routes';
import { Spinner } from '../loader/spinner';
import LandingPageSectionWrapper from '../landing/sectionWrapper';
import { logoutStudentAccount } from '@/services/student.http';



export default function _Logout() {
    const [error, setError] = useState(false);
    const { logOutClient, student } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const logOutUser = async (studentId: string) => {
            if (error) {
                setError(false);
            }
            try {
                await logoutStudentAccount(studentId);
                await logOutClient();
                router.push(appRoutes.signIn);
            } catch (error) {
                setError(true);
            }
        }

        if (student) {
            logOutUser(student.id);
        }
    }, [logOutClient, student, router]);
  
    
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