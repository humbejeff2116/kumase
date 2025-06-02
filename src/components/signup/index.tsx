'use client'
import styles from './index.module.css';
import FormTemplate from '@/components/forms/formik';
import { signupForm } from '@/data/form';
import { useEffect, useState } from 'react';
import useAuth from '@/context/auth/context';
// import userHTTPService from '@/services/user';
import { useRouter } from 'next/navigation';
import { Timer } from '@/components/types';
import { TopPopUpBox } from '@/components/modal/topModals';
import usePopUpFor from '@/components/modal/shared';
// import { Cookie } from '@/lib';
// import { cookieKey } from '@/middleware';
import Link from 'next/link';
import appRoutes from '@/routes';
import { 
    LoginAndSignupButton, 
    LoginAndSignupFormTemplate, 
    LoginAndSignupTemplate, 
    SignupOrLoginLink, 
    useSignupOrLoginLinkFor 
} from '../signin';
import { signupUser } from '@/services/services.http';
interface SignupFormValues {
    fullName: string
    email: string
    password: string
}

export default function Signup() {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [creatingAccountError, setCreatingAccountError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [signingUpResponseMessage, setSigningUpResponseMessage] = useState<string | null>(null);
    const { setUserData, setTokenData } = useAuth();
    const router = useRouter();
    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    async function handleSignupSubmit(values: SignupFormValues) {

        setCreatingAccount(true);
        if (showMessage) {
            setShowMessage(false);
        }

        try {
            const { 
                error,
                token, 
                tokenExpiration,
                userExist, 
                message, 
                data:user,
                student 
            } = await signupUser(values);

            if (error || userExist) {
                setCreatingAccountError(true);
                setSigningUpResponseMessage(message);
                setCreatingAccount(false);
                setShowMessage(true);
                return;
            }
            user.id = user._id;
            const TOKEN = token;
            const TOKEN_EXPIRATION = tokenExpiration;
            const userCookie = {
                ...user,
                ['x-access-token']: TOKEN,
                jwtExpireAt: TOKEN_EXPIRATION 
            }
            // Cookie.set(cookieKey, JSON.stringify(userCookie));

            setCreatingAccountError(false);
            setUserData(user, student);
            setTokenData(TOKEN, TOKEN_EXPIRATION);
            setCreatingAccount(false);
            setSigningUpResponseMessage(message);
            setShowMessage(true);
            timer = setTimeout(() => { 
                router.push(appRoutes.onboard);
            }, 2000); 
        } catch(err) {
            if (err instanceof Error) {
                setSigningUpResponseMessage(err.message);
            }
            setCreatingAccountError(true);
            setCreatingAccount(false);
            setShowMessage(true);
        }  
    }

    const closeMessageBox = () => {
        setShowMessage(false);
    }

    return (
        <>
            <TopPopUpBox
            dontShowCloseButton
            closePopUp={closeMessageBox}
            message={signingUpResponseMessage}
            showPopUp={showMessage}
            usedFor={creatingAccountError ? usePopUpFor.error : usePopUpFor.success}
            />

            <LoginAndSignupTemplate>
                <LoginAndSignupFormTemplate heading='Create Account'>
                    <FormTemplate 
                    {...signupForm}
                    handleSubmit={handleSignupSubmit}
                    labelWrapperClassName={styles.labelWrapper}
                    inputClassName={styles.input}
                    inputErrorClassName={styles.inputError}
                    inputNotEmptyClassName={styles.inputContains}
                    errorClassName={styles.errorWrapper}
                    >
                        <div className={styles.agreement}>
                        By creating your account, you agree to our <Link href={appRoutes.terms}>
                        terms
                        </Link> and <Link href={appRoutes.privacy}> privacy</Link> policies
                        </div>
                        <LoginAndSignupButton 
                        text='Create Account'
                        processing={creatingAccount}
                        error={creatingAccountError}
                        /> 
                        <SignupOrLoginLink
                        text='Already have an account?'
                        linkText='Log In'
                        href={appRoutes.signIn}
                        usedFor={useSignupOrLoginLinkFor.login}
                        /> 
                    </FormTemplate>
                </LoginAndSignupFormTemplate>
                {/* <OtherLoginMethods/> */}
            </LoginAndSignupTemplate>
        </>
    )
}