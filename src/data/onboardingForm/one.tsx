import { formInputType } from '@/components/types/form';
// import * as Yup from 'yup';



const form = {
    one: '',
    two: '',
    three: '',
    four: ''
}

export const formOne = {
    id: "1",
    initial: {
        title: '',
        surname: '',
        firstName: '',
        otherName: ''
    },
    yupValidation: {
        // title: Yup.string().required('title is required'),
        // surname: Yup.string().required('surname is required'),
        // firstName: Yup.string().required('firstName is required'),
        // otherName: Yup.string().required('otherName is required')
    },
    formData: [
        {
            id:"1",
            name: "title",
            type: formInputType.select,
            label: "Title",
            dontShowErrorText: true,
            options: [
                {name: "Select", value: ""},
                {value: "Mr"},
                {value: "Mrs"},
                {value: "Miss"}
            ]
        },
        {
            id:"2",
            name: "surname",
            type: formInputType.text,
            label: "Surname",
        },
        {
            id:"3",
            name: "firstName",
            type: formInputType.text,
            label: "First Name",
        },
        {
            id:"4",
            name: "otherName",
            type: formInputType.text,
            label: "Other Name",
        },
        
    ]
}