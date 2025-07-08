'use client'
import React, { useEffect, useState } from 'react';
import { AuthContext, OutSidePopupMessage, Student, User, defaultOutsidePopupMessage } from './context';
import { parseLocalStorage, saveToLocalStorage } from '@/lib';
import { logoutStudentAccount } from '@/services/student.http';


export const USER = 'user';
export const STUDENT = 'student';
const TOKEN = 'x-access-token';
const TOKEN_EXPIRATION = 'x-access-token-expiration';
const defaultToken = '';
const defaultTokenExpiration = 0;


interface AuthContextProviderProps {
    children: React.ReactNode
}
export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [signingIn, setSigningIn] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [outsidePopUpMessage, setOutsidePopUp] = useState(defaultOutsidePopupMessage);
    const [token, setToken] =  useState('');
    const [viewUserProfileData, setViewUserProfileData] = useState({});
    const [tokenExpiration, setTokenExpiration] = useState(0);
   
    useEffect(()=> {
        // setStudent(mockStudent);
        // setUser(mockStudent);
        setStateOnload();
    }, []);

    const setStateOnload = () => {
        const user = parseLocalStorage(USER);
        const student = parseLocalStorage(STUDENT);
        setUser(user);

        if (student) {
            setStudent(student);
        }   
    }



    const setUserData = (user: any, student: any) => {
        saveToLocalStorage(USER, user);
        saveToLocalStorage(STUDENT, student);
        setUser(user);
        setStudent(student);
    }

    const setTokenData = (token: string, tokenExpiration: number) => {
        saveToLocalStorage(TOKEN, token);
        saveToLocalStorage(TOKEN_EXPIRATION, tokenExpiration);
        setToken(token);
        setTokenExpiration(tokenExpiration);
    }

    const isAuthenticated = (): boolean => { 
        const token = parseLocalStorage(TOKEN);
        const tokenExpiration = parseLocalStorage(TOKEN_EXPIRATION);

        if (token && (tokenExpiration > Date.now())) {
            return true;
        }
        return false;
    }

    const wipeToken = () => {
        setUser(null);
        setUserIsLoggedIn(false);
        setToken(defaultToken);
        setTokenExpiration(defaultTokenExpiration);
    }

    const logOutClient = async () => {
        setUser(null);
        setStudent(null);
        setUserIsLoggedIn(false);
        setOutsidePopUp(defaultOutsidePopupMessage);
        setViewUserProfileData({});
        setToken(defaultToken);
        setTokenExpiration(defaultTokenExpiration);
        localStorage.removeItem(USER);
        localStorage.removeItem(STUDENT);
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(TOKEN_EXPIRATION);
        sessionStorage.removeItem('currentLocation');
        return true;
    }

    const setOutsidePopUpMessage = (showMessage: boolean, popUpMessage?: OutSidePopupMessage) => {
        if (popUpMessage) {
            const { type, show, message } = popUpMessage;

            if (outsidePopUpMessage.show) {
                return;
            }
            setOutsidePopUp({ type, show, message });
        }
        if (!showMessage) {
            setOutsidePopUp(prevState => ({ ...prevState, show: false }));
            return;
        }
    }
   
    const values = {
        user: user,
        signingIn: signingIn,
        signingUp: signingUp,
        userIsLoggedIn: userIsLoggedIn,
        token: token,
        tokenExpiration: tokenExpiration,
        viewUserProfileData: viewUserProfileData,
        outsidePopUpMessage: outsidePopUpMessage,
        student: student,
        setSigningIn: setSigningIn,
        setSigningUp: setSigningUp,
        setOutsidePopUpMessage: setOutsidePopUpMessage,
        setUserData: setUserData,
        setUserIsLoggedIn: setUserIsLoggedIn,
        setTokenData: setTokenData,
        isAuthenticated: isAuthenticated,
        setViewUserProfileData: setViewUserProfileData,
        logOutClient: logOutClient,
        wipeToken: wipeToken
    }

    return(
        <AuthContext.Provider value = { values }>
            { children }
        </AuthContext.Provider>
    )  
}