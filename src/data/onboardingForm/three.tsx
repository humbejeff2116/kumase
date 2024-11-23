import { formInputType } from '@/components/types/form';
import { courses, departments, levels } from '@/context/college/types';
// import * as Yup from 'yup';


const departmentsOptions = departments.map(dept => ({value: dept}));
const coursesOptions = courses.map(course => ({value: course}));
const levelsOptions =  Object.keys(levels).map(key => ({value: levels[key]}));
 
export const formThree = {
    id: "1",
    initial: {
        stateOfOrigin: '',
        department: '',
        course: '',
        level: ''
    },
    yupValidation: {
        // stateOfOrigin: Yup.string().required('State Of Origin is required'),
        // department: Yup.string().required('Department is required'),
        // course: Yup.string().required('Course is required'),
        // level: Yup.string().required('Level is required')
    },
    formData: [
        {
            id:"1",
            name: "stateOfOrigin",
            type: formInputType.select,
            label: "State Of Origin",
            options: [
                {name: "Select", value: ""},
                {value: "Abia"},
                {value: "Adamawa"},
                {value: "Akwaibom"}
            ]
        },
        {
            id:"2",
            name: "department",
            type: formInputType.select,
            label: "Department",
            options: [
                {name: "Select", value: ""},
                ...departmentsOptions,
            ]
        },
        {
            id:"3",
            name: "course",
            type: formInputType.select,
            label: "Course Offering",
            options: [
                {name: "Select", value: ""},
                ...coursesOptions,
            ]
        },
        {
            id:"4",
            name: "level",
            type: formInputType.select,
            label: "Level",
            options: [
                {name: "Select", value: ""},
                ...levelsOptions
            ]    
        },
    ]
}