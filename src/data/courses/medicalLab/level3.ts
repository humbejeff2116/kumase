import { Course } from "../communityHealth"

const firstSemester: Array<Course> = [
    {
        code: 'MLT 301',
        unitLoad: '3',
        title: 'Medical Parasitology',
        duration: '',
    },
    {
        code: 'MLT 303',
        unitLoad: '3',
        title: 'Blood Transfusion Science',
        duration: '',
    },
    {
        code: 'MLT 305',
        unitLoad: '3',
        title: 'Clinical Chemistry II',
        duration: '',
    },
    {
        code: 'MLT 307',
        unitLoad: '3',
        title: 'Histopathology II',
        duration: '',
    },
    {
        code: 'MLT 311',
        unitLoad: '3',
        title: 'Clinical Laboratory posting II',
        duration: '',
    },
    {
        code: 'MLT 309',
        unitLoad: '3',
        title: 'Seminar in Laboratory Science',
        duration: '',
    },
]

const secondSemester: Array<Course> = [
    {
        code: 'MLT 302',
        unitLoad: '3',
        title: 'Medical Microbiology II',
        duration: '',
    },
    {
        code: 'MLT 304',
        unitLoad: '3',
        title: 'Heamatology II',
        duration: '',
    },
    {
        code: 'MLT 306',
        unitLoad: '2',
        title: 'Clinical Chemistry III',
        duration: '',
    },
    {
        code: 'MLT 308',
        unitLoad: '2',
        title: 'Histopathology II',
        duration: '',
    },
    {
        code: 'MLT 312',
        unitLoad: '6',
        title: 'Research Project',
        duration: '',
    },
    {
        code: 'MLT 310',
        unitLoad: '2',
        title: 'Good Laboratory Practice',
        duration: '',
    },
]


const levelThreeCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelThreeCourses;