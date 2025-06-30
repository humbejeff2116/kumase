'use client';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useAuth from '@/context/auth/context';
import avatar from '@/images/avatar/avatar2.png';
import styles from './index.module.css';



interface UserProfileProps {
    children?: React.ReactNode
}
export default function UserProfile({
    children
}: UserProfileProps) {
    const { student } = useAuth();
    const studentFullNames = `${student?.surname} ${student?.firstName} ${student?.otherName && student.otherName[0]}.`

    return (
        <div className={styles.container}>
            <div className={styles.childWrapper}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarWrapper}>
                        <Image 
                        src={student?.profileImage || avatar} 
                        alt={`${studentFullNames}'s picture`}
                        />
                    </div>
                </div>

                <div className={styles.userDetailsContainer}>
                    <UserDetail
                    detailName="fullName"
                    // showEditPanel={openEditComponent} 
                    detailIcon={
                        <FaUser/>
                    }
                    detail={studentFullNames} 
                    />

                    <UserDetail
                    detailName="Reg Number"
                    // showEditPanel={openEditComponent} 
                    detail={student?.regNo} 
                    detailIcon={ <MdEmail/> }
                    />

                    <UserDetail
                    detailName="Department"
                    // showEditPanel={openEditComponent} 
                    detail={student?.department} 
                    detailIcon={ <MdEmail/> }
                    />
                    <UserDetail
                    detailName="Level"
                    // showEditPanel={openEditComponent} 
                    detail={student?.level} 
                    detailIcon={ <MdEmail/> }
                    />
                </div>
                {children}
            </div>
        </div>
    )
}

interface UserDetailProps {
    detailName: string
    detailIcon: JSX.Element
    detail?: string
    icon?: JSX.Element
    // isEditable: boolean
    // showEditPanel: (detailName: string, detail?: string) => void
}

function UserDetail({
    detailName,
    detail,
    detailIcon,
    icon,
    // isEditable,
    // showEditPanel
}: UserDetailProps) {
    return (
        <div className={styles.userDetailsChild}>
            <div className={styles.userDetail}>
                <span>
                    <IconContext.Provider value={{className: styles.detailIcon}}>
                        {detailIcon }
                    </IconContext.Provider>
                </span>
                {detail}
            </div>
            {/* {isEditable ? (
                <div className={styles.userDetailButtonWrapper}>
                    <button onClick={() => showEditPanel(detailName, detail)}>
                        <IconContext.Provider value={{className: styles.detailButtonIcon}}>
                            {icon ?? <RiEdit2Fill/>}
                        </IconContext.Provider>
                    </button>
                </div>
            ) : null} */}
        </div>
    )
}