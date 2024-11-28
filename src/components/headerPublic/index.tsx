import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { BiLogIn, BiMenu, BiSearch } from "react-icons/bi";
import linksService, { NavLink, NavLinksType } from '@/data/links';
import useNavContext from '@/context/navigation/context';
import logo from '@/images/logo/JPG/kumase.jpg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './index.module.css';
import { RiHome2Line } from 'react-icons/ri';
import appRoutes from '@/routes';
import { CiLogin } from 'react-icons/ci';


const links = linksService.getPublicMainLinks();

interface HeaderProps {
    stickToTop?: boolean, 
    showLogin: () => void,
    containerModificationClass?: string,
    showBoxShadow?: boolean, 
}

export default function Header({ 
    stickToTop, 
    showLogin,
    // showBoxShadow,
    containerModificationClass,
}: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        return ()=> {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 60) {
           setScrolled(true);
        } else {
           setScrolled(false);
        }
    }

    const pathName = usePathname();
    const searchNavClassName = `${styles.searchNav} ${pathName === appRoutes.search && styles.searchNavActive}`;
    const headerClassName = `${styles.container} ${containerModificationClass || ""} ${stickToTop && scrolled ? styles.scrolled : ""}`;
   
    return (
        <header className = {headerClassName}>
            <section className={styles.headerLeft}>
                <section className={styles.logoContainer}>
                    <div  className={styles.logoImgWrapper}>
                        <Link href={appRoutes.index}>
                            <Image src={logo} alt='Kumase College of Health Technology '/>
                            {/* {orgName} */}
                        </Link>
                    </div>
                </section>
                <section className={styles.mainNavigationContainer}>
                    <MainNav links={links}/>
                </section>
            </section>

            <section className={styles.loginContainer}>
                <div className={styles.loginItems}>
                    {/* <div className={styles.searchWrapper}>
                        <Link 
                        href={appRoutes.search} 
                        title='Search'
                        className={searchNavClassName}
                        >
                            <IconContext.Provider value={{className: styles.searchIcon}}>
                                <BiSearch/>
                            </IconContext.Provider>
                        </Link>
                    </div> */}
                    <button 
                    className={`${styles.loginButton} ${pathName === appRoutes.signIn && styles.loginButtonActive}`}
                    onClick={showLogin}
                    >
                        <IconContext.Provider value={{className: styles.loginIcon}}>
                            <BiLogIn/>
                        </IconContext.Provider>
                        Portal
                    </button>
                    <MobileNavIcon/>
                </div>
            </section>
        </header>
    )
}

interface MainNavProps {
    links: NavLinksType 
}

function MainNav({ 
    links 
}: MainNavProps) {
    return (
        <nav className={styles.mainNavigation}>
            {links.map((link, i) => 
                <HeaderLink key={i} {...link}/>
            )}
        </nav>
    )
}

function HeaderLink({ 
    href, 
    name,
    icon,
}: NavLink) {
    const pathName = usePathname();
    const navItemClassName = `${styles.mainNavItem} ${pathName === href ? styles.mainNavItemActive: ''}`;
    const linkClassName = `${styles.navLink} ${pathName === href ? styles.navLinkActive: ''}`;
    
    return (
        <div className={navItemClassName}>
            <Link 
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

export function MobileNavIcon() {
    const { showOutsideLoginNav, toggleOutsideLoginNav } = useNavContext();
    
    return (
        <div 
        className = {`${styles.mobileNavIcon} ${showOutsideLoginNav ? styles.mobileNavOpen : ""}`}
        onClick = { toggleOutsideLoginNav }
        >
            <IconContext.Provider value={{className: "nav-Icon"}}>
                <BiMenu/>
            </IconContext.Provider>
        </div>
    )
}



