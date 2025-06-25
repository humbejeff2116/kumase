import { useState } from 'react';
import styles from './index.module.css';
import { Timer } from '../types';
import AdvertModal from './advert';
import { ButtonEvent } from '../types/events';
import { RiCloseFill } from "react-icons/ri";
import { IconContext } from 'react-icons';


const advertBannerData = {
    heading: 'Admission! Admission!! Admission!!!',
    p1: `Kumase College of Health Technology is currently 
    offering admissions for the 2025/2026 academic session.`,
    buttonText: `Get more details`,
    p2: `For more enquiries call us on any of these numbers `,
    contactNumbers: ['08136745730', '09053837074',' 08030507188', '08113044072']

}

interface AdvertBannerProps {
    show: boolean
    handleClose: (e: ButtonEvent) => void;
}

export default function AdvertBanner({
    show,
    handleClose
}: AdvertBannerProps) {
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    let timer: Timer = null;


    const handleShowAdvert = () => {
        setShowModal(true);
        timer = setTimeout(() => {
            setShowModalChild(true);
        })
    }

    const closeSearchModal = (e: ButtonEvent) => {
        e.stopPropagation();
        setShowModalChild(false);
        timer = setTimeout(() => {
            setShowModal(false);
        }, 800);
    }

    return (
        <>
        {showModal && (
            <AdvertModal
            handleModalClose={closeSearchModal}
            showChild={showModalChild}
            />
        )}
        <div className={`${styles.container} ${show && styles.showAdvert}`}>
            <div className={styles.closeButtonWrapper}>
                <button onClick={handleClose} className={styles.closeButton}>
                    <IconContext.Provider value={{className: styles.closeIcon}}>
                        <RiCloseFill/>
                    </IconContext.Provider>
                </button>
            </div>

            <div className={styles.advertWrapper}>
                <div className={styles.advertContent}>
                    <h3>{advertBannerData.heading}</h3>
                    <p>{advertBannerData.p1}</p>
                    <div className={styles.viewButtonWrapper}>
                        <button onClick={handleShowAdvert}>
                        {advertBannerData.buttonText}
                        </button>
                    </div>
                    <p>
                    {advertBannerData.p2}
                    {advertBannerData.contactNumbers.map((number, i) =>
                        <b key={i}>{number}{advertBannerData.contactNumbers.length !== (i + 1) && (<>, </>)}</b>
                    )}
                    </p>
                </div>
            </div>
        </div>
        </>
    )
} 