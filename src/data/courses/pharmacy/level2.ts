import { Course } from ".";

const firstSemester: Array<Course> = [
    {
        code: 'CHE 231',
        unitLoad: '2',
        title: 'Anatomy and Physiology II',
        duration: '45hrs',
    },
    {
        code: 'CHE 232',
        unitLoad: '2',
        title: 'Oral Health',
        duration: '30hrs',
    },
    {
        code: 'CHE 233',
        unitLoad: '2',
        title: 'Community Mental Health',
        duration: '30hrs',
    },
    {
        code: 'CHE 234',
        unitLoad: '2',
        title: 'Reproductive Health',
        duration: '45hrs',
    },
    {
        code: 'CHE 235',
        unitLoad: '3',
        title: 'Child Health',
        duration: '75hrs',
    },
    {
        code: 'CHE 236',
        unitLoad: '2',
        title: 'School Health Programme',
        duration: '30hrs',
    },
    {
        code: 'CHE 237',
        unitLoad: '2',
        title: 'Control of Non-Communicable Diseases',
        duration: '30hrs',
    },
    {
        code: 'BCH 111',
        unitLoad: '1',
        title: 'Introduction to Physical Chemistry',
        duration: '15hrs',
    },
    {
        code: 'CHE 238',
        unitLoad: '3',
        title: 'Community linkages and Development',
        duration: '75hrs',
    },
    {
        code: 'CHE 239',
        unitLoad: '2',
        title: 'Care and Management of HIV and AIDS',
        duration: '45hrs',
    },
    {
        code: 'CHE 240',
        unitLoad: '2',
        title: 'Occupational Health and Safety',
        duration: '30hrs',
    }
]

const secondSemester: Array<Course> = [
    {
        code: 'CHE 241',
        unitLoad: '3',
        title: 'Clinical Skills II',
        duration: '90hrs',
    },
    {
        code: 'CHE 242',
        unitLoad: '4',
        title: 'Maternal Health',
        duration: '105hrs',
    },
    {
        code: 'CHE 243',
        unitLoad: '3',
        title: 'Modified Essential New born Care',
        duration: '75hrs',
    },
    {
        code: 'CHE 244',
        unitLoad: '2',
        title: 'Community Ear, Nose and Throat Care (ENT)',
        duration: '45hrs',
    },
    {
        code: 'CHE 245',
        unitLoad: '1',
        title: 'Community Eye Care',
        duration: '15hrs',
    },
    {
        code: 'CHE 246',
        unitLoad: '3',
        title: 'Use of Standing Orders',
        duration: '75hrs',
    },
    {
        code: 'GNP123',
        unitLoad: '2',
        title: 'Introduction to Pharmacology',
        duration: '30hrs',
    },
    {
        code: 'CHE 247',
        unitLoad: '2',
        title: 'Nigerian Health System',
        duration: '30hrs',
    },
    {
        code: 'CHE248',
        unitLoad: '4',
        title: 'Supervised Clinical Experience II',
        duration: '90hrs',
    },
]

const levelTwoCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelTwoCourses;