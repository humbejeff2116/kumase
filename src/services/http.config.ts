import axios from 'axios';
// import fetchAdapter from '@vespaiach/axios-fetch-adapter';
export const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`;
export const IMAGE_DOMAIN = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`;
export const APIBase = `${process.env.NEXT_PUBLIC_API_URL}/v1`;
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
export const backendAPIWithCredentials = httpBaseWithCredentials(APIBase);