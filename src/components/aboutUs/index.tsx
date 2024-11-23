import Image, { StaticImageData } from 'next/image';
import defaultIllustration from '@/images/illustration/freepick/med-students-2.svg';
import { useState } from 'react';
import { AuthorProfile, PostProfile, ProfileAndShare } from './postCard';
import BackButton from '../backButton';
import styles from './index.module.css';
import LandingPageSectionWrapper from '../landing/sectionWrapper';


export interface AboutUsProps {
    author: AuthorProfile
    tags: Array<string>
    image?: StaticImageData
    title: string
    date: string
    content: any
}



const aboutUs = {
    id:"1",
    slug: "this-is-slug-1",
    author: {
        userId: "6467364",
        name: "Admin",
        profileImage: defaultIllustration 
    },
    tags: ["health", "school"],
    title: "ABout Kumase College of Health Technology",
    date: "April 5, 2023",
    content: ` 
    Dependence on government on all spheres of life is no longer feasible. 
    Non-governmental organizations including well meaning individuals have to embark 
    on a number of calculated strategies to compliment government efforts in all aspects 
    of human endeavours. Despite the existence of numerous colleges or schools of Health 
    Technologies in each state of the Federation, as well as some private/community initiatives 
    also established in the country, we reasoned that there is still need for establishment of 
    more schools or colleges of health due to the continious increase in human populaton and. 
    In order to cater for the ever increasing needs of the society, coupled with the 
    improper location or imbalances of some colleges/schools of health technology, the idea 
    of establishing Kumase College of Health Technology in Benue state by like minded 
    individuals came up. The college aims at helping to improve on the shortage of health 
    personnel's, and also complement government's efforts in producing trained health personnel 
    and create job opportunities for our beloved Nigerians.`
}

export default function ArticleWrapper() {
    return (
        <AboutUs {...aboutUs}/>
    )
}

function AboutUs({
    author,
    tags,
    image,
    title,
    date,
    content,
}: AboutUsProps) {

    return (
            <>
            <LandingPageSectionWrapper 
            useDefaultChildWrapper
            containerModifyClass={styles.sectionContainer}
            childWrapperModifyClass={styles.sectionWrapper}
            showWave
            // useWave2
            >
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarButtons}>
                        <BackButton
                        buttonWrapperClassName={styles.backButtonWrapper}
                        buttonIconClassName={styles.backButtonIcon}
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightChild}>
                        <div className={styles.imageWrapper}>
                            <Image src={image || defaultIllustration} alt=""/>
                        </div>
                        <div className={styles.body}>
                            <ProfileAndShare
                            profile={
                                <PostProfile 
                                {...author}
                                date={date}
                                />
                            }
                            />
                            <div className={styles.title}>
                                {title}
                            </div>
                            <div className={styles.tagsWrapper}>
                                <ul className={styles.tagsUl}>
                                {tags.map((tag, i) => 
                                    <li key={i} className={styles.tagsLi}>
                                        #{tag}
                                    </li>
                                )}
                                </ul>
                            </div>
                            <div className={styles.content}>
                                <p>
                                {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </LandingPageSectionWrapper>
        </>
    )
}