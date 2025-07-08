'use client'
import Link from 'next/link';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';
import appRoutes from '@/routes';
import useAuth from '@/context/auth/context';



export default function AvatarLinks() {
    const { student } = useAuth();
    const accountLink = `${appRoutes.account}/${student && encodeURIComponent(student.id || student._id)}`;
    const courseFormLink = `${appRoutes.courseForm}/${student && encodeURIComponent(student.id || student._id)}`;
    
    return (
        <div className={styles.container}>
            <Link href={courseFormLink}>
                Course Form
            </Link>
            
            <Link href={accountLink}>
                My Account
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <FiArrowRight/>
                </IconContext.Provider>
            </Link>
        </div>
    )
}