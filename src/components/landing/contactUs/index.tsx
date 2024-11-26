'use client'
import { RiMailFill, RiPhoneFill, RiMapPin2Fill } from 'react-icons/ri';
import styles from './index.module.css';
import { IconContext } from 'react-icons';
import Link from 'next/link';
import { MdArrowForwardIos }  from 'react-icons/md';
import LandingPageSectionWrapper from '../sectionWrapper';
import appRoutes from '@/routes';

interface ContactItem {
    icon: React.ReactElement
    content: string
}
const section10Data = {
    heading: "Contact Us",
    contact1: {
        place: "Nigeria",
        address: [
            {
                icon: <RiMapPin2Fill/>,
                content:"Beside Jolua Hospital Wadata, Makurdi, Benue State."
            }
        ],
        email: [
            {
                icon: <RiMailFill/>,
                content:"kuchtech01.com"
            }
        ],
        number: [
            {
                icon: <RiPhoneFill/>,
                content: "08136745730, 08020305855"
            }
        ]
    },
}

export default function ContactUs() {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionTenWrapper}
        >
            <div className={styles.heading}>
                <h1>
                {section10Data.heading}
                </h1>
            </div>

            <div className={styles.body}>
                <div className={styles.left}>
                    {/* <WhoWeareBackgroundImages /> */}
                    <ContactAddress 
                    heading={section10Data.contact1.place} 
                    address={section10Data.contact1.address} 
                    number={section10Data.contact1.number} 
                    email={section10Data.contact1.email}
                    />
                </div>
                <div className={styles.right}>
                    <div className={styles.contactContainer}>
                        <div className={styles.contactHeadingWrapper}>
                            <h1>
                                {/* Want to get in touch?  */}
                                We would love to hear from you, anytime.
                            </h1>
                        </div>
                        <div className={styles.contactLinkWrapper}>
                            <Link href={'/#'}>
                                Send us a message
                                <MdArrowForwardIos className={styles.contactLinkIcon}/>
                            </Link>
                        </div>
                    </div>
                    {/* <ContactForm usedInLandingPage/> */}
                </div>
            </div>
        </LandingPageSectionWrapper>
    )
}

interface ContactAddressProps {
    heading: string
    address: Array<ContactItem>
    number: Array<ContactItem>
    email: Array<ContactItem> 
}
function ContactAddress({
    heading,
    address,
    number,
    email   
}: ContactAddressProps) {
    return (
        <div className={styles.contactAddressWrapper}>
            <div className={styles.contactAddressHeading}>
                {heading}
            </div>

            <div className={styles.contactAddressBody}>
            {address.map(({icon, content}, i) =>  
                <DetailWrapper key={i} icon={icon}>
                <>
                {content}
                </>
                </DetailWrapper>
            )}
            {number.map(({icon, content}, i) => 
                <DetailWrapper key={i} icon={icon}>
                <>
                {content}
                </>
                </DetailWrapper>
            )}
            {email.map(({icon, content}, i) => 
                <DetailWrapper key={i} icon={icon}>
                <>
                {content}
                </>
                </DetailWrapper>
            )}
            </div>
        </div>
    )
}

interface DetailWrapperProps {
    icon: React.ReactElement
    children: React.ReactElement
    childrenModifyClass?: string
    iconWrapperModifyClass?: string
}

export function DetailWrapper({
    icon,
    children,
    childrenModifyClass,
    iconWrapperModifyClass
}: DetailWrapperProps) {
    return (
        <div className={styles.detailWrapper}>
            <div className={`${styles.iconWrapper} ${iconWrapperModifyClass}`}>
                <IconContext.Provider value={{className: styles.detailIcon}}>
                {icon}
                </IconContext.Provider>
            </div>
            <div className={`${styles.childrenWRapper} ${childrenModifyClass}`}>
                {children}
            </div>
        </div>
    )
}