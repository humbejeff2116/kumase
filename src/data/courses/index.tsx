import { StaticImageData } from "next/image";
import communityHealthCoursesService from "./communityHealth";
import medicalLabCoursesService from "./medicalLab";
import defaultIllustration from '@/images/illustration/freepick/med-students-2.svg';
import pharmacyCoursesService from "./pharmacy";


import img1 from '@/images/courses/img_1.jpg';
import img2 from '@/images/courses/img_2.jpg';
import img3 from '@/images/courses/img_3.jpg';
import img4 from '@/images/courses/img_4.jpg';
import img5 from '@/images/courses/img_5.jpg';
// import img6 from '@/images/courses/img_6.jpg';
import img7 from '@/images/courses/img_7.jpg';



export const departments = {
    publicHealth: 'Public Health',
    communityHealth: 'Community Health',
    medicalLab: 'Medical Lab Science',
    healthinfomationManagement: 'Health Info Management',
    pharmacy: 'Pharmacy',
    imagingTechnology: 'Imaging Technology',
}

export interface Course {
    id: string
    title: string
    department: string
    content?: string
    duration: string
    entryRequirement: string
    certificateType: string
    image: StaticImageData | string
    tags?: Array<string>    
}

interface Author {
    name: string
    profileImage: StaticImageData | string 

}

export type Courses = Array<Course>

export const coursesAuthor: Author = {
    name: 'Admin',
    profileImage: ''
} 

const courses: Courses = [
    {
        id: '1',
        title: 'Community Health Extension Worker (CHEW)',
        department: departments.communityHealth,
        content: ``,
        duration: '3 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                            in any of the following: English, Mathematics, Chemistry,
                            Biology or Health Science and Physics at not more than 2 
                            sittings.`,
        certificateType: 'ND IN COMMUNITY HEALTH EXTENSION WORKER',
        image: img1
    },
    {
        id: '2',
        title: 'Medical Laboratory Technician (MLT)',
        department: departments.medicalLab,
        content: ``,
        duration: '3 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                            in any of the following: English, Mathematics, Chemistry,
                            Biology or Health Science and Physics at not more than 2 
                            sittings.`,
        certificateType: 'ND IN MEDICAL LABORATORY SCIENCE',
        image: img5
    },
    
    {
        id: '3',
        title: 'Environmental Health Technology (EHT)',
        department: departments.publicHealth,
        content: ``,
        duration: '4 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                            in any of the following: English, Mathematics, Chemistry,
                            Biology or Health Science and Physics at not more than 2 
                            sittings.`,
        certificateType: 'HND IN ENVIRONMENTAL HEALTH TECHNOLOGY',
        image: img3
    },
    {
        id: '4',
        title: 'Public Health Technology (ND/HND)',
        department: departments.publicHealth,
        content: ``,
        duration: '4 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                            in any of the following: English, Mathematics, Chemistry,
                            Biology or Health Science and Physics at not more than 2 
                            sittings.`,
        certificateType: 'ND/HND',
        image: img4
    },

    {
        id: '5',
        title: 'Epidemiology And Disease Control (ND/HND)',
        department: departments.publicHealth,
        content: ``,
        duration: '4 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                            in any of the following: English, Mathematics, Chemistry,
                            Biology or Health Science and Physics at not more than 2 
                            sittings.`,
        certificateType: 'ND/HND',
        image: img5
    },
    {
        id: '6',
        title: 'Health Education and Promotion (DHEP)',
        department: departments.publicHealth,
        content: ``,
        duration: '2 Years',
        entryRequirement: `At least credit in either WAEC, NECO, GCE, NABTEB 
                    in English Language, Mathematics, Biology or Health Science, 
                    an any other science subject at not more than 2 sittings. 
                    Or Teacher Grade II at merit`,
        certificateType: 'DIPLOMA IN HEALTH EDUCATION AND PROMOTION',
        image: img2
    },
    {
        id: '7',
        title: 'Public Health Nursing (PHN)',
        department: departments.publicHealth,
        content: ``,
        duration: '3 Years',
        entryRequirement: `At least Credit in either WAEC, NECO or GCE, 
                            NABTEB in English, Mathematics, Biology, Chemistry and Physics 
                            at not more than two sittings.`,
        certificateType: `ND IN PUBLIC HEALTH NURSING`,
        image: img7
    },
    {
        id: '8',
        title: 'Health Information Management',
        department: departments.healthinfomationManagement,
        content: ``,
        duration: '2 Years',
        entryRequirement: `At least credit in either WAEC, NECO, NABTEB  
                    in English, Mathematics, Biology or Health Science, Chemistry or Physics 
                    and any other subjects
                    at not more than 2 sittings. Or Teacher Grade II at merit.`,
        certificateType: 'ND IN HEALTH INFORMATION MANAGEMENT',
        image: img2
    },
    {
        id: '9',
        title: 'X-Ray Technician',
        department: departments.imagingTechnology,
        content: ``,
        duration: '3 Years',
        entryRequirement: `At least 5 O level credit in either WAEC, NECO, GCE, NABTEB 
                        in any of the following: English, Mathematics, Chemistry,
                        Biology or Health Science and Physics at not more than 2 
                        sittings.`,
        certificateType: 'Diploma in X-ray',
        image: img4
    },
    {
        id: '10',
        title: 'Pharmacy Technician',
        department: departments.pharmacy,
        content: ``,
        duration: '3 Years',
        entryRequirement: `At least credit in either WAEC, NECO, GCE, NABTEB 
                    in Biology, English Language, Mathematics, 
                    Chemistry/Physics at not more than 2 sittings.`,
        certificateType: 'Diploma',
        image: img3
    }
]

export default function getCourseFormCourses(dept: string, level: string, semester: string) {
    switch (dept.toLowerCase()) {
        case departments.communityHealth.toLowerCase():
            return communityHealthCoursesService.getSemesterCourses(level, semester);
        case departments.medicalLab.toLowerCase():
            return medicalLabCoursesService.getSemesterCourses(level, semester);
        // case departments.pharmacy.toLowerCase():
        //     return pharmacyCoursesService.getSemesterCourses(level, semester);
        default:
            return communityHealthCoursesService.getSemesterCourses(level, semester);
    }
}

export function getCoursesAuthor() {
    return coursesAuthor;
}

export function getAllCourses() {
    return courses;
}

export const getCoursesByDepartment = (courses: Array<Course>, dept: string) => {
    if (!Object.hasOwn(departments, dept)) {
        throw new Error('department does not exist');
    }

    return courses.filter((course) => course.department === departments[dept as keyof typeof departments]);
}