import Link from 'next/link';
import Image from 'next/image';
import linksService, { NavLink, NavLinksType } from '@/data/links';
import styles from './index.module.css';
import appRoutes from '@/routes';
import logo from '@/images/logo/JPG/kumase.jpg';
import SubscribeForm from './subscribeForm';
import { IconContext } from 'react-icons';
import { RiUser3Line } from 'react-icons/ri';
import { FaBookReader, FaInfoCircle, FaUserSecret } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import defaultIllustration from '@/images/illustration/freepick/med-students-1.svg'


interface TopRightLinkType {
    headerText: string
    headerIcon: React.ReactElement 
    links: NavLinksType
}
type TopRightLinks = Array<TopRightLinkType>;

const topLeftSocialLinks = linksService.getPublicSocialLinks();
const topRightMainLinks = [
    {
        headerText: 'KuchTech',
        headerIcon: <FaInfoCircle/>,
        links: [
            {name: 'About us', href: appRoutes.about},
            // {name: "Contact Us", href: appRoutes.contactUs}, 
            {name: 'Terms', href: appRoutes.terms}, 
            {name: 'Privacy', href: appRoutes.privacy}
        ]
    },
    {
        headerText: 'Q. links',
        headerIcon: <FaLink/>,
        links: [
            {name: "Contact us", href: appRoutes.about},
            { name: "Events", href: appRoutes.about}, 
            {name: 'Courses', href: appRoutes.about}, 
            {name: "Portal", href: appRoutes.about},
        ]
    }
]
interface FooterProps {
    footerClassName?: string
    topRightMainLinks?: TopRightLinks
    topLeftSocialLinks?: NavLinksType  
}

export default function Footer({ 
    footerClassName,
    // topLeftSocialLinks,
    // topRightMainLinks 
}: FooterProps) {
    return (
        <footer className = {footerClassName ? footerClassName : styles.container}>
            <Top 
            topLeftSocialLinks={topLeftSocialLinks} 
            topRightMainLinks={topRightMainLinks}
            />
            <Bottom/>

            <div className={styles.backgroundImageWrapper}>
                <Image src={defaultIllustration} alt='' className={styles.svg1}/>
            </div>
        </footer>
    )
}

interface TopProps {
    topLeftSocialLinks: NavLinksType,
    topRightMainLinks: TopRightLinks  
}

function Top({
    topLeftSocialLinks,
    topRightMainLinks
}: TopProps) {
    return (
        <div className={styles.top}>
            <TopLeft topLeftSocialLinks={topLeftSocialLinks}/>
            <TopRight topRightMainLinks={topRightMainLinks}/>
        </div>
    )
}

interface TopLeftProps {
    topLeftSocialLinks: NavLinksType
}

function TopLeft({
    topLeftSocialLinks,
}: TopLeftProps) {
    return (
        <div className={styles.topLeft}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image src={logo} alt='Kumase'/>
                </Link>
            </div>
            <div className={styles.logoText}>
            Promoting health care devilery service through 
            training and retraining of health personnel.
            </div>
            <div className={styles.logoText}>
                <SubscribeForm/>
            </div>
            <div className={styles.logoText}>
                Opposite Wino Pharmacy Wadata, Makurdi, Benue State. 
            </div>
            <section className={styles.socialSection}>
                <nav className={styles.socialNav}>              
                {topLeftSocialLinks.map((link, i) =>
                    <SocailLink key={i} {...link}/>
                )}
                </nav>
            </section>
        </div>
    )
}

interface footerLoginLinksProps {
    links: Array<LoginLinkProps>
}

interface LoginLinkProps {
    id?: string
    name: string
    href: string
    icon?: React.ReactNode
}
function LoginLink({
    name,
    href,
    icon
}: LoginLinkProps) {
    return (
        <Link 
        href={href} 
        title={name} 
        className={styles.loginLink}
        >  
        {name}
        </Link>
    )
}

function SocailLink({ 
    href, 
    name, 
    icon
}: NavLink) {
    return (
        <div className={styles.socialLinkWrapper}>
            <Link
            target='_blank' 
            href={href} 
            title={name} 
            className={styles.socialLink}
            >  
            <i>{icon}</i> 
            </Link>
        </div> 
    )
}

interface TopRightProps {
    topRightMainLinks: TopRightLinks 
}

function TopRight({
    topRightMainLinks
}: TopRightProps) {
    return (
        <div className={styles.topRight}>
        {topRightMainLinks.map((link, i) =>
            <TopRightChild {...link} key={i}/> 
        )}
        </div>
    )
}

interface TopRightChildProps {
    headerText: string
    headerIcon: React.ReactElement 
    links: NavLinksType
}

function TopRightChild({ 
    headerText,
    headerIcon,
    links
}: TopRightChildProps) {
    return (
        <div className={styles.topRightChild}>
            <div className={styles.topRightChildHeader}>
                <IconContext.Provider value={{className: styles.rightChildIcon}}>
                {headerIcon}
                </IconContext.Provider>
                {headerText}
            </div>
            <ul>
            {links.map((link, i) => 
                <TopRightChildLinks {...link} key = {i}/>
            )}
            </ul>
        </div>
    )
}

function TopRightChildLinks({ 
    name, 
    href 
}: NavLink) {
    return (
        <li>
            <Link href={href}>
                {name}
            </Link>
        </li>
    )
}


function Bottom() {
    return (
        <div className={styles.bottom}>
            <section className={styles.bottomChild}>
                &copy; {new Date().getFullYear()} Kumase
                College of Health Tech<sup>TM</sup>
                {/* . All rights reserved */}
            </section>
        </div>
    )
}