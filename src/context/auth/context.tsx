import { StaticImageData } from 'next/image';
import { createContext, useContext } from 'react';


interface Purchase {
    itemId:  string 
    timestamp: Date, 
}

export interface User {
    [key: string]: any
    _id?: string
    id?: string
    contactNumber?: string
    profileImage?: string | StaticImageData
    password?: string

    title?: string
    surname?: string
    firstName?: string
    otherName?: string
    maritalStatus?: string
    gender?: string
    dateOfBirth?: string
    nationality?: string
    stateOfOrigin?: string
    regNo?: string
    department?: string
    course?: string
    level?: string
    email?: string
}

export interface Student {
    [key: string]: any
    _id: string
    id: string
    contactNumber?: string
    profileImage?: string | StaticImageData
    password?: string

    title?: string
    surname?: string
    firstName?: string
    otherName?: string
    maritalStatus?: string
    gender?: string
    dateOfBirth?: string
    nationality?: string
    stateOfOrigin?: string
    regNo?: string
    department?: string
    course?: string
    level?: string
    email?: string
}

export const userEnum: User = {
    title: 'Title',
    surname: 'Surname',
    firstName: 'First Name',
    otherName: 'Other Name',
    maritalStatus: 'Marital Status',
    gender: 'Gender',
    dateOfBirth: 'Date Of Birth',
    nationality: 'Nationality',
    stateOfOrigin: 'State Of Origin',
    regNo: 'Reg No',
    department: 'Department',
    course: 'Course',
    level: 'Level',
    email: 'Email'
}

export interface OutSidePopupMessage {
    type: string,
    show: boolean,
    message: string
}

export const defaultOutsidePopupMessage: OutSidePopupMessage = {
    type: '',
    message: '',
    show: false,
}


interface initialAuthContextType {
    user: User | null
    student: Student | null
    signingIn: boolean
    signingUp: boolean
    userIsLoggedIn: boolean
    token: string
    tokenExpiration: number
    viewUserProfileData: any
    outsidePopUpMessage: OutSidePopupMessage
    setSigningIn: (status: boolean) => void
    setSigningUp: (status: boolean) => void
    setOutsidePopUpMessage: (showMessage: boolean, popUpMessage?: OutSidePopupMessage) => void
    setUserData: (user: any, student: any) => void
    setUserIsLoggedIn: (isLoggedInd: boolean) => void
    setTokenData: (token: string, tokenExpiration: number) => void
    isAuthenticated: () => boolean
    setViewUserProfileData: (user: any) => void
    logOutClient: () => void
    wipeToken: () => void
}

const initialAuthContext: initialAuthContextType = {
    user: null,
    student: null,
    signingIn: false,
    signingUp: false,
    userIsLoggedIn: false,
    token: '',
    tokenExpiration: 0,
    viewUserProfileData: null,
    outsidePopUpMessage: {
        type: "",
        show: false,
        message: ""
    },
    setSigningIn: () => null,
    setSigningUp: () => null,
    setOutsidePopUpMessage: () => null,
    setUserData: () => null,
    setUserIsLoggedIn: () => null,
    setTokenData: () => null,
    isAuthenticated: () => false,
    setViewUserProfileData: () => null,
    logOutClient: () => null,
    wipeToken: () => null 
}



export const AuthContext = createContext<initialAuthContextType>(initialAuthContext);
export default function useAuth() {
    return useContext(AuthContext);
}
