import { formInputType } from '@/components/types/form';
// import * as Yup from 'yup';



export const formTwo = {
    id: "1",
    initial: {
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        nationality: ''
    },
    yupValidation: {
        // gender: Yup.string().required('gender is required'),
        // maritalStatus: Yup.string().required('marital status is required'),
        // dateOfBirth: Yup.string().required('Date of birth is required'),
        // nationality: Yup.string().required('Nationality is required')
    },
    formData: [
        {
            id:"1",
            name: "gender",
            type: formInputType.select,
            label: "Gender",
            options: [
                {name: "Select", value: ""},
                {value: "Male"},
                {value: "Female"},
            ]
        },
        {
            id:"2",
            name: "maritalStatus",
            type: formInputType.select,
            label: "Marital Status",
            options: [
                {name: "Select", value: ""},
                {value: "Single"},
                {value: "Married"},
                {value: "Divorced"}
            ]
        },
        {
            id:"3",
            name: "dateOfBirth",
            type: formInputType.date,
            label: "Date Of Birth",
        },
        {
            id:"4",
            name: "nationality",
            type: formInputType.select,
            label: "Nationality",
            options: [
                {name: "Select", value: ""},
                {value: "Nigerian"},
            ]
        },
    ]
}