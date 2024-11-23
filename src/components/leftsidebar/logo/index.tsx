import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo/JPG/kumase.jpg';
import appRoutes from '@/routes';
import styles from './index.module.css';




export default function Logo() {
    return (
        <div className={styles.logoImgWrapper}>
             <Link href={appRoutes.index}>
                <Image src={logo} alt='Kumase College of Health Technology'/>
                {/* {orgName} */}
            </Link>
        </div>
    )
}