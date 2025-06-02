'use client'
import useAuth, { Student } from "@/context/auth/context"
import { IMAGE_DOMAIN } from "@/services/http.config";
import Image from "next/image";
import styles from './index.module.css';
import { School } from "@/context/college/types";
import { StudentToken } from "@/context/studentToken/types";
import avatar from '@/images/avatar/avatar2.png';
import { IconContext } from "react-icons";
import { FaUser } from "react-icons/fa";
import { MdBookmark, MdCopyAll, MdEmail, MdTagFaces, MdToken } from "react-icons/md";
import { useState } from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";



interface StudentCardProps {
    student: Student
    studentToken: StudentToken
    // school: School
}


export default function StudentCard({
    student,
    studentToken,
}: StudentCardProps) {
    const [copiedToken, setCopiedToken] = useState(false);
    const src = student?.profileImage ? `${IMAGE_DOMAIN}/${student?.profileImage}` : avatar;


    const handleCopyToken = async () => {
        if (studentToken.value) {
            await navigator.clipboard.writeText(studentToken.value);
            setCopiedToken(true);
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.userImageWrapper}>
                    <Image 
                    width={50} 
                    height={50} 
                    alt={`Photo of ${student?.firstName}`} 
                    src={src}
                    />
                </div>
            </div>

            <div className={styles.bottom}>
                <DetailWrapper 
                title='Full name'
                detailIcon={<FaUser/>}  
                >
                    <span>{`${student?.surname} ${student?.firstName}`}</span>  
                </DetailWrapper>

                <DetailWrapper 
                title='Reg No'
                detailIcon={ <MdBookmark/> }
                >
                    <span>{student?.regNo}</span>
                </DetailWrapper>

                <DetailWrapper 
                title='My Token'
                detailIcon={<MdToken/>}
                >
                    <>
                    {studentToken ? (
                        <>
                            <span>{studentToken.value}</span>
                            {/* <span onClick={handleCopyToken} className={styles.copyIconWrapper}>
                                <IconContext.Provider 
                                value={{className: `${styles.copyIcon} ${copiedToken && styles.copyIconSuccess}`}}
                                >
                                {copiedToken ? (
                                    <BiCheckDouble/>
                                ) : (
                                    <MdCopyAll/>
                                )}
                                </IconContext.Provider> 
                            </span> */}
                        </>
                    ) : (
                        <span>
                            You do not have an active token, 
                            please purchase one from school
                        </span>
                    )} 
                    </>
                </DetailWrapper>
            </div>
        </div>
    )
}


function DetailWrapper({
    title,
    detailIcon,
    children
}: {
    title: string
    detailIcon: JSX.Element
    children: React.ReactNode
}) {
    return (
        <div className={styles.detailWrapper}>
            <div className={styles.detailChildrenWrapper}>
            <span>
                <IconContext.Provider value={{className: styles.detailIcon}}>
                    {detailIcon}
                </IconContext.Provider>
            </span>
            {children}
            </div>
            <span className={styles.detailTitle}>
            ({title})
            </span>
        </div>
    )
}