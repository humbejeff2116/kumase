'use client'
import Image from 'next/image';
import FormTemplate from '@/components/forms/formik';
import { loginForm } from '@/data/form';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SpinnerSmall } from '@/components/loader/spinner';
import { RiErrorWarningLine, RiLoginCircleLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import useAuth from '@/context/auth/context';
import { Cookie } from '@/lib';
// import userHTTPService from '@/services/user';
import { useRouter } from 'next/navigation';
import { TopPopUpBox } from '@/components/modal/topModals';
import usePopUpFor from '@/components/modal/shared';
import { Timer } from '@/components/types';
import { cookieKey } from '@/middleware';
import { RiUserAddLine } from 'react-icons/ri';
import birdsBackground from '@/images/illustration/IRA/bg-23.svg';
import styles from './index.module.css';
import redirect from '@/lib/redirect';
import appRoutes from '@/routes';
import { loginUser } from '@/services/services.http';
import { LoginAndSignupFooter } from './footer/inde';
import LandingPageSectionWrapper from '../landing/sectionWrapper';

interface LoginFormValues {
    email: string
    password: string

}
export default function Login() {
    const [loginIn, setLoginIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginResponseMessage, setLoginResponseMessage] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(false);
    const { setUserData, setTokenData }  = useAuth();
    const router = useRouter();
    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const handleLoginSubmit = async (values: LoginFormValues) => {
        const redirectTo = redirect.get();

        setLoginIn(true);
        if (showMessage) {
            setShowMessage(false);
        }

        try {
            const {
                error,
                message,
                token,
                tokenExpiration,
                data:user,
                student
            } = await loginUser(values);


            if (error) {
                setLoginResponseMessage(message);
                setLoginError(true);
                setLoginIn(false);
                setShowMessage(true);
                return;
            }

            const TOKEN = token;
            const TOKEN_EXPIRATION = tokenExpiration;
            user.id = user._id;
            const userCookie = {
                ...user,
                ['x-access-token']: TOKEN,
                jwtExpireAt: TOKEN_EXPIRATION
            }

            Cookie.set(cookieKey, JSON.stringify(userCookie));
            setUserData(user, student);
            setTokenData(TOKEN, TOKEN_EXPIRATION);
            setLoginError(false);
            setLoginIn(false);
            setLoginResponseMessage(message);
            setShowMessage(true);
            // if (!user.onboarded) {
            //     timer = setTimeout(() => {
            //         router.push(appRoutes.onboard);
            //     }, 2000); 
            //     return;
            // }
            timer = setTimeout(() => {
                return (redirectTo && redirectTo !== appRoutes.signOut) ?
                router.push(redirectTo) : router.push(appRoutes.home);
            }, 2000);
        } catch(err) {
            if (err instanceof Error) {
                setLoginResponseMessage(err.message);
            }
            setLoginError(true);
            setLoginIn(false);
            setShowMessage(true);
        }
    }

    const closeMessageBox = () => {
        setShowMessage(false);
    }

    return (
        <>
            <TopPopUpBox
            dontShowCloseButton={!loginError}
            closePopUp={closeMessageBox}
            message={loginResponseMessage}
            showPopUp={showMessage}
            usedFor={loginError ? usePopUpFor.error : usePopUpFor.success}
            />

            <LoginAndSignupTemplate>
                <LoginAndSignupFormTemplate heading='Log In'>
                    <FormTemplate
                    {...loginForm}
                    handleSubmit={handleLoginSubmit}
                    labelWrapperClassName={styles.labelWrapper}
                    inputClassName={styles.input}
                    inputErrorClassName={styles.inputError}
                    inputNotEmptyClassName={styles.inputContains}
                    errorClassName={styles.errorWrapper}
                    >
                        <ForgotPassWord/>
                        <LoginAndSignupButton
                        text='Sign In'
                        processing={loginIn}
                        error={loginError}
                        />
                        <SignupOrLoginLink
                        text={`Don't have an account yet?`}
                        linkText='Create Account'
                        href={appRoutes.signUp}
                        usedFor={useSignupOrLoginLinkFor.signup}
                        />
                    </FormTemplate>
                </LoginAndSignupFormTemplate>
                {/* <OtherLoginMethods/> */}
            </LoginAndSignupTemplate>
        </>
    )
}


const footerLinks = [
    {id: '1', name: 'About', href: '/#'},
    {id: '2', name: 'Terms', href: '/#'},
    {id: '3', name: 'Privacy', href: '/#'},
]

interface LoginAndSignupTemplateProps {
    children: React.ReactNode
}

export function LoginAndSignupTemplate({
    children
}: LoginAndSignupTemplateProps) {
    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.sectionContainer}
        childWrapperModifyClass={styles.sectionTwoWrapper}
        showWave
        >
        <div className={styles.container}>
            <div className={styles.childWrapper}>
                {children}
                <div className={styles.loginTemplateBottom}>
                    <LoginAndSignupFooter links = { footerLinks }/>
                </div>
            </div>
            {/* <LoginAndSignupBackgroundImages/> */}
        </div>
        </LandingPageSectionWrapper>
    )
}

function LoginAndSignupBackgroundImages() {
    return (
        <div className={styles.loginBackgrndImagesContr} aria-hidden="true">
            <Image
            className={styles.loginBackgrndImageRight}
            src={birdsBackground}
            alt=""
            />
            <Image
            className={styles.loginBackgrndImageLeft}
            src={birdsBackground}
            alt=""
            />
        </div>
    )
}

interface LoginAndSignupFormTemplateProps {
    heading: string
    children: React.ReactNode
}
export function LoginAndSignupFormTemplate({
    heading,
    children
}: LoginAndSignupFormTemplateProps) {
    return (
        <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
                {heading}
            </div>
            {children}
        </div>
    )
}


interface LoginAndSignupButtonProps {
    text: string
    processing: boolean
    error: boolean
}
export function LoginAndSignupButton({
    text,
    processing,
    error
}: LoginAndSignupButtonProps) {
    return (
        <div className={styles.buttonWrapper}>
            <button type='submit' className={styles.button}>
            {processing ? (
                <span>
                    <SpinnerSmall unsetMarginTop/>
                </span>
            ) : error ? (
                <>
                    <IconContext.Provider value={{className: styles.icon}}>
                        <RiErrorWarningLine/>
                    </IconContext.Provider>
                    <span>
                        {text}
                    </span>
                </>
            ) : (
                <span>
                   {text}
                </span>
            )}
            </button>
        </div>
    )
}



function ForgotPassWord() {
    return (
        <div className={styles.forgotPasswordContainer}>
            <div className={styles.forgotPassword}>
                Forgot Password
            </div>
        </div>
    )
}


export const useSignupOrLoginLinkFor = {
    login: 'login',
    signup: 'signup'
}
interface SignupOrLoginLinkProps {
    text: string
    linkText: string
    href: string
    usedFor: string
}
export function SignupOrLoginLink({
    text,
    linkText,
    href,
    usedFor
}: SignupOrLoginLinkProps) {
    return (
        <div className={styles.signupLinkContainer}>
            <div className={styles.signupLinkText}>
                {text}
            </div>
            <Link href={href} className={styles.signupLink}>
                {usedFor === useSignupOrLoginLinkFor.login ? (
                    <IconContext.Provider value={{className: `${styles.signupIcon}`}}>
                        <RiLoginCircleLine/>
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider value={{className: `${styles.signupIcon}`}}>
                        <RiUserAddLine/>
                    </IconContext.Provider>
                )}
                {linkText}
            </Link>
        </div>
    )
}

function OtherLoginMethods() {
    return (
        <div>

        </div>
    )
}
