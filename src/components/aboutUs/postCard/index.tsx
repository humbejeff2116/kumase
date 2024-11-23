import Image from 'next/image';
import defaultPostImage from '@/images/best-cms-next-js.webp';
import { StaticImageData } from 'next/image';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import { FaCalendar } from 'react-icons/fa';
import { RiShareFill } from 'react-icons/ri';
import React from 'react';
import { FiClock } from 'react-icons/fi';
import { ButtonEvent } from '@/components/types/events';



export interface AuthorProfile {
    userId: string
    name: string
    profileImage?: StaticImageData
}

interface BlogPostCardProps {
    image?: StaticImageData
    title: string
    date: string
    author: AuthorProfile
}

export default function BlogPostCard({
    image,
    title,
    author,
    date,
}: BlogPostCardProps) {

    const handleSharePost = (e: ButtonEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src={image || defaultPostImage} alt=""/>
            </div>

            <div className={styles.body}>
                <div className={styles.title}>
                    {title}
                </div>
                <ProfileAndShare
                profile={
                    <PostProfile 
                    {...author}
                    date={date}
                    />
                }
                // handleShare={handleSharePost}
                />
            </div>
        </div>
    )
}

interface ProfileAndShareProps {
    profile: React.ReactNode
    // handleShare: (e: ButtonEvent) => void
}
export function ProfileAndShare({
    profile,
    // handleShare
}: ProfileAndShareProps) {
    return (
        <div className={styles.postOwnerProfileWrapper}>
            {profile}
            {/* <div className={styles.buttonsWrapper}>
                <button onClick={(e) => handleShare(e)}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <RiShareFill/>
                </IconContext.Provider>
                </button>
            </div> */}
        </div>
    )
}

interface PostProfileProps {
    userId?: string
    name: string
    date?: string
    profileImage?: StaticImageData | string
}

export function PostProfile({
    userId,
    name,
    profileImage,
    date
}: PostProfileProps) {
    const getUserDetails = () => {

    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <Image src={profileImage || defaultPostImage} alt=''/>
            </div>
            <div className={styles.profileName}>
                {name}
            </div>
            {date && (
                <div className={styles.profileDate}>
                Published on {date}
                </div>
            )}
        </div>
    )
}
