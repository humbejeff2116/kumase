import { User } from '@/context/auth/context';
import httpBase, { API_DOMAIN, httpBaseWithCredentials } from './http.config';

export const APIBase = `${API_DOMAIN}/api/v1`;
const backendAPI = httpBase(APIBase);
const backendAPIWithCredentials = httpBaseWithCredentials(APIBase);


interface LoginDetails {
    email: string,
    password: string
}

export interface Referrer {
    userId: string
    fullName: string
    link: string
}
interface SignupDetails {
    fullName: string,
    email: string,
    password: string,
}

interface userAuth {
    jwt: string
    expireAt: string
    id: string
}

interface SubscribeNewsLetter {
    userId?: string
    email: string
    fullName?: string
}


function customFetchBase(pathName: string) {
    return `${API_DOMAIN}/api/v1${pathName}`;
}
async function postData<Type>(pathName: string, data: Type) {
    const response = await fetch(customFetchBase(pathName), {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: "no-referrer",
        body: (typeof data === "string" ? data : JSON.stringify(data))
    })
    return response.json();
}

async function getData(pathName: string) {
    const response = await fetch(customFetchBase(pathName), {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: "no-referrer",
    })
    return response.json();
}

const customFetchMethods = {
    post: "POST",
    get: "GET"
}

async function signupUser(userDetails: SignupDetails) {
    const response = await backendAPI.post(`/student/account/signup`, userDetails);
    return response.data;
}

async function loginUser(userDetails: LoginDetails) {
    const response = await backendAPI.post(`/student/account/signin`, userDetails);
    return response.data;
}

async function onboardUser(userId: string, userDetails: FormData) {
    const response = await backendAPI.post(`/student/onboard/${userId}`, userDetails);
    return response.data;
}

async function getStudentsSlugs(studentId?: string) {
    try {
        const response = await backendAPI.get(`/students/slugs/${studentId}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function getUser(userId: string) {
    const response = await backendAPI.get(`/student/${userId}`);
    return response.data;
}

async function getStudent(studentId: string) {
    const response = await backendAPI.get(`/student/${studentId}`);
    return response.data;
}

async function authenticateUser(user: userAuth) {
    const response = await backendAPI.post(`/student/account/auth`, user);
    return response.data;
}

interface userCookie {
    ['x-access-token']: string,
    jwtExpireAt: number 
    id: string
}
async function authenticateUserToken(userCookie: userCookie) {
    const response = await postData(`/auth-user-token`, userCookie);
    return response;
}

async function authenticateCourseReg(studentId: string) {
    const response = await backendAPI.get(`/student/course-reg/authenticate/${studentId}`);
    return response.data;
}

async function subscribeNewsLetter(details: SubscribeNewsLetter) {
    const response = await backendAPI.post(`/subscribe-newsletter`, details);
    return response.data;
}

async function updateUserProfileImage(userId: string, profileImageData: FormData) {
    try {
        const response = await backendAPI.post(
            `/user/update/profileImage/${userId}`,
            profileImageData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
}


export {
    loginUser,
    signupUser,
    getUser,
    authenticateUser,
    authenticateUserToken,
    onboardUser,
    subscribeNewsLetter,
    updateUserProfileImage,
    authenticateCourseReg,
    getStudentsSlugs,
    getStudent
}
