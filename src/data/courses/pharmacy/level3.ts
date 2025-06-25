import { Course } from ".";

const firstSemester: Array<Course> = [
    {
        code: 'CHE 251',
        unitLoad: '1',
        title: 'Care of the Older Persons',
        duration: '15hrs',
    },
    {
        code: 'CHE 252',
        unitLoad: '2',
        title: 'Care of Persons with Special Needs',
        duration: '30hrs',
    },
    {
        code: 'CHE 253',
        unitLoad: '2',
        title: 'Health Statistics',
        duration: '30hrs',
    },
    {
        code: 'CHE 254',
        unitLoad: '2',
        title: 'Essential Medicines',
        duration: '30hrs',
    },
    {
        code: 'CHE 255',
        unitLoad: '1',
        title: 'Human Resource for Health',
        duration: '15hrs',
    },
    {
        code: 'CHE 256',
        unitLoad: '2',
        title: 'Research Methodology',
        duration: '30hrs',
    },
    {
        code: 'CHE 257',
        unitLoad: '2',
        title: 'Community Based New born Care',
        duration: '60hrs',
    },
    {
        code: 'CHE 258',
        unitLoad: '4',
        title: 'Supervised Community Based Experience (SCBE)',
        duration: '120hrs',
    }
]

const secondSemester: Array<Course> = [
    {
        code: 'CHE 261',
        unitLoad: '2',
        title: 'Primary Health Care Management',
        duration: '30hrs',
    },
    {
        code: 'CHE 262',
        unitLoad: '2',
        title: 'Referral System and Outreach service',
        duration: '30hrs',
    },
    {
        code: 'CHE 263',
        unitLoad: '1',
        title: 'Accounting System in Primary Health Care',
        duration: '15hrs',
    },
    {
        code: 'CHE 264',
        unitLoad: '2',
        title: 'Health Management Information System',
        duration: '30hrs',
    },
    {
        code: 'BUS 213',
        unitLoad: '2',
        title: 'Entrepreneurship Education',
        duration: '30hrs',
    },
    {
        code: 'CHE 265',
        unitLoad: '4',
        title: 'Research Project',
        duration: '',
    }
]

const levelThreeCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelThreeCourses;