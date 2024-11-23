import FormTemplate from '@/components/forms/formik';
import styles from './index.module.css';
import { getFormTwo } from '@/data/onboardingForm';
import FormOne from '../formOne';

interface FormTwoProps {
    children: React.ReactNode
    handleSubmit: (values: any) => void
}
export default function FormTwo({
    handleSubmit,
    children
}: FormTwoProps) {
    return (
        <FormOne 
        formData={getFormTwo()} 
        handleSubmit={handleSubmit}
        >
        {children}
        </FormOne>
    )
}