import { IconContext } from 'react-icons';
import { 
    RiCalendarEventLine, 
    RiGalleryLine, 
    RiSchoolLine 
} from 'react-icons/ri';
import styles from './index.module.css';
import { MdReviews } from 'react-icons/md';
import { TbMessageStar } from 'react-icons/tb';

export const tabs = {
    school: 'school',
    events: 'events',
    reviews: 'reviews',
    gallery: 'gallery'

}

interface TabProps {
    activeTab: string
    handleSetTab: (tabName: string) => void
}

export default function Tab({
    activeTab,
    handleSetTab
}: TabProps) {
    const { school, reviews, events, gallery } = tabs;
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
                <button 
                title={gallery} 
                className={`${styles.button} ${activeTab === gallery && styles.isActive}`}
                onClick={() => handleSetTab(gallery)}
                >
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiGalleryLine/>
                    </IconContext.Provider>
                    Gallery
                </button>
            </div>
        </div>
    )
}