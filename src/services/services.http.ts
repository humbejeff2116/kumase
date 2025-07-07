import { API_DOMAIN, backendAPI, backendAPIV2 } from './http.config';


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
    const response = await backendAPI.post(`/student/account/sign-up`, userDetails);
    return response.data;
}

async function loginUser(userDetails: LoginDetails) {
    const response = await backendAPI.post(`/student/account/sign-in`, userDetails);
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

// async function getUser(userId: string) {
//     const response = await backendAPI.get(`/student/${userId}`);
//     return response.data;
// }

async function getStudent(idOrRegNo: string, queryType: 'id' | 'regNo') {
    const response = await backendAPI.get(`/student?id=${idOrRegNo}&queryType=${queryType}`);
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
async function authenticateAccountToken(userCookie: userCookie) {
    const response = await backendAPI.post(`/student/account/auth`, userCookie);
    return response.data;
}

async function authenticateCourseReg(studentId: string) {
    const response = await backendAPI.get(`/student/course/authenticate/${studentId}`);
    return response.data;
}

async function subscribeNewsLetter(details: SubscribeNewsLetter) {
    const response = await backendAPI.post(`/subscribe-newsletter`, details);
    return response.data;
}

async function updateUserProfileImage(accountId: string, studentId: string, profileImageData: FormData) {
    try {
        const response = await backendAPI.post(
            `/student/uploads/profile/${accountId}/${studentId}`,
            profileImageData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

async function getSchool() {
    const response = await backendAPI.get(`/school`);
    return response.data;
}

async function getSchoolV2() {
    const response = await backendAPIV2.get(`/school`);
    return response.data;
}

backendAPIV2


export {
    loginUser,
    signupUser,
    // getUser,
    authenticateUser,
    authenticateAccountToken,
    onboardUser,
    subscribeNewsLetter,
    updateUserProfileImage,
    authenticateCourseReg,
    getStudentsSlugs,
    getStudent,
    getSchool,
    getSchoolV2
}
