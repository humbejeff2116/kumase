import { NavLinksType } from '@/data/links';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';



interface DropdownProps {
    links: NavLinksType 
}

export default function Dropdown({
    links
}: DropdownProps) {
    const router = useRouter();

    return (
        <div className={styles.dropdownContent}>
        {links.map(({href, name}, i) => {
                // const navItemClassName = `${styles.mainNavItem} ${router.pathname === href ? styles.mainNavItemActive: ''}`;
                const linkClassName = `${styles.navLink} ${router.pathname === href ? styles.navLinkActive: ''}`;

                return (
                    // <div key={i} className={navItemClassName}>
                        <Link 
                        key={i}
                        href={href}
                        className={linkClassName}
                        >
                            {name}
                        </Link>
                    // </div> 
                )        
            } 
        )}
        </div>
    )
}