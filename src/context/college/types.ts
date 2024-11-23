export interface School {
    currentSession: string
    semester: string   
}

interface Levels {
    [key: string]: any
    one: string
    two: string
    three: string 
}

export const semesters = {
    first: '1',
    second: '2'
}

export const levels: Levels = {
    one: '100',
    two: '200',
    three: '300',
}

export const departmentsObj = {
    comunityHealth: {
        full: 'Community Health',
        short: 'CHEW'
    },
    medLab: {
        full: 'Medical Laboratory',
        short: 'MLT'
    }
}

export const coursesObj = {
    comunityHealth: {
        full: 'Community Health Extension Worker',
        short: 'CHEW'
    },
    medLab: {
        full: 'Medical Laboratory',
        short: 'MLT'
    }
}

export const departments = Object.keys(departmentsObj).map(key => departmentsObj[key as keyof typeof departmentsObj].full)
export const courses = Object.keys(coursesObj).map(key => coursesObj[key as keyof typeof coursesObj].full)
