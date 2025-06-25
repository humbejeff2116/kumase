import Link from 'next/link';
import { IconContext } from "react-icons";
import { 
    RiLoginBoxFill, 
    RiLoginCircleFill, 
    RiUserAddFill 
} from 'react-icons/ri';
import appRoutes from "@/routes";
import { usePathname } from 'next/navigation';
import styles from './index.module.css';



const loginAndSignupLinks = [
    {
        name: 'Sign Up',
        href: appRoutes.signUp,
        icon: <RiUserAddFill/>
    },
    {
        name: 'Log In',
        href: appRoutes.signIn,
        icon: <RiLoginBoxFill/>
    }
]

interface LoginAndSignupLinksProps {
    closeLinks: () => void
}
export default function LoginAndSignupLinks({
    closeLinks
}: LoginAndSignupLinksProps) {
    return (
        <div className={styles.container}>
            {loginAndSignupLinks.map((link, i) => 
                <LoginAndSignupLink 
                key={i} 
                {...link}
                closeLinks={closeLinks}
                />
            )}
        </div>
    )
}

interface LoginAndSignupLinkProps {
    name: string
    href: string
    icon: React.ReactElement
    closeLinks: () => void
}
function LoginAndSignupLink({
    name,
    href,
    icon,
    closeLinks,
}: LoginAndSignupLinkProps) {
    const pathname = usePathname();

    const isActivePath = (pathname: string | null , href: string) => {
        return pathname === href
    }

    const navItemClassName = `${styles.linkWrapper} ${isActivePath(pathname, href) ? styles.linkWrapperActive : ''}`;
    const linkClassName = `${styles.link} ${href === appRoutes.signIn ? styles.loginLink : styles.signupLink} ${isActivePath(pathname, href) ? styles.linkActive : ''}`;
    
    return (
        <div className={navItemClassName}>
            <Link 
            onClick={closeLinks}
            href={href}
            className={linkClassName}
            >
            {href === appRoutes.signUp ? (
                <>
                <IconContext.Provider value={{className: styles.signupIcon}}>
                    {icon}
                </IconContext.Provider>
                {name}
                </>
            ) : (
                <>
                {name}
                <IconContext.Provider value={{className: styles.navIcon}}>
                    {icon}
                </IconContext.Provider>
                </>
            )}
            </Link>
        </div>
    )
}