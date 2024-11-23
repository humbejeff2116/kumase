'use client'
import React from 'react';
import { AuthContextProvider } from '@/context/auth/provider';
import Header from '@/components/header';
import LeftSideBar from '@/components/leftsidebar';
// import Footer from '@/components/footer/tall';
import { ChildrenTemplate } from '../children';
import styles from './index.module.css';
import Footer from '@/components/footer/flat';


export interface TemplateProps {
    leftSideBarTop?: React.ReactElement, 
    leftSideBarBottom?: React.ReactElement, 
    leftSideBarMiddle?: React.ReactElement,
    children: React.ReactNode, 
    showFooter?: boolean
}

export default function MainLayout({ 
    // leftSideBarTop, 
    // leftSideBarMiddle,
    // leftSideBarBottom, 
    children, 
    showFooter
}: TemplateProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <LeftSideBar/>
                </div>
                <div className={styles.right}>
                    <Header/>
                    {/* <MobileHeader/> */}
                    <ChildrenTemplate>
                    {children}
                    {showFooter && (
                        <Footer/>
                    )}
                    </ChildrenTemplate>
                </div>
            </div>
        </>
    )
}