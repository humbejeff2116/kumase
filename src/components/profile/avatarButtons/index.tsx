import Link from 'next/link';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';



export default function AvatarLinks() {
    return (
        <div className={styles.container}>
            <Link href={'/home/course-form'}>
            Print Course Form
            </Link>
            <Link href={'/home/profile'}>
            View Profile
            <IconContext.Provider value={{className: styles.buttonIcon}}>
                <FiArrowRight/>
            </IconContext.Provider>
            </Link>
        </div>
    )
}