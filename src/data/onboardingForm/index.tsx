import { formOne } from "./one";
import { formTwo } from "./two";
import { formThree } from "./three";



interface OnboardingForm {
    [key: string]: any
    formOne: any
    formTwo: any
    formThree: any
    formFour: any 
}

const onboardingForm: OnboardingForm = {
    formOne: formOne,
    formTwo: formTwo,
    formThree: formThree,
    formFour: {}
}

export function getFormOne() {
    return onboardingForm.formOne;
}

export function getFormTwo() {
    return onboardingForm.formTwo;
}

export function getFormThree() {
    return onboardingForm.formThree;
}

export function getFormIds() {
    return Object.keys(onboardingForm).map((_, id) => (id + 1).toString());
}
