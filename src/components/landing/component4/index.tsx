'use client'
import { useState } from 'react';
import styles from './index.module.css';
import Tab, { tabs } from './tab';
import LandingPageSectionWrapper from '../sectionWrapper';
import Reviews from '../reviews';
import Slider from './slider';




export default function Explore() {
    const [activeTab, setActiveTab] = useState(tabs.school);
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);

    const handleSetTab = (tabName: string) => {
        setActiveTab(tabName);
    }
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionOneWrapper}
        showWave
        >
            <Tab 
            handleSetTab={handleSetTab} 
            activeTab={activeTab}            
            />
            {activeTab === tabs.school ? (
                <Slider/>
            ) : activeTab === tabs.reviews ? (
                <Reviews/>
            ) : (
                <div>
                    events
                </div>
            )}
        </LandingPageSectionWrapper>
    )
}