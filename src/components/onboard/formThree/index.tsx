import styles from './index.module.css';
import { getFormThree } from '@/data/onboardingForm';
import FormOne from '../formOne';

interface FormThreeProps {
    children: React.ReactNode
    handleSubmit: (values: any) => void
}
export default function FormThree({
    handleSubmit,
    children
}: FormThreeProps) {
    return (
        <FormOne 
        formData={getFormThree()} 
        handleSubmit={handleSubmit}
        >
        {children}
        </FormOne>
    )
}