'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import useAuth, { Student } from '@/context/auth/context';
import { IoMdWarning } from 'react-icons/io';
import { PasswordInput, TextInput } from '../forms/formik/components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import UserEditableProfile, { actions, defaultStatus } from './editableProfile';
import { updateStudentAccount } from '@/services/student.http';
import { Timer } from '../types';
import { TopPopUpBox } from '../modal/topModals';
import usePopUpFor from '../modal/shared';

interface StudentAccountClientProps {
    student?: Student
}

export default function StudentAccountClient({
    // student
}: StudentAccountClientProps) {
    const [status, setStatus] = useState(defaultStatus);
    const { user, student } = useAuth();
    let timer: Timer = null;

    useEffect(() => {
        if (!status.showMessage) return;
        
        timer = setTimeout(() => setStatus(prevState => ({...prevState, showMessage: false})), 6000); 
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [status.showMessage]);


    const handleUpdatePassword = async (values: any) => {
        setStatus({...defaultStatus, action: actions.upolading});
        const formData = new FormData();
        if (!student || !user) return;
        formData.append('studentId', student._id || student.id);
        // formData.append('accountId', user._id || user.id);
        formData.append('oldPassword', values.oldPassword);
        formData.append('newPassword', values.newPassword);
        // formData.append('type', 'password');

        try {
            const { message, error } = await updateStudentAccount(formData);
            setStatus({
                action: actions.uploaded, 
                message, 
                error, 
                showMessage: true
            });
        } catch(err) {
            if (err instanceof Error) { 
                setStatus({
                    action: actions.uploadError,
                    message: 'Error occured while changing password', 
                    error: true,
                    showMessage: true
                }); 
            }
        }
    }

    const closeMessageBox = () => {
        setStatus(prevState => ({...prevState, showMessage: true}));
    }

    return (
        <>
        <TopPopUpBox
        dontShowCloseButton={!status.error}
        closePopUp={closeMessageBox}
        message={status.message}
        showPopUp={status.showMessage}
        usedFor={status.error ? usePopUpFor.error : usePopUpFor.success}
        />
        <div className={styles.container}>
            <div className={styles.bodyChild}>
                <div className={styles.bodyChildHeader}>
                    <h4>Profile</h4>
                </div>
                <UserEditableProfile/>
            </div>

            <div className={styles.bodyChild}>
                <div className={styles.bodyChildHeader}>
                    <h4>Password</h4>
                </div>
                <div className={styles.formWrapper}>
                    <Formik
                    initialValues = {{
                        oldPassword: '',
                        newPassword: '',
                    }}

                    validationSchema = {Yup.object({
                        oldPassword: Yup.string().required('Required'),
                        newPassword: Yup.string().required('Required'),
                    })}
                    onSubmit = {handleUpdatePassword}
                    >
                        <Form>
                            <div className={styles.inputGroup}>
                                <TextInput
                                label="Old Password"
                                labelWrapperClassName={styles.labelWrapper}
                                name="oldPassword"
                                type="text"
                                inputClassName={styles.input}
                                inputWrapperClassName={styles.inputWrapper}
                                inputNotEmptyClassName={styles.inputContains}
                                inputErrorClassName={styles.inputError}
                                errorClass={styles.inputErrorReport}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <TextInput
                                label="New Password"
                                labelWrapperClassName={styles.labelWrapper}
                                name="newPassword"
                                type="text"
                                inputClassName={styles.input}
                                inputWrapperClassName={styles.inputWrapper}
                                inputNotEmptyClassName={styles.inputContains}
                                inputErrorClassName={styles.inputError}
                                errorClass={styles.inputErrorReport}
                                />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.passwordButtonContainer}`}>
                                <div className={styles.passwordButtonWrapper}>
                                    <button type="submit">
                                    {
                                        status.action === actions.upolading ? 'Changing Password...' :
                                        status.action === actions.uploadError ? <><IoMdWarning/> Change password</> :
                                        'Change Password'
                                    }
                                    </button>
                                </div>
                                <div  className={styles.inputErrorReport}>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

                {/* <div className={styles.bodyChild}>
                    <div className={styles.bodyChildHeader}>
                        <h4>Account removal</h4>
                    </div>
                    <div className={styles.accountRemoveContainer}>
                        <div className={styles.accountRemoveChild}>
                            <div className={`${styles.accountRemoveButtonWrapper} ${styles.disable}`}>
                                <button type="submit">Disable Account</button>
                            </div>
                        </div>
                        <div className={styles.accountRemoveChild}>
                            <div className={`${styles.accountRemoveButtonWrapper} ${styles.delete}`}>
                                <button type="submit" >Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div> */}
        </div>
        </>

    )
}