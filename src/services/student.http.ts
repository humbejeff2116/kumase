import { Student } from '../../scripts/students.types';
import httpBase, { API_DOMAIN, httpBaseWithCredentials } from './http.config';

export const APIBase = `${API_DOMAIN}/api/v1`;
const backendAPI = httpBase(APIBase);
const backendAPIWithCredentials = httpBaseWithCredentials(APIBase);


async function authStudentToken(studentId: string, token: string) {
    const response = await backendAPI.post(`/student/token/auth/${studentId}`, token);
    return response.data;
}

async function getStudentAdmin(idOrRegNo: string, queryType: 'id' | 'regNo') {
    const response = await backendAPI.get(`/admin/student?id=${idOrRegNo}&queryType=${queryType}`);
    return response.data;
}

async function getStudentsAdmin() {
    const response = await backendAPI.get(`/admin/students`);
    return response.data;
}

async function genStudentTokenAdmin(studentId: string) {
    const response = await backendAPI.post(`/admin/student/token/${studentId}`);
    return response.data;
}

async function onboardStudentAdmin(student: Student) {
    const response = await backendAPI.post(`/admin/student/onboard/`, student);
    return response.data;
}

async function registerStudentCourse(studentId: string, course: any) {
    const response = await backendAPI.post(`/student/course/register/${studentId}`, course);
    return response.data;
}

export {
    authStudentToken,
    getStudentAdmin,
    genStudentTokenAdmin,
    getStudentsAdmin,
    onboardStudentAdmin,
    registerStudentCourse
}