import { RiCloseFill } from "react-icons/ri";
import { IconContext } from 'react-icons';
import styles from './index.module.css';
import Image from "next/image";
import advertImage from '@/images/advert.jpg';
import { ButtonEvent } from "@/components/types/events";



interface AdvertProps {
    showChild: boolean
    handleModalClose: (e: ButtonEvent) => void
}


export default function AdvertModal({
    showChild,
    handleModalClose
}: AdvertProps) {
    const containerChildClassName = `${styles.childWrapper}
    ${showChild && styles.show}`;

    return (
        <div className={styles.container}>
            <div className={containerChildClassName}>
                <Header handleClose={handleModalClose}/>
                <div className={styles.body}>
                    <div className={styles.imageWrapper}>
                        <Image src={advertImage} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const headerData = {
    headingText: 'Admission! Admission!! Admission!!!'
}

interface HeaderProps {
    handleClose: (e: ButtonEvent) => void
}

function Header({
    handleClose
}: HeaderProps) {
    return (
        <div className={styles.header}>
            <h3 className={styles.headingText}>
            {headerData.headingText}
            </h3>
            <div className={styles.closeContainer}>
                <button onClick={handleClose} className={styles.closeWrapper}>
                    <IconContext.Provider value={{className: styles.closeIcon}}>
                        <RiCloseFill/>
                    </IconContext.Provider>
                </button>
            </div>
       </div>
    )
}