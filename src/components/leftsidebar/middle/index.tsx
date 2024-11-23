import linksService from '@/data/links';
import NavigationLink from '../navLink';
import styles from './index.module.css';

const links = linksService.getSideNavLinks();

export default function MiddleLeftSideBar() {
    return (
        <div className={styles.container}>
        {links.map((link, i) =>
            <NavigationLink key={i} {...link}/>
        )}
        </div>
    )
}