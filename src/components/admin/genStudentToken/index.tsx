'use client';
import FormTemplate from '@/components/forms/formik';
import styles from './index.module.css';
import { studentTokenGenerationForm } from '@/data/form';
import { useEffect, useState } from 'react';
import { Student } from '@/context/auth/context';
import { ButtonEvent } from '@/components/types/events';
import StudentCard from '@/components/courseReg/studentCard';
import { StudentToken } from '@/context/studentToken/types';
import { Timer } from '@/components/types';
import { genStudentTokenAdmin, getStudentAdmin } from '@/services/student.http';
import { SpinnerSmall } from '@/components/loader/spinner';
import { IconContext } from 'react-icons';
import { RiErrorWarningLine } from 'react-icons/ri';
import { TopPopUpBox } from '@/components/modal/topModals';
import usePopUpFor from '@/components/modal/shared';
import { BiCheck } from 'react-icons/bi';



export default function GenStudentToken() {
    const [searching, setSearching] = useState(false);
    const [showStudentPanel, setShowStudentPanel] = useState(false);
    const [student, setStudent] = useState<Student | null>(null);
    const [studentToken, setStudentToken] = useState<StudentToken | null>(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [generatingToken, setGeneratingToken] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [tokenGenerated, setTokenGenerated] = useState(false);
    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const handleGetStudent = async (values: any) => {
        // alert(JSON.stringify(values, null, 2));
        try {
            if (showStudentPanel) {
                setShowStudentPanel(false);
            }
            setTokenGenerated(false);
            setShowPopup(false);
            setSearching(true);
            const { message, studentToken, data:student } = await getStudentAdmin(values.regNo, 'regNo');

            
            setStudent(student);
            setStudentToken(studentToken);
            setMessage(message);
            setSearching(false);
            setShowPopup(true);
            setShowStudentPanel(true);
        } catch (err) {
            
        }
    }

    const handleGenToken = async (e: ButtonEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setShowPopup(false);
            setGeneratingToken(true);
            setTokenGenerated(false);//TODO... remove
            if (!student) return;

            const { message, data } = await genStudentTokenAdmin(student._id || student.id);

            timer = setTimeout(() => {
                setGeneratingToken(false);

                setMessage(message);
                setTokenGenerated(true);
                setShowPopup(true);
            }, 2000)
        } catch (err) {
            
        }
    }

    const closeMessageBox = () => {
        setShowPopup(false);
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
        <div className={styles.container}>
            <StudentSearchForm handleSubmit={handleGetStudent}>
                <div className={styles.searchButtonWrapper}>
                    <button type='submit' disabled={searching}>
                    {searching ? (
                        <span>
                            <SpinnerSmall unsetMarginTop/>
                        </span>
                    ) : error ? (
                        <>
                            <IconContext.Provider value={{className: styles.icon}}>
                                <RiErrorWarningLine/>
                            </IconContext.Provider>
                            <span>
                                Search
                            </span>
                        </>
                    ) : (
                        <span>
                            Search
                        </span>
                    )}
                    </button>
                </div>
            </StudentSearchForm>

            <StudentResultPanel
            show={showStudentPanel}
            student={student} 
            studentToken={studentToken}            
            />

            {(student && !studentToken) ? (
                <div className={styles.genButtonWrapper}>
                    <button 
                    className={`${styles.genButton} ${tokenGenerated && styles.genSuccess}`}
                    onClick={handleGenToken} 
                    disabled={generatingToken || tokenGenerated}
                    >
                    {generatingToken ? (
                        <span>
                            <SpinnerSmall unsetMarginTop/>
                        </span>
                    ) : error ? (
                        <>
                            <IconContext.Provider value={{className: styles.icon}}>
                                <RiErrorWarningLine/>
                            </IconContext.Provider>
                            <span>
                                Generate Token
                            </span>
                        </>
                    ) : (
                        tokenGenerated ? (
                            <>
                                <IconContext.Provider value={{className: styles.iconCheck}}>
                                    <BiCheck/>
                                </IconContext.Provider>
                                <span>
                                    Token Generated
                                </span>
                            </>
                        ) : (
                            <span>
                            Generate Token
                            </span>
                        )
    
                    )}   
                    </button>
                </div>
            ) : null}
        </div>
        </>
    )
}

interface StudentSearchFormProps {
    handleSubmit: (values: any) => void
    children: React.ReactNode
}

function StudentSearchForm({
    handleSubmit,
    children
}: StudentSearchFormProps) { 
    return (
        <div className={styles.formWrapper}>
            <FormTemplate
            {...studentTokenGenerationForm}
            handleSubmit={handleSubmit}
            labelWrapperClassName={styles.labelWrapper}
            inputClassName={styles.input}
            inputErrorClassName={styles.inputError}
            inputNotEmptyClassName={styles.inputContains}
            errorClassName={styles.errorWrapper}
            >
                {children}
            </FormTemplate>
        </div>
    )
}


interface StudentResultPanelProps {
    show: boolean
    student: Student | null
    studentToken: StudentToken | null
}

function StudentResultPanel({
    show,
    student,
    studentToken
}: StudentResultPanelProps) {
    return (
        <div className={`${styles.studentPanel} ${show && styles.showStudenPanel}`}>
            <StudentCard 
            student={student} 
            studentToken={studentToken}
            tokenMessage='Student has no active token'
            />
        </div>
    )
}