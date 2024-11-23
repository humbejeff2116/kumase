import { Course } from "../communityHealth"

const firstSemester: Array<Course> = [
    {
        code: 'ELS 101',
        unitLoad: '2',
        title: 'Communication skills I',
        duration: '',
    },
    {
        code: 'CSC 101',
        unitLoad: '2',
        title: 'Introduction to IT I',
        duration: '',
    },
    {
        code: 'CHM 101',
        unitLoad: '2',
        title: 'General Chemistry',
        duration: '',
    },
    {
        code: 'BIO 101',
        unitLoad: '2',
        title: 'General Biology',
        duration: '',
    },
    {
        code: 'PHY 101',
        unitLoad: '2',
        title: 'General Physics',
        duration: '',
    },
    {
        code: 'MTH 101',
        unitLoad: '2',
        title: 'General Mathematics',
        duration: '',
    },
    {
        code: 'GST 101',
        unitLoad: '2',
        title: 'Citizenship Education',
        duration: '',
    },
    {
        code: 'GST 103',
        unitLoad: '2',
        title: 'History and philosophy of science',
        duration: '',
    },
    {
        code: 'EHT 101',
        unitLoad: '2',
        title: 'Introduction to Environmental Health',
        duration: '',
    },
    {
        code: 'FRN 101',
        unitLoad: '2',
        title: 'Functional French I',
        duration: '',
    }
]

const secondSemester: Array<Course> = [
    {
        code: 'ELS 102',
        unitLoad: '2',
        title: 'Communication skills II',
        duration: '',
    },
    {
        code: 'CSC102',
        unitLoad: '2',
        title: 'Introduction to IT II',
        duration: '',
    },
    {
        code: 'PHY 102',
        unitLoad: '3',
        title: 'General Physics II',
        duration: '',
    },
    {
        code: 'CHM 102',
        unitLoad: '3',
        title: 'Organic Chemistry',
        duration: '',
    },
    {
        code: 'BIO 102',
        unitLoad: '3',
        title: 'General Biology II',
        duration: '',
    },
    {
        code: 'MTH 102',
        unitLoad: '2',
        title: 'General Mathematics II',
        duration: '',
    },
    {
        code: 'FAP 102',
        unitLoad: '2',
        title: 'First Aid an primary Healthcare',
        duration: '',
    },
    {
        code: 'GST102',
        unitLoad: '2',
        title: 'Philosophy and Logic/Critical Reasoning',
        duration: '',
    },
    {
        code: 'FRN 102',
        unitLoad: '2',
        title: 'Functional French II',
        duration: '',
    },
]

const levelOneCourses = {
    firstSemester: firstSemester,
    secondSemester: secondSemester
}
export default levelOneCourses;