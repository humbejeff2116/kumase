'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './index.module.css';
import { Timer } from '@/components/types';
import appRoutes from '@/routes';
import Header from '@/components/headerPublic';
import Footer from '@/components/footerPublic';
import useAuth from '@/context/auth/context';
import { BottomPopUpBox } from '@/components/modal/bottomModals';
import usePopUpFor from '@/components/modal/shared';
import MobileHeader from '@/components/mobileHeaderPublic';
// import { getBrowserWidth } from '@/lib';


interface TemplateProps {
    stickHeaderToTop?: boolean,
    headerContainerModificationClass?: string,
    showHeaderShadow?: boolean,
    childrenContainerModificationClass?: string, 
    showBackButton?: boolean, 
    children: React.ReactNode,
    dontShowFooter?: boolean
}

export default function PublicLayout({ 
    stickHeaderToTop,
    headerContainerModificationClass,
    showHeaderShadow,
    childrenContainerModificationClass,
    dontShowFooter, 
    children,
}: TemplateProps) {
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const { 
        isAuthenticated, 
        outsidePopUpMessage, 
        setOutsidePopUpMessage 
    } = useAuth();
    let timer: Timer;

    useEffect(()=> {
        if (outsidePopUpMessage?.show) setErrorMessage(outsidePopUpMessage?.message);
        if (outsidePopUpMessage?.show) timer = setTimeout(()=> setOutsidePopUpMessage(false), 7000);
        return () => {
            if (outsidePopUpMessage?.show) setOutsidePopUpMessage(false);
            if (timer) clearTimeout(timer); 
        }
    }, [outsidePopUpMessage, setOutsidePopUpMessage]);

    //TODO... perform login redirect in next.js
    const goToLogin = () => {
        const userIsAuthenticated = isAuthenticated();

        if (userIsAuthenticated) {
            router.push(appRoutes.home);
            return;
        }

        if (pathName === appRoutes.signIn) {
            return;
        }

        router.push(appRoutes.signIn);
    }

    const closeOutsidePopUp = () => {
        if (outsidePopUpMessage?.show) setOutsidePopUpMessage(false);
        setError(false);  
    }

    return (
            <section className={styles.container}> 
                <Header 
                containerModificationClass = {headerContainerModificationClass}
                showLogin = {goToLogin}
                stickToTop = {stickHeaderToTop ?? true}
                showBoxShadow = {showHeaderShadow}
                />
                <MobileHeader/>
                <div className = {`${styles.childrenContainer} ${childrenContainerModificationClass}`}>    
                    {children}
                    <BottomPopUpBox
                    usedFor = {error ? usePopUpFor.error : usePopUpFor.success}
                    showPopUp = {outsidePopUpMessage?.show || error}
                    message = {errorMessage || outsidePopUpMessage?.message}
                    closePopUp = {closeOutsidePopUp}
                    />
                </div>
                {dontShowFooter ? null : (
                    <Footer/>
                )}
            </section>
    )
}