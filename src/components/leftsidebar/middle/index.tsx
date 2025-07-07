'use client';
import linksService, { linkNames, linksRequireStudentId } from '@/data/links';
import NavigationLink from '../navLink';
import styles from './index.module.css';
import useAuth from '@/context/auth/context';

const links = linksService.getSideNavLinks();
const adminLinks = linksService.getAdminLinks();

interface MiddleLeftSideBarProps {
    useInAdmin?: boolean
}

export default function MiddleLeftSideBar({
    useInAdmin
}: MiddleLeftSideBarProps) {
    const { student } = useAuth();

    return (
        <div className={styles.container}>
            {useInAdmin ? (
                adminLinks.map((link, i) =>
                    <NavigationLink key={i} {...link}/>
                )
            ) : (
                links.map((link, i) => {
                    if (linksRequireStudentId.includes(link.name)) {
                        const newHref = `${link.href}/${student && encodeURIComponent(student.id || student._id)}`;

                        return (
                            <NavigationLink 
                            key={i} 
                            {...link}
                            href={newHref}
                            />
                        )
                    }

                    return (
                        <NavigationLink key={i} {...link}/>
                    )
                })
            )}
        </div>
    )
}