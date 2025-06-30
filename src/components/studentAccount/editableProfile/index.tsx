'use client'
import { Dispatch, forwardRef, SetStateAction, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import useAuth, { Student, userEnum } from '@/context/auth/context';
import avatar from '@/images/avatar/avatar2.png';
import styles from './index.module.css';
import { Timer } from '@/components/types';
import { ButtonEvent, InputChangeEvent } from '@/components/types/events';
import { updateUserProfileImage } from '@/services/services.http';
import { ProfileImageSelector } from '@/components/ProfileImageUpdater';
import { FiCamera } from 'react-icons/fi';
import { TopPopUpBox } from '@/components/modal/topModals';
import usePopUpFor from '@/components/modal/shared';
import { BiBook, BiBookmark, BiBookOpen, BiCalendar, BiError, BiLocationPlus, BiMap, BiMessageAltDots, BiSolidSchool, BiUser } from 'react-icons/bi';
import { TbGenderIntergender } from 'react-icons/tb';
import { BsLadder } from 'react-icons/bs';
import { TextInput, TextInputProps } from '@/components/forms/formik/components';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { updateStudentRecord } from '@/services/student.http';
import { SpinnerSmall } from '@/components/loader/spinner';

const userDetailIcons = {
    title: <BiUser/>,
    surname: <BiUser/>,
    firstName: <BiUser/>,
    otherName: <BiUser/>,
    maritalStatus: <BiBookmark/>,
    gender: <TbGenderIntergender/>,
    dateOfBirth: <BiCalendar />,
    nationality: <BiLocationPlus/>,
    stateOfOrigin: <BiMap/>,
    regNo: <BiSolidSchool/>,
    department: <BiBook />,
    course: <BiBookOpen />,
    level: <BsLadder />,
    email: <BiMessageAltDots/>
}

const editable = [
    userEnum.title, 
    userEnum.surname, 
    userEnum.firstName, 
    userEnum.otherName,
    userEnum.maritalStatus,
    userEnum.gender,
    userEnum.dateOfBirth,
    userEnum.nationality,
    userEnum.stateOfOrigin,
    userEnum.email
];

interface Status {
    action: string
    message: string
    error: boolean
    showMessage: boolean
}

export const defaultStatus: Status = {
    action: '',
    message: '',
    error: false,
    showMessage: false
}

export const actions = {
    upolading: 'uploading',
    uploaded: 'uploaded',
    uploadError: 'uploadError'
}

interface UserProfileProps {
    children?: React.ReactNode
}
export default function UserEditableProfile({
    children
}: UserProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState(defaultStatus);
    const [closeInputs, setCloseInputs] = useState(false);
    const [inputOpenCount, setInputOpenCount] = useState(0);
    const [formValues, setFormValues] = useState<any>({});
    const { user, student } = useAuth();
    let timer: Timer = null;
    const studentFullNames = `${student?.surname} ${student?.firstName} ${student?.otherName && student.otherName[0]}.`
    
    useEffect(() => {
        if (!status.showMessage) return;
        
        timer = setTimeout(() => setStatus(prevState => ({...prevState, showMessage: false})), 8000); 
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [status.showMessage]); 


    const handleUpdateAccount = async (values: any) => {
        setStatus({...defaultStatus, action: actions.upolading});

        if (!user || !student) return;

        const formData = new FormData();
        formData.append('studentId', student._id || student.id);
        // formData.append('accountId', user._id || user.id);
        Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
        if (profileImageFile) {
            formData.append('profileImage', profileImageFile);
        }
        
        try {
            const { message, error } = await updateStudentRecord(formData);
            setStatus({
                action: actions.uploaded, 
                message, 
                error, 
                showMessage: true
            });

            setCloseInputs(true);
            setIsEditing(false);
            setInputOpenCount(0);

        } catch (err) {
            if (err instanceof Error) { 
                setStatus({
                    action: actions.uploadError,
                    message: 'Error occured while updating your record', 
                    error: true,
                    showMessage: true
                }); 
            }
        }
    }

    const handleCancelUpdate = (e: ButtonEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCloseInputs(true);
        setIsEditing(false);
        setInputOpenCount(0);
    }

    const handleImageChange = (e:InputChangeEvent) => {
        const files  = e.target.files;
        if (!files) return;
        const selectedFiles = files as FileList;
        setProfileImageFile(selectedFiles?.[0]);
    }

    const closeMessageBox = () => {
        setStatus(prevState => ({...prevState, showMessage: true}));
    }
    const handleSetFormValues = (name: string, value: string) => {
        setFormValues((prevState: any) => prevState ? ({...prevState, [name]: value}) : ({[name]: value}));
    }


    const initialFormValues = useMemo(() => {
    const values: any = {};

        if (student) {
            Object.keys(userEnum).forEach(key => {
                if (student[key]) {
                    values[key as keyof typeof values] = student[key]
                }
            });
            return values;
        } 
        return null;  
    }, [student]);
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
            <div className={styles.childWrapper}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarWrapper}>
                        <Image 
                        src={student?.profileImage || avatar} 
                        alt={`${studentFullNames}'s picture`}
                        />
                        <ProfileImageSelector
                        labelClassName = {styles.label}
                        labelSpanClassName="title"
                        inputClassName=''
                        name="profileImage"
                        type="file"
                        icon={<FiCamera />}
                        onChange={handleImageChange}                
                        />   
                    </div> 
                </div>

                <div className={styles.userDetailsContainer}>
                {student && (
                    <Formik
                    initialValues = {initialFormValues}
                    validationSchema = {Yup.object({
                        // contactNumber: Yup.string().required('Required'),
                        title: Yup.string().required('Required'),
                        surname: Yup.string().required('Required'),
                        firstName: Yup.string().required('Required'),
                        // otherName: Yup.string().required('Required'),
                        maritalStatus: Yup.string().required('Required'),
                        gender: Yup.string().required('Required'),
                        dateOfBirth: Yup.string().required('Required'),
                        nationality: Yup.string().required('Required'),
                        stateOfOrigin: Yup.string().required('Required'),
                        // regNo: Yup.string().required('Required'),
                        // department: Yup.string().required('Required'),
                        // course: Yup.string().required('Required'),
                        // level: Yup.string().required('Required'),
                        // email: Yup.string().required('Required'),
                    })}
                    onSubmit = {handleUpdateAccount}
                    >
                        <Form>
                        {Object.keys(userEnum).map((key, i) => (
                            student?.[key] ? (
                                <UserDetail
                                key={i}
                                detailName={userEnum[key]}
                                inputName={key}
                                inputOpenCount={inputOpenCount}
                                setInputOpenCount={setInputOpenCount}
                                closeInputs={closeInputs}
                                setCloseInputs={setCloseInputs}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                detailIcon={userDetailIcons[key as keyof typeof userDetailIcons]}
                                detail={student[key]} 
                                isEditable={editable.includes(userEnum[key])}
                                inputComponent={
                                    <EditStudentTextInput
                                    setFormValue={handleSetFormValues}
                                    name={key}
                                    type="text"
                                    inputClassName={styles.input}
                                    inputWrapperClassName={styles.inputWrapper}
                                    inputNotEmptyClassName={styles.inputContains}
                                    inputErrorClassName={styles.inputError}
                                    />
                                }
                                />
                            ) : null
                        ))}
                        <div className={`${styles.updateButtonsWrapper} ${inputOpenCount > 0 && styles.showUpdateButtons}`}>
                            <button
                            className={styles.updateButtonCancel} 
                            type='button' 
                            onClick={handleCancelUpdate}
                            disabled={status.action === actions.upolading}
                            >
                                Cancel 
                            </button>
                            <button
                            className={styles.updateButtonSave} 
                            type="submit"
                            >
                            {status.action === actions.upolading ? (
                                <SpinnerSmall unsetMarginTop/>
                            ) : status.action === actions.uploadError ? (
                                <>
                                <IconContext.Provider value={{className: styles.uploadButtonIcon}}>
                                    <BiError/>
                                </IconContext.Provider>
                                Save
                                </>
                            ) : (
                                <>
                                Save
                                </>
                            )}
                            </button>
                        </div>
                        </Form>
                    </Formik>
                )}
                </div>
                {children}
            </div>
        </div>
        </>
    )
}

