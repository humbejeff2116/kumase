import { ComponentPropsWithoutRef, useState } from 'react';
import styles from './index.module.css';
import { FiCamera } from 'react-icons/fi';
import React from 'react';
import { InputChangeEvent } from '@/components/types/events';



export default function ProfileImageUploader() {
    const [displayImageURL, setDisplayImageURL] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

    const handleImageChange = (e: InputChangeEvent) => {
        const files  = e.target.files;
        if (!files) return;
        const selectedFiles = files as FileList;
        setProfileImageFile(selectedFiles?.[0]);
        setDisplayImageURL(URL.createObjectURL(selectedFiles?.[0]))
    }
    
    return (
        <div>
            <ProfileImageSelector
            labelClassName = {''}
            inputClassName={''}
            name="profileImage"
            type="file"
            icon={<FiCamera/>}
            onChange={handleImageChange}                
            />  
        </div>
    )
}

interface ProfileImageSelectorProps extends ComponentPropsWithoutRef<"input"> {
    labelClassName: string 
    inputClassName: string 
    icon?: React.ReactElement
    name: string
    // label,
}

const ProfileImageSelector = React.forwardRef<HTMLInputElement, ProfileImageSelectorProps>(({ 
    labelClassName,  
    // label, 
    ...props 
}: ProfileImageSelectorProps) => {
    return (
        <label className={labelClassName}>
            {props.icon}
            <input className={props.inputClassName} {...props}/>
        </label>
    )
})
ProfileImageSelector.displayName = "ProfileImageSelector"