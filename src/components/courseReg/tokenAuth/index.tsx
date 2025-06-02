'use client';
import TokenAuthenticator, { CourseRegButtons } from "@/components/courseReg/tokenForm";
import StudentCard from "../studentCard";
import { useEffect, useState } from "react";
import { Timer } from "@/components/types";
import { authStudentToken } from "@/services/student.http";
import { Spinner, SpinnerSmall } from "@/components/loader/spinner";
import { IconContext } from "react-icons";
import { RiErrorWarningLine } from "react-icons/ri";
import styles from './index.module.css';
import { TopPopUpBox } from "@/components/modal/topModals";
import usePopUpFor from "@/components/modal/shared";
import CourseForm from "@/components/courseForm";
import StudentCourses from "../studentCourses";


// TODO... use appriopraite types
interface TokenAuthProps {
    student: any
    studentToken: any
    isRegistered: boolean
}

export default function TokenAuth({
    student,
    studentToken,
    isRegistered
}: TokenAuthProps) {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [error, setError] = useState(false);
    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const authToken = (): Promise<{isValidToken: boolean}> => {
        return new Promise((res, rej) => {
            return setTimeout(() => res({isValidToken: true}), 3000);
        })
    }

    const handleAuthToken = async (values: any) => {
        setSubmitting(true);
        setMessage('Authenticating Token...');
        setShowMessage(true);

        // const { isValidToken } = await authStudentToken(student._id || student.id);
        // TODO... use appriopriate auth token function
        const { isValidToken } = await authToken();
        setSubmitting(false);

        if (!isValidToken) {
            setMessage('Invalid Token Provided');
            return;
        }

        setMessage('Valid Token Provided');
        timer = setTimeout(() => setMessage('Generating Course Form...'), 800);
        timer = setTimeout(() => {
            setShowLoader(true);
            setShowMessage(false);
        }, 1500);
        timer = setTimeout(() => {
            setShowLoader(false);
            setShowCourses(true);
        }, 2000)

    }

    const closeMessageBox = () => {
        setShowMessage(false);
    }

    return (
        <>
        <TopPopUpBox
        dontShowCloseButton={!error}
        closePopUp={closeMessageBox}
        message={message}
        showPopUp={showMessage}
        usedFor={error ? usePopUpFor.error : usePopUpFor.success}
        />
        {isRegistered ? (
            <>
            <StudentCard 
            student={student} 
            studentToken={studentToken}
            />
            <StudentCourses/>
            </>
        ) : (
            <>
            <StudentCard 
            student={student} 
            studentToken={studentToken}
            />
            {showLoader ? (
                <div>
                    <Spinner/>
                </div>
            ) : showCourses ? (
                <StudentCourses/>
            ) : (
                <TokenAuthenticator 
                handleSubmit={handleAuthToken}
                >
                <div className={styles.buttonWrapper}>
                    <button type='submit' className={styles.submitButton}>
                    {submitting ? (
                        <span>
                            <SpinnerSmall unsetMarginTop/>
                        </span>
                    ) : error ? (
                        <>
                            <IconContext.Provider value={{className: styles.icon}}>
                                <RiErrorWarningLine/>
                            </IconContext.Provider>
                            <span>
                                Proceed
                            </span>
                        </>
                    ) : (
                        <span>
                            Proceed
                        </span>
                    )}
                    </button>
                </div>
                </TokenAuthenticator>
            )}
            </>
        )}
       </> 
    )
}