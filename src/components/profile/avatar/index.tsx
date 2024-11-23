import styles from './index.module.css';


export default function StudentAvatar() {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div>Edit Profile</div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomLeft}>
                    <div>
                        name
                    </div>
                    <div>
                        department
                    </div>
                </div>

                <div className={styles.bottomRight}>
                    profile image
                </div>
            </div>
        </div>
    )
}