'use client'
import { IconContext } from "react-icons";
import { RiCloseFill, RiUploadLine } from "react-icons/ri";
import styles from './index.module.css';
import { BiUpload } from "react-icons/bi";
import { ButtonEvent, InputChangeEvent } from "../types/events";
import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import Image, { StaticImageData } from 'next/image';
import defaultAvatar from '@/images/avatar/avatar4.png';
import defaultImagePreview from '@/images/avatar/avatar2.png';
import { updateUserProfileImage } from "@/services/services.http";
import useAuth from "@/context/auth/context";
import { SpinnerSmall } from "../loader/spinner";
import { TopPopUpBox } from "../modal/topModals";
import usePopUpFor from "../modal/shared";
import { Timer } from "../types";



interface ProfileImageUpdaterProps {
    show: boolean
    handleCLose: (e?: ButtonEvent) => void
}

interface Status {
    action: string
    message: string
    error: boolean
    showMessage: boolean
}

const defaultStatus: Status = {
    action: '',
    message: '',
    error: false,
    showMessage: false
}

const actions = {
    upolading: 'uploading',
    uploaded: 'uploaded',
    uploadError: 'uploadError'
}
export default function ProfileImageUpdater({
    show,
    handleCLose
}: ProfileImageUpdaterProps) {
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [showImageSelector, setShowImageSelector] = useState(false);
    const [status, setStatus] = useState(defaultStatus);
    const { user } = useAuth();
    let timer: Timer = null;

    useEffect(() => {
        if (!status.showMessage) return;
        
        timer = setTimeout(() => setStatus(prevState => ({...prevState, showMessage: false})), 4000); 
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [status.showMessage]); 

    const handleUpload = async (e: ButtonEvent) => {
        setStatus({...defaultStatus, action: actions.upolading});
        e.stopPropagation();
        e.preventDefault();
        if (!user || !user.id || !profileImageFile) return;

        const form = new FormData();
        form.append('profileImage', profileImageFile);

        try {
            const { message, error } = await updateUserProfileImage(user.id, form);
            setStatus({action: actions.uploaded, message, error, showMessage: true});

            if (!error) {
                handleCLose(); 
            }
        } catch (err) {
            if (err instanceof Error) { 
                setStatus({
                    action: actions.uploadError,
                    message: 'Error occured while uploading image', 
                    error: true,
                    showMessage: true
                }); 
            }
        }
    }

    const handleImageChange = (e:InputChangeEvent) => {
        const files  = e.target.files;
        if (!files) return;
        const selectedFiles = files as FileList;
        setProfileImageFile(selectedFiles?.[0]);
    }

    const showImageIcon = () => {
        setShowImageSelector(true)
    }

    const hideImageIcon = () => {
        setShowImageSelector(false)
    }

    const closeMessageBox = () => {
        setStatus(prevState => ({...prevState, showMessage: true}));
    }

    const uploading = status.action === actions.upolading;

    return (
        <>
        <TopPopUpBox
        dontShowCloseButton={!status.error}
        closePopUp={closeMessageBox}
        message={status.message}
        showPopUp={status.showMessage}
        usedFor={status.error ? usePopUpFor.error : usePopUpFor.success}
        />
        <div className={`${styles.container} ${show && styles.show}`}>
            <div className={styles.topWrapper}>
                <button onClick={handleCLose} className={styles.closeButton}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <RiCloseFill/>
                </IconContext.Provider>
                </button>
            </div>

            <div className={styles.bottomWrapper}>
                <div className={styles.bottomLeftWrapper}>
                    <div className = {`${styles.bottomLeftTop}`}>
                        <div 
                        className={styles.avatarWrapper}
                        onMouseEnter={ showImageIcon }
                        onMouseLeave={ hideImageIcon } 
                        >
                            <Image src={defaultAvatar} alt=""/>
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
                    <div className={styles.bottomLeftBottom}>
                        <button onClick={handleUpload} className={styles.uploadButton}>
                        {/* {status.error ? (

                        ) : (
                            
                        )} */}
                        {uploading ? (
                            <>
                            <span className={styles.buttonSpinnerWrapp}>
                                <SpinnerSmall unsetMarginTop />
                            </span>
                            Uploading... 
                            </>
                        ) : (
                            <>
                            Upload
                            <IconContext.Provider value={{className: styles.uploadIcon}}>
                                <RiUploadLine/>
                            </IconContext.Provider>
                            </>
                        )}  
                        </button>
                    </div>
                </div>

                <div className={styles.bottomRightWrapper}>
                    {profileImageFile ? (
                        <img 
                        src = {URL.createObjectURL(profileImageFile)} 
                        alt= ""
                        onMouseEnter={ showImageIcon }
                        onMouseLeave={ hideImageIcon }
                        />
                    ) : (
                        <div className={styles.imagePreviewText}>
                            Image Preview
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
        </>
    )
}

interface ProfileImageSelectorProps {
    labelClassName: string
    labelSpanClassName: string
    inputClassName: string
    icon: React.ReactElement
    name: string
    type: string
    onChange: (e:InputChangeEvent) => void
}

const ProfileImageSelector = ({ 
    labelClassName, 
    labelSpanClassName, 
    inputClassName,
    icon, 
    ...props 
}: ProfileImageSelectorProps) => {
    return (
        <label className = { labelClassName }>
            <IconContext.Provider value={{className: styles.inputIcon}}>
            { icon }
            </IconContext.Provider>
            <input className = {inputClassName} { ...props } />
        </label>
    )
}