import axios from 'axios';
// import fetchAdapter from '@vespaiach/axios-fetch-adapter';
export const API_DOMAIN = `${process.env.NEXT_PUBLIC_API_URL}/v1` || `http://localhost:3000/api`;
export const IMAGE_DOMAIN = `${process.env.NEXT_PUBLIC_API_URL}/v1` || `http://localhost:3000/api`;
export const APIBase = `${process.env.NEXT_PUBLIC_API_URL}/v1`;
export const APIBase2 = `${process.env.NEXT_PUBLIC_API_URL}/v2`;
export default function httpBase(URL: string, contentType = "application/json") {
    return axios.create({
        baseURL: URL,
        withCredentials: true,
        headers: {
            "content-type": contentType
        },
        // timeout: 7000
        // adapter: fetchAdapter 
    });
}

export function httpBaseWithCredentials(URL: string, contentType = "application/json") {
    return axios.create({
        baseURL: URL,
        withCredentials: true,
        headers: {
            "content-type": contentType
        },
        timeout: 7000
        // adapter: fetchAdapter 
    });
}

export const backendAPI = httpBase(APIBase);
export const backendAPIV2 = httpBase(APIBase2);
export const backendAPIWithCredentials = httpBaseWithCredentials(APIBase);