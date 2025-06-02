import Link from 'next/link';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';
import appRoutes from '@/routes';



export default function AvatarLinks() {
    return (
        <div className={styles.container}>
            <Link href={appRoutes.courseForm}>
            Print Course Form
            </Link>
            <Link href={appRoutes.profile}>
            View Profile
            <IconContext.Provider value={{className: styles.buttonIcon}}>
                <FiArrowRight/>
            </IconContext.Provider>
            </Link>
        </div>
    )
}