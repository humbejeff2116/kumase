'use client';
import TokenAuthenticator, { CourseRegButtons } from "@/components/courseReg/tokenForm";
import StudentCard from "../studentCard";
import { useEffect, useState } from "react";
import { Timer } from "@/components/types";
import { authStudentToken, registerStudentCourse } from "@/services/student.http";
import { Spinner, SpinnerSmall } from "@/components/loader/spinner";
import { IconContext } from "react-icons";
import { RiErrorWarningLine } from "react-icons/ri";
import styles from './index.module.css';
import { TopPopUpBox } from "@/components/modal/topModals";
import usePopUpFor from "@/components/modal/shared";
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
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [showPopup, setShowpopup] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [error, setError] = useState(false);
    let timer: Timer = null;

    useEffect(() => {
        if (isRegistered) {
            setShowMessageBox(true);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const handleAuthToken = async (values: any) => {
        setError(false);
        setSubmitting(true);
        setMessage('Authenticating Token...');
        setShowpopup(true);
        
        try {

            const { authenticated:isValidToken } = await authStudentToken(student._id || student.id, '');
            setSubmitting(false);

            if (!isValidToken) {
                setError(true);
                setMessage('Invalid Token Provided');
                timer = setTimeout(() => {
                    setShowpopup(false);
                }, 6000);
                return;
            }
            await registerStudentCourse(
                student._id || student.id,
                {
                    level: "",
                    session: "",
                    semester: "",
                    time: ""
                } 
            )

            setMessage('Registering Courses...');

            setMessage('Courses Registered');
            timer = setTimeout(() => setMessage('Generating Course Form...'), 800);

            timer = setTimeout(() => {
                setShowLoader(true);
                setShowpopup(false);
            }, 1500);

            timer = setTimeout(() => {
                setShowLoader(false);
                setShowCourses(true);
            }, 2000)
        } catch (err) {

        }
    }

    const closeMessageBox = () => {
        setShowpopup(false);
    }

    return (
        <>
        <TopPopUpBox
        dontShowCloseButton={!error}
        closePopUp={closeMessageBox}
        message={message}
        showPopUp={showPopup}
        usedFor={error ? usePopUpFor.error : usePopUpFor.success}
        />
        <MessageBox
        message={
            isRegistered ? 
            "Courses Already Registered" : 
            "Course Registration Successful"
        }
        showBox={showMessageBox}
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

interface MessageBoxProps {
    message: string
    showBox: boolean
}

function MessageBox({
    message,
    showBox
}: MessageBoxProps) {
    return (
        <div className= {`${styles.messageBoxContainer} ${showBox && styles.showMessageBox}`}>
            <div className={`${styles.messageBoxTextWrapper}`}>
                {/* <IconContext.Provider value={{className: styles.icon}}>
                    <BiCheck/>
                </IconContext.Provider> */}
                <span className={styles.message}>
                {message}
                </span>
            </div>
        </div>
    )
}