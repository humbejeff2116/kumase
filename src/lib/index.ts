import { coursesObj, departmentsObj } from "@/context/college/types";

export const Org = {
    name: "Kumase College of Health Technology",
    name2: "KUCHTECH",
    siteUrl: "kuchtech.com"
}

export function parseLocalStorage(key: string) {
    const item  = localStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

export function saveToLocalStorage<Type>(key: string, value: Type) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<Type>(key: string) {
    const item  = localStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

function removeFromLocalStorage(key: string) {
    return localStorage.removeItem(key);
}

function saveToSessionStorage<Type>(key: string, val: Type) {
    sessionStorage.setItem(key, JSON.stringify(val));
}

function parseSessionStorage(key: string) {
    const item  = sessionStorage.getItem(key);

    if (typeof item  === 'string') {
       return JSON.parse(item);
    }
    return item; 
}

function removeSessionStorage(key: string) {
    return sessionStorage.removeItem(key);
}

export const SessionStorage = {
    set<Type>(key: string, value: Type) {
        saveToSessionStorage(key, value);
    },
    getParse(key: string) {
        return parseSessionStorage(key);
    },
    remove(key: string) {
        return removeSessionStorage(key);
    }
}

export const LocalStorage = {
    set<Type>(key: string, value: Type) {
        saveToLocalStorage(key, value);
    },
    getParse(key: string) {
        return parseLocalStorage(key);
    },
    remove(key: string) {
        return removeFromLocalStorage(key);
    }
}

interface Length {
    length: number
}

export function getLength<Type extends Length>(param: Type): number {
    return param.length;
}

export function getObjectValue<Type>(obj: Type, key: keyof Type) {
    return obj[key];
}


export function getBrowserWidth() {
    return true;
    // return window.innerWidth;
}

export function generateRandomId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
}



export function getDepartmentABreviation(department?: string) {
    if (!department) {
        return;
    }
    switch (department) {
        case departmentsObj.comunityHealth.full:
            return departmentsObj.comunityHealth.short
        case departmentsObj.medLab.full:
            return departmentsObj.medLab.short
        default:
            throw new Error('department not specified');
    }
}


export function getCoursesABreviation(course?: string) {
    if (!course) {
        return;
    }
    
    switch (course.toLowerCase()) {
        case coursesObj.comunityHealth.full.toLowerCase():
            return coursesObj.comunityHealth.short
        case coursesObj.comunityHealth.short.toLowerCase():
            return coursesObj.comunityHealth.short

        case coursesObj.medLab.full.toLowerCase():
            return coursesObj.medLab.short
        case coursesObj.medLab.short.toLowerCase():
            return coursesObj.medLab.short

        case coursesObj.pharm.full.toLowerCase():
            return coursesObj.pharm.short
        case coursesObj.pharm.short.toLowerCase():
            return coursesObj.pharm.short
            
        default:
            throw new Error('course not specified::-> @/lib/getCoursesABreviation');
    }
}
