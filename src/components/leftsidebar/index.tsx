import React from 'react';
import useNavContext from '@/context/navigation/context';
import Logo from './logo';
import MiddleLeftSideBar from './middle';
import BottomLeftSideBar from './bottom';
import styles from './index.module.css';
import useAuth from '@/context/auth/context';


interface LeftSideBar {
    fixed?: boolean
    sidebarClassName?: string
    logo?: React.ReactNode
    top?: React.ReactNode
    middle?: React.ReactNode 
    bottom?: React.ReactNode
}

export default function LeftSideBar({
    fixed,
    sidebarClassName,
    logo,
    // top,
    middle,
    bottom,
}: LeftSideBar) {
    return (
        <LeftSideBarTemplate 
        sidebarClassName={sidebarClassName}
        fixed ={fixed}
        logo={logo ?? <Logo/>}
        // top={top ?? <TopLeftSideBar/>}
        middle={middle ?? <MiddleLeftSideBar/>}  
        // bottom={bottom ?? <BottomLeftSideBar/>} 
        />
    )
}

function LeftSideBarTemplate({
    // fixed,
    sidebarClassName,
    logo,
    // top,
    middle,
    bottom,
}: LeftSideBar) {
    const { showLeftSideBar } = useNavContext();
    const { user } = useAuth();

    let leftSidebarClassName;

    if (sidebarClassName) {
        leftSidebarClassName = `${sidebarClassName} ${showLeftSideBar && styles.show} ${styles.fixed}`;
    } else {
        leftSidebarClassName = `${styles.container} ${showLeftSideBar && styles.show} ${styles.fixed}`;
    } 
  
    return (
        <section className={leftSidebarClassName}>
            <section className={styles.logo}>{logo}</section>
            <div className={styles.navWrapper}>
                {user?.onboarded ? (
                    <>
                        <section className={styles.middle}>
                            {middle}
                        </section>
    
                        {bottom && (
                            <section className={styles.bottom}>
                                {bottom}
                            </section>
                        )}
                    </>
                ) : (null)}
                
            </div>
        </section>
    )
}