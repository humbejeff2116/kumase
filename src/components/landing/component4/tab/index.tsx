import { IconContext } from 'react-icons';
import { 
    RiCalendarEventLine, 
    RiSchoolLine 
} from 'react-icons/ri';
import styles from './index.module.css';
import { MdReviews } from 'react-icons/md';
import { TbMessageStar } from 'react-icons/tb';

export const tabs = {
    school: 'school',
    events: 'events',
    reviews: 'reviews',

}
interface TabProps {
    activeTab: string
    handleSetTab: (tabName: string) => void
}
export default function Tab({
    activeTab,
    handleSetTab
}: TabProps) {
    const { school, reviews, events } = tabs;
    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <button 
                title={reviews} 
                className={`${styles.button} ${activeTab === reviews && styles.isActive}`}
                onClick={() => handleSetTab(reviews)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <TbMessageStar/>
                    </IconContext.Provider>
                    Reviews
                </button>
                <button 
                title={school}
                className={`${styles.button} ${activeTab === school && styles.isActive}`} 
                onClick={() => handleSetTab(school)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiSchoolLine/>
                    </IconContext.Provider>
                    School
                </button>
                {/* <button 
                title={events} 
                className={`${styles.button} ${activeTab === events && styles.isActive}`}
                onClick={() => handleSetTab(events)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiCalendarEventLine/>
                    </IconContext.Provider>
                    Events
                </button> */}
            </div>
        </div>
    )
}