import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { BiMenu, BiSearch } from "react-icons/bi";
import Link from 'next/link';
import logo2 from '@/images/logo/JPG/kumase.jpg';
import Image from 'next/image';
import styles from './index.module.css';
import LoginAndSignupLinks from './loginAndSignup';
import { RiMenu2Fill, RiMenuFill } from 'react-icons/ri';
import { Org } from '@/lib';
import linksService from '@/data/links';
import appRoutes from '@/routes';
import { usePathname } from 'next/navigation';
// import { publicRoutes } from '@/data/app';


const links = linksService.getPublicMainLinks();



export default function MobileHeader() {
    const [showNavigation, setShowNavigation] = useState(false);

    useEffect(() => {
        if (windowSize() > 800 && showNavigation) {
            setShowNavigation(false);
        }
    }, [showNavigation]);

    // TODO... complete implementation of windowSize functionality
    const windowSize = () => {
        return 800;
    }
    
    const toggleNavLinks = () => {
        setShowNavigation(prevState => !prevState);
    }

    const closeLinks = () => {
        if (showNavigation) {
            setShowNavigation(false);
        }
    }

    return (
        <>
            <MobileMainLinks
            navLinksOpen={showNavigation}
            toggleNavLinks={toggleNavLinks}
            closeNavLinks={closeLinks}
            />
            <MobileNavigationLinks
            closeLinks={closeLinks}
            links={links}
            showNavigation={showNavigation}
            />
        </>
    )
}

interface MobileMainLinksProps {
    navLinksOpen: boolean
    toggleNavLinks: () => void
    closeNavLinks: () => void
}

function MobileMainLinks({
    toggleNavLinks,
    closeNavLinks,
    navLinksOpen
}: MobileMainLinksProps) {
    const pathName = usePathname();

    return (
        <div className={styles.mainLinksContainer}>
            <div className={`${styles.mainLinksChild} ${styles.logo}`}>
                <Link href={appRoutes.index}>
                    <Image src={logo2} alt={Org.name}/>
                </Link> 
            </div>

            <div className={`${styles.mainLinksChild} ${styles.right}`}>
                <div 
                onClick={closeNavLinks} 
                className={`${styles.searchWrapper} ${pathName === appRoutes.search && styles.searchActive}`}
                >
                    <Link href={appRoutes.search} title='Search'>
                        <IconContext.Provider value={{className: styles.searchIcon}}>
                            <BiSearch/>
                        </IconContext.Provider>
                    </Link>
                </div>
                <div 
                onClick={toggleNavLinks}
                className={`${styles.menuIconWrapper} ${navLinksOpen && styles.menuOpen}`}
                >
                    <IconContext.Provider value={{className: styles.menuIcon}}>
                    <RiMenuFill/>
                    </IconContext.Provider>
                </div>
                {/* <Link href={appRoutes.signIn} className={styles.loginButton}>
                    Login
                </Link> */}
            </div>
        </div>
    )
}

interface MobileNavigationLinksProps {
    closeLinks: () => void
    links: Array<any>
    showNavigation: boolean
}

function MobileNavigationLinks({
    closeLinks,
    links,
    showNavigation
}: MobileNavigationLinksProps) {
    const containerClassName = `${styles.mobileNavLinksContainer} ${showNavigation && styles.showMobileNavLinks}`;

    return (
        <div className={containerClassName}>
            {/* NOTE... functionality is dropped as requested, but will be run at a later time */}
            <LoginAndSignupLinks closeLinks={closeLinks}/>
        {links.map((link, i) => 
            <MobileLink 
            key={i} 
            {...link}
            closeLinks={closeLinks}
            />
        )}
        </div>
    )
}

interface MobileLinkProps {
    closeLinks: () => void
    href: string 
    name: string
    icon: JSX.Element
}
function MobileLink({
    closeLinks,
    icon, 
    href, 
    name, 
}: MobileLinkProps) {
    const pathName = usePathname();
    const navItemClassName = `${styles.navLinkWrapper} ${pathName === href ? styles.navLinkWrapperActive : ''}`;
    const linkClassName = `${styles.navLink} ${pathName === href ? styles.navLinkActive : ''}`;
    
    return (
        <div className={navItemClassName}>
            <Link 
            onClick={closeLinks}
            href={href}
            className={linkClassName}
            >
                <IconContext.Provider value={{className: styles.navIcon}}>
                    {icon}
                </IconContext.Provider>
                {name}
            </Link>
        </div>  
    ) 
}