'use client'
import { useState } from "react";
import Tab, { tabs } from './tab';
import styles from './index.module.css';
import CurrentSession from "./session";
import StudentDetails from "./studentDetails";
import StudentAvatar from "./avatar1";
import UserProfile from "../userProfile";
import AvatarLinks from "./avatarButtons";
import LandingPageSectionWrapper from '../landing/sectionWrapper';




export default function ProfileWrapper() {
    const [activeTab, setActiveTab] = useState(tabs.profile);
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);

    const handleSetTab = (tabName: string) => {
        setActiveTab(tabName);
    }

    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionWrapper}
        showWave
        // useWave2
        >
            <CurrentSession/>
            <Tab handleSetTab={handleSetTab} activeTab={activeTab}/>
            <div className={styles.childWrapper}>
            {activeTab === tabs.profile ? (
                <StudentProfile/>
            ) : (
                <div>
                    user activity
                </div>
            )}
            </div>
        </LandingPageSectionWrapper>
 
    )
}


function StudentProfile() {
    return (
        <div>
            <UserProfile>
                <AvatarLinks/>
            </UserProfile>
        </div>
    )
}