interface UserDetailProps {
    detailName: string
    inputName: string
    detailIcon: React.ReactElement
    detail: string
    icon?: JSX.Element
    isEditable: boolean
    closeInputs: boolean
    setCloseInputs: (cancel: boolean) => void
    isEditing: boolean
    setIsEditing: Dispatch<SetStateAction<boolean>>
    inputOpenCount: number
    setInputOpenCount: Dispatch<SetStateAction<number>>
    inputComponent: React.ReactElement 
}

function UserDetail({
    detailName,
    inputName,
    detail,
    detailIcon,
    icon,
    isEditable,
    isEditing,
    setIsEditing,
    closeInputs,
    setCloseInputs,
    inputOpenCount,
    setInputOpenCount,
    inputComponent
}: UserDetailProps) {
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        if (closeInputs && showInput) {
            setShowInput(false);
        }
    }, [closeInputs])

    const handleShowInput = (e: ButtonEvent) => {
        e.stopPropagation();
        e.preventDefault()

        if (closeInputs) {
            setCloseInputs(false);
        }

        if (inputOpenCount < 1) {
            setIsEditing(false);
        } else if (!isEditing) {
            setIsEditing(true);
        }
        
        if (!showInput) {
            setInputOpenCount(prevState => prevState + 1);
        } else if (inputOpenCount > 0) {
            setInputOpenCount(prevState => prevState - 1);
        }

        setShowInput(prevState => !prevState);
    }

    return (
        <div className={styles.userDetailsChild}>
            <div className={styles.userDetail}>
                <span>
                    <IconContext.Provider value={{className: styles.detailIcon}}>
                        {detailIcon}
                    </IconContext.Provider>
                    <span className={styles.detailName}>
                    {detailName}:
                    </span>
                </span>
                <span className={styles.detail}>
                {showInput ? (
                    inputComponent
                ) : (
                    <>
                    {detail && detail}
                    </>
                )}
                {/* {detail && detail} */}
                </span>
            </div>
            {isEditable && (
                <div className={styles.userDetailButtonWrapper}>
                    <button onClick={handleShowInput}>
                        <IconContext.Provider value={{className: styles.detailButtonIcon}}>
                            {icon ?? <RiEdit2Fill/>}
                        </IconContext.Provider>
                        {showInput ? <>Cancel</> : <>Edit</>}
                    </button>
                </div>
            )}
        </div>
    )
}


interface EditStudentTextInputProps extends TextInputProps {
    setFormValue: (name: string, values: string) => void
}
const EditStudentTextInput = forwardRef<HTMLInputElement, EditStudentTextInputProps>(({ 
    inputWrapperClassName,
    inputClassName,
    inputErrorClassName,
    inputNotEmptyClassName, 
    labelWrapperClassName,
    setFormValue,
    ...props 
}, ref) => {
    const [field, meta] = useField(props);

    useEffect(() => {

        if (meta.value && meta.touched) {
            setFormValue(props.name, meta.value)
        }

    }, [meta])
    
        const textInputClassName = (
            (meta.value && !meta.error) ? `${inputClassName} ${inputNotEmptyClassName || "not-empty"}` : 
            (meta.touched && meta.error) ? `${inputClassName} ${inputErrorClassName || "has-error"}` :
            inputClassName
        )
    
        return (
            <div className={inputWrapperClassName}>
                <input className = { textInputClassName } { ...field } { ...props } ref = { ref }/>
            </div>
        )
})