import { Course } from "../communityHealth"

const firstSemester: Array<Course> = [
    {
        code: 'ANA 201',
        unitLoad: '3',
        title: 'Basic Anatomy',
        duration: '',
    },
    {
        code: 'PHS 201',
        unitLoad: '3',
        title: 'Basic Physiology',
        duration: '',
    },
    {
        code: 'BCH 201',
        unitLoad: '3',
        title: 'Basic Biochemistry',
        duration: '',
    },
    {
        code: 'MLT 201',
        unitLoad: '3',
        title: 'Introduction to MLS',
        duration: '',
    },
    {
        code: 'MLT 203',
        unitLoad: '3',
        title: 'Introduction to Immunology',
        duration: '',
    },
    {
        code: 'MLT 205',
        unitLoad: '3',
        title: 'Clinical Laboratory posting I',
        duration: '',
    },
    {
        code: 'MLT 207',
        unitLoad: '2',
        title: 'Basic Laboratory Techniques',
        duration: '',
    },
    {
        code: 'BIO 201',
        unitLoad: '2',
        title: 'Basic Cytology Genetics',
        duration: '',
    }
]

const secondSemester: Array<Course> = [
    {
        code: 'MLT 202',
        unitLoad: '3',
        title: 'Medical Microbiology',
        duration: '',
    },
    {
        code: 'MLT 204',
        unitLoad: '3',
        title: 'Haematology I',
        duration: '',
    },
    {
        code: 'MLT 206',
        unitLoad: '3',
        title: 'Clinical Chemistry',
        duration: '',
    },
    {
        code: 'MLT 208',
        unitLoad: '3',
        title: 'HIstopathology',
        duration: '',
    },
    {
        code: 'MLT 210',
        unitLoad: '2',
        title: 'Research Methodology',
        duration: '',
    },
    {
        code: 'MLT 212',
        unitLoad: '2',
        title: 'Introduction to Management , Lab Organization and Ethics',
        duration: '',
    },
    {
        code: 'MLT 214',
        unitLoad: '3',
        title: 'Clinical Laboratory',
        duration: '',
    },
    {
        code: 'MLT 216',
        unitLoad: '2',
        title: 'Basic Laboratory Techniques II',
        duration: '',
    },

]

const levelTwoCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelTwoCourses;