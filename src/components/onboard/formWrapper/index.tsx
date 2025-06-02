'use client'
import React, { useEffect, useState } from 'react';
import FormProgress, { ProgressIndicator } from '../formProgress';
import styles from './index.module.css';
import { getFormIds } from '@/data/onboardingForm';
import { PrevAndNextButtons } from '../formButtons';
import ConfirmOnboardingDetails from '../confirmDetails';
import { InputChangeEvent } from '@/components/types/events';
import FormOne from '../formOne';
import FormTwo from '../formTwo';
import FormThree from '../formThree';
import { onboardUser } from '@/services/services.http';
import { Timer } from '@/components/types';
import appRoutes from '@/routes';
import { TopPopUpBox } from '@/components/modal/topModals';
import usePopUpFor from '@/components/modal/shared';
import useAuth, { User } from '@/context/auth/context';
import { useRouter } from 'next/navigation';
import { parseLocalStorage } from '@/lib';
import { USER } from '@/context/auth/provider';
import { SpinnerWithChildren } from '@/components/loader/spinner';

interface FormStripped {
    id: string
}

const formIds = getFormIds();

export default function FormWrapper() {
    const [activeFormId, setActiveFormId] = useState(formIds[0]);
    const [completedForms, setCompletedForms] = useState<Array<FormStripped>>([]);
    // const [submittedForms, setSubmittedForms] = useState([]);
    // TODO... get user from auth context

    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [formOne, setFormOne] = useState({});
    const [formTwo, setFormTwo] = useState({});
    const [formThree, setFormThree] = useState({});

    const [onboardingUser, setOnboardingUser] = useState(false);
    const [onboardError, setOnboardError] = useState(false)
    const [showMessage, setShowMessage] = useState(false);
    const [onboardMessage, setOnboardMessage] = useState<string | null>(null);
    const router = useRouter();
    let timer: Timer = null;
    const { user, setUserData } = useAuth();
    // const user = parseLocalStorage(USER);

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);


    const addCompletedForm = (formDetails: FormStripped) => {
        if (!completedForms || completedForms.length < 1) {   
            setCompletedForms([formDetails])
            return;
        }
        setCompletedForms(prevState => [...prevState, formDetails]);
    }

    const removeCompletedForm = (formId: string) => {
        if (!completedForms || completedForms.length < 1) {   
            return;
        }
        const filterCompletedForms = completedForms.filter((form) => form.id !== formId)  
        setCompletedForms(filterCompletedForms);
    }

    const FormIsCompleted = (formId: string) => {
        return completedForms.find((form) => form.id === formId) ? true : false;
    }

    const handleSubmitFormOne = (values: any) => {
        // alert(JSON.stringify(values, null, 2))
        setFormOne(values);
        addCompletedForm({id: formIds[0]});
        setActiveFormId(formIds[1]);
    }

    const handleSubmitFormTwo = (values: any) => {
        setFormTwo(values);
        addCompletedForm({id: formIds[1]});
        setActiveFormId(formIds[2]);
    }

    const handleSubmitFormThree = (values: any) => {
        setFormThree(values);
        addCompletedForm({id: formIds[2]});
        setActiveFormId(formIds[3]);
    }

    const handleSubmitOnboardForm = async () => {
        const userId = user?.id;
        if (!user || !userId) {
            // TODO... remove alert
            alert("no user id provided")
            return;
        }
        setOnboardingUser(true);
        if (showMessage) {
            setShowMessage(false);
        }

        const formData = new FormData();
        formData.append('userId', userId);
        if (profileImageFile) {
            formData.append("profileImage", profileImageFile, profileImageFile.name);
        }

        await Promise.all([
            appendFormAsync(formOne, formData),
            appendFormAsync(formTwo, formData),
            appendFormAsync(formThree, formData),
        ])
        
        function appendFormAsync(formObj: any, formData: FormData) {
            return new Promise((res, rej) => {
                Object.keys(formObj).forEach(key => {
                    formData.append(key, formObj[key as keyof typeof formObj]);
                })
                res(formData);
            })
        }

        try {
            const {
                data:user, 
                error, 
                message, 
            } = await onboardUser(userId, formData);
           
            if (error) {
                setOnboardError(true);
                setOnboardMessage(message);
                setShowMessage(true);
                return;
            }
            user.id = user._id;
            // setUserData(user);
            setOnboardError(false);
            setOnboardMessage(message);
            // setShowMessage(true);

            timer = setTimeout(() => { 
                setOnboardingUser(false);
            }, 2000); 
            timer = setTimeout(() => { 
                setShowMessage(true);
            }, 3000);
            timer = setTimeout(() => { 
                router.push(appRoutes.home);
            }, 4000); 

        } catch (err) {
            if (err instanceof Error) {
                setOnboardMessage(err.message);
                setOnboardError(true);
                setOnboardingUser(false);
                setShowMessage(true);
            }
        }
    }

    const handleGoBack = () => {
        if (activeFormId === "1") {
            return;
        }

        const prevFormId = (Number(activeFormId) - 1).toString();
        removeCompletedForm(prevFormId);
        setActiveFormId(prevFormId);
    }

    
    const handleImageChange = (e: InputChangeEvent) => {
        const files  = e.target.files;
        if (!files) return;
        const selectedFiles = files as FileList;
        setProfileImageFile(selectedFiles?.[0]);
    }

    const closeMessageBox = () => {
        setShowMessage(false);
    }

    return (
        <>
        <TopPopUpBox
        dontShowCloseButton
        closePopUp={closeMessageBox}
        message={onboardMessage}
        showPopUp={showMessage}
        usedFor={onboardError ? usePopUpFor.error : usePopUpFor.success}
        />
        <SpinnerWithChildren
        posTop={true}
        showLoader={onboardingUser}
        >
            Onboarding...
        </SpinnerWithChildren>
        <div className={styles.container}>
            <div>
                <FormProgress>
                {formIds.map((formId, i) =>
                    <ProgressIndicator 
                    key={formId ?? i} 
                    id={formId}
                    isActive={formId === activeFormId}
                    completed={FormIsCompleted(formId)}
                    />
                )}
                </FormProgress>

                {activeFormId === "1" ? (
                    <FormOne handleSubmit={handleSubmitFormOne}>
                        <PrevAndNextButtons dontShowBackButton/>
                    </FormOne>
                ) : activeFormId === "2" ? (
                    <FormTwo handleSubmit={handleSubmitFormTwo}>
                        <PrevAndNextButtons goBack={handleGoBack}/>
                    </FormTwo>
                ) : activeFormId === "3" ? (
                    <FormThree handleSubmit={handleSubmitFormThree}>
                        <PrevAndNextButtons goBack={handleGoBack}/>
                    </FormThree>
                ) : (
                    <ConfirmOnboardingDetails
                    forms = {[formOne, formTwo, formThree]}
                    >
                        <PrevAndNextButtons 
                        goBack={handleGoBack}
                        customSubmitButton={
                            <button 
                            onClick={() => handleSubmitOnboardForm()}
                            // disabled = {creatingProfile}
                            className = {`${styles.submitButton} ${onboardingUser && styles.disableButton}`}
                            >
                            Submit
                            </button>
                        }
                        />
                    </ConfirmOnboardingDetails>
                )}
            </div>
        </div>
        </>
    )
}