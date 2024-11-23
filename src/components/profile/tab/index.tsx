import { IconContext } from 'react-icons';
import { FiActivity, FiArrowLeft } from 'react-icons/fi';
import styles from './index.module.css';
import { BiWallet } from 'react-icons/bi';

export const tabs = {
    profile: 'profile',
    activity: 'activity'
}
interface TabProps {
    activeTab: string
    handleSetTab: (tabName: string) => void
}
export default function Tab({
    activeTab,
    handleSetTab
}: TabProps) {
    const { profile, activity } = tabs;
    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <button 
                title={profile}
                className={`${styles.button} ${activeTab === profile && styles.isActive}`} 
                onClick={() => handleSetTab(profile)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <BiWallet/>
                    </IconContext.Provider>
                </button>
                <button 
                title={activity} 
                className={`${styles.button} ${activeTab === activity && styles.isActive}`}
                onClick={() => handleSetTab(activity)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <FiActivity/>
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}