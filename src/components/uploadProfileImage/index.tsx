import { useState } from "react";
import { ModalBox } from "../modal/centerModals";
import ProfileImageUploader from "./imageUploader";
import { Timer } from "../types";
import styles from './index.module.css';




interface UploadProfileImageProps {
    // showModal: boolean 
    // handleModal: () => void
}

// TODO... 
// display component  when user want to register course and is yet to upload profile image
// move show modal and showmodalchild functionlality to parent component that consumes this component
export default function UploadProfileImage({

}: UploadProfileImageProps) {
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    let timer: Timer = null;
    
    const closeModal = () => {
        setShowModalChild(false);

        timer = setTimeout(() => {
            setShowModal(false);
        }, 800);
    }

    const handleShowModal = () => {
        if(!showModal) {
            setShowModal(true);
        }
        
        timer = setTimeout(() => {
            setShowModalChild(true);
        });
    }

    return (
        <>
        {showModal && (
            <ModalBox handleModal={closeModal}>
                <div
                className={`${styles.container} ${showModalChild && styles.showModalChild}`}
                onClick={(e)=> e.stopPropagation()}
                >
                    <ProfileImageUploader/>
                </div>
            </ModalBox>
        )}
        </>
    )
}