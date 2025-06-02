import { formInputType } from '@/components/types/form';
import * as Yup from 'yup';


export const searchForm = {
    id: "1",
    initial: {
        location: '',
        courseLevel: '',
        destination: '',
        levelOfEducation: ''
    },
    yupValidation: {
        // location: Yup.string().required('Location is required'),
        // courseLevel: Yup.string().required('CourseLevel is required'),
        // destination: Yup.string().required('Destination is required'),
        // levelOfEducation: Yup.string().required('Level of Education is required')
    },
    formData: [
        {
            id:"1",
            name: "location",
            type: formInputType.select,
            // label: "Location",
            dontShowErrorText: true,
            options: [
                // TODO...consume API for loaction here 
                {name: "Location", value: ""},
                {value: "Abia"},
                {value: "Adamawa"},
                {value: "Akwaibom"}
            ]
        },
        {
            id:"2",
            name: "courseLevel",
            type: formInputType.select,
            // label: "Course Level",
            dontShowErrorText: true,
            options: [
                // TODO...consume API for loaction here 
                {name: "Course Level", value: ""},
                {value: "Abia"},
                {value: "Adamawa"},
                {value: "Akwaibom"}
            ]
        },
        {
            id:"3",
            name: "destination",
            type: formInputType.select,
            // label: "Destination",
            dontShowErrorText: true,
            options: [
                // TODO...consume API for loaction here 
                {name: "Destination", value: ""},
                {value: "Abia"},
                {value: "Adamawa"},
                {value: "Akwaibom"}
            ]
        },
        {
            id:"4",
            name: "levelOfEducation",
            type: formInputType.select,
            // label: "Level Of Education",
            dontShowErrorText: true,
            options: [
                // TODO...consume API for loaction here 
                {name: "Level Of Education", value: ""},
                {value: "Abia"},
                {value: "Adamawa"},
                {value: "Akwaibom"}
            ]
        }
    ]
}

export const loginForm = {
    id: "1",
    initial: {
        regNo: '',
        password: '',
    },
    yupValidation: {
        regNo: Yup.string().required('Reg Number is required'),
        password: Yup.string().required('Password is required'),
    },
    formData: [
        {
            id:"1",
            name: "regNo",
            type: formInputType.text,
            label: "RegNo",
            // dontShowErrorText: true,
        },
        {
            id:"2",
            name: "password",
            type: formInputType.password,
            label: "Password",
            // dontShowErrorText: true,
        }
    ]
}


export const signupForm = {
    id: "1",
    initial: {
        // fullName: '',
        email: '',
        password: '',
    },
    yupValidation: {
        // fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email("Email Address must be valid").required('Email is required'),
        password: Yup.string().required('Password is required'),
    },
    formData: [
        // {
        //     id:"1",
        //     name: "fullName",
        //     type: formInputType.text,
        //     label: "Full Name",
        //     // dontShowErrorText: true,
        // },
        {
            id:"1",
            name: "email",
            type: formInputType.text,
            label: "Email Address",
            // dontShowErrorText: true,
        },
        {
            id:"2",
            name: "password",
            type: formInputType.password,
            label: "Password",
            // dontShowErrorText: true,
        }
    ]
}


export const studentTokenAuthForm = {
    id: "1",
    initial: {
        token: '',
    },
    yupValidation: {
        token: Yup.string().required('token is required'),
    },
    formData: [
        {
            id:"1",
            name: "token",
            type: formInputType.text,
            placeholder: "Enter 12 digit token",
            label: "Student Token",
            // dontShowErrorText: true
        }
    ]
}

export const subscribeForm = {
    id: "1",
    initial: {
        email: '',
        // fullName: '',
    },
    yupValidation: {
        email: Yup.string().required('Email is required').email(),
        // fullName: Yup.string().required('Full Name is required')
    },
    formData: [
        // {
        //     name: "fullName",
        //     type: formInputType.text,
        //     placeholder: "Full Names"

        // },
        {
            name: "email",
            type: formInputType.email,
            placeholder: "Example@gmail.com"
            // label: "Email Address",
            // dontShowErrorText: true
        }
    ]
}