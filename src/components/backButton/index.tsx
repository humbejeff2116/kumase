'use client'
import React from "react";
import { useRouter } from 'next/navigation';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { IconContext } from "react-icons";
import styles from './backbutton.module.css';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface BackButtonProps {
    buttonWrapperClassName?: string, 
    buttonIcon?: JSX.Element, 
    buttonIconClassName?: string,
}

export default function BackButton({ 
    buttonWrapperClassName, 
    buttonIcon, 
    buttonIconClassName, 
}: BackButtonProps) {
    const router = useRouter();

    const goBack = (router: AppRouterInstance) => {
        return router.back();
    }

    return (
        <div className={buttonWrapperClassName}>
            <button onClick = { () => goBack(router) }>
                { buttonIcon  || (
                    <IconContext.Provider 
                    value={{className: buttonIconClassName || styles.icon}}
                    >
                        <RiArrowGoBackFill/>
                    </IconContext.Provider>
                )}
            </button>
        </div>      
    )
}