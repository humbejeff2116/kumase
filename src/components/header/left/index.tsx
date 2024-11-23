import { IconContext } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './index.module.css';
import linksService from "@/data/links";

const headerMainLinks = linksService.getPublicMainLinks(); 

export default function LeftHeader() {
    return (
        <div className={styles.container}>
            <div className={styles.linksWrapper}>
            {headerMainLinks.map((link, i) => 
                <AppLink key={i} {...link}/>
            )}
            </div>
        </div>
    )
}

interface LinkProps {
    icon?: React.ReactElement | JSX.Element
    name: string
    href: string
}

function AppLink({
    name,
    href,
    icon
}: LinkProps) {
    const pathName = usePathname();
    const linkClassName = `${styles.navLink} ${pathName === href && styles.activeLink}`; 

    return (
        <Link 
        href={href}
        title={name}
        className={linkClassName}
        >
            <IconContext.Provider value={{className: styles.icon}}>
            {icon}
            </IconContext.Provider>
            {name}
        </Link>
    )
}