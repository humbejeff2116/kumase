import { Course } from ".";

const firstSemester: Array<Course> = [
    {
        code: 'GNS 101',
        unitLoad: '2',
        title: 'Use of English',
        duration: '30hrs',
    },
    {
        code: 'CHE 211',
        unitLoad: '1',
        title: 'Professional Ethics',
        duration: '5hrs',
    },
    {
        code: 'CHE212',
        unitLoad: '2',
        title: 'Anatomy and Physiology I',
        duration: '45hrs',
    },
    {
        code: 'CHE 213',
        unitLoad: '2',
        title: 'Behaviour Change Communications',
        duration: '45hrs',
    },
    {
        code: 'GNS 111',
        unitLoad: '1',
        title: 'Citizenship Education',
        duration: '15hrs',
    },
    {
        code: 'CHE214',
        unitLoad: '2',
        title: 'Human Nutrition',
        duration: '45hrs',
    },
    {
        code: 'CHE 215',
        unitLoad: '2',
        title: 'Introduction to Primary Health Care',
        duration: '30hrs',
    },
    {
        code: 'GNS411',
        unitLoad: '1',
        title: 'Introduction to Psychology',
        duration: '15hrs',
    },
    {
        code: 'EHT 111',
        unitLoad: '2',
        title: 'Introduction to Environmental Health',
        duration: '30hrs',
    },
    {
        code: 'FOT 111',
        unitLoad: '1',
        title: 'Geography',
        duration: '15hrs',
    },
    {
        code: 'COM 111',
        unitLoad: '2',
        title: 'Introduction to Computer',
        duration: '45hrs',
    },
    {
        code: 'GNS 213',
        unitLoad: '2',
        title: 'Introduction to Medical Sociology',
        duration: '30hrs',
    },
]

const secondSemester: Array<Course> = [
    {
        code: 'CHE 221',
        unitLoad: '2',
        title: 'Symptomatology',
        duration: '30hrs',
    },
    {
        code: 'CHE 222',
        unitLoad: '3',
        title: 'Population	Dynamics	and	Family Planning',
        duration: '75hrs',
    },
    {
        code: 'CHE 223',
        unitLoad: '3',
        title: 'Clinical Skills I',
        duration: '75hrs',
    },
    {
        code: 'STB 211',
        unitLoad: '3',
        title: 'Science Laboratory Technology',
        duration: '75hrs',
    },
    {
        code: 'CHE224',
        unitLoad: '2',
        title: 'Immunity and Immunization',
        duration: '45hrs',
    },
    {
        code: 'CHE 225',
        unitLoad: '2',
        title: 'Control of Communicable Diseases',
        duration: '30hrs',
    },
    {
        code: 'CHE 226',
        unitLoad: '2',
        title: 'Accident and Emergency',
        duration: '45hrs',
    },
    {
        code: 'CHE 227',
        unitLoad: '3',
        title: 'Supervised Clinical Experience I',
        duration: '90hrs',
    },
    {
        code: 'GNS 102',
        unitLoad: '2',
        title: 'Communication in English',
        duration: '30hrs',
    },
]


const levelOneCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelOneCourses;