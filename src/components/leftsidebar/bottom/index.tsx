import linksService from '@/data/links';
import { NavigationLink2 } from '../navLink';
import styles from './index.module.css';

const links = linksService.getSideNavFooterLinks();

export default function BottomLeftSideBar() {
    return (
        <div className={styles.container}>
        {links.map((link, i) =>
            <NavigationLink2 key={i} {...link}/>
        )}
        </div>
    )
}
