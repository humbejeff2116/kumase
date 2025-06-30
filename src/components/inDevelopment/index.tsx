import Image from "next/image";
import ToolsImage from '@/images/error/notfound8.jpg';
import styles from './index.module.css';



export default function StillInDev() {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src={ToolsImage} alt='Photo of tools'/>
            </div>
            <div className={styles.body}>
            Section In Development
            </div>
        </div>
    )
}