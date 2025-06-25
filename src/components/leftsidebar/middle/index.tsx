'use client';
import linksService, { linkNames } from '@/data/links';
import NavigationLink from '../navLink';
import styles from './index.module.css';
import useAuth from '@/context/auth/context';

const links = linksService.getSideNavLinks();

export default function MiddleLeftSideBar() {
    const { student } = useAuth();

    return (
        <div className={styles.container}>
            {/* {student && (
                (() => {
                    return <></>
                })()
            )} */}
        {links.map((link, i) => {

            if (link.name === linkNames.private.courseReg || link.name === linkNames.private.courseForm) {
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
        })}
        </div>
    )
}