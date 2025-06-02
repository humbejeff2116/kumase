import httpBase, { API_DOMAIN, httpBaseWithCredentials } from './http.config';

export const APIBase = `${API_DOMAIN}/api/v1`;
const backendAPI = httpBase(APIBase);
const backendAPIWithCredentials = httpBaseWithCredentials(APIBase);


async function authStudentToken(studentId: string) {
    const response = await backendAPI.post(`/student/token/auth`, studentId);
    return response.data;
}


export {
    authStudentToken,
}