import FormTemplate from '@/components/forms/formik';
import styles from './index.module.css';
import { PrevAndNextButtons } from '../formButtons';
import { getFormOne } from '@/data/onboardingForm';


interface FormOneProps {
    children: React.ReactNode
    formData?: any
    handleSubmit: (values: any) => void
}
export default function FormOne({
    handleSubmit,
    formData,
    children
}: FormOneProps) {
    return (
        <div className={styles.formWrapper}>
            {formData ? (
                <FormTemplate
                {...formData}
                handleSubmit={handleSubmit}
                labelWrapperClassName={styles.labelWrapper}
                inputClassName={styles.input}
                selectClassName={styles.input}
                inputErrorClassName={styles.inputError}
                inputNotEmptyClassName={styles.inputContains}
                errorClassName={styles.errorWrapper}
                >
                    {children}
                </FormTemplate>
            ) : (
                <FormTemplate
                {...getFormOne()}
                handleSubmit={handleSubmit}
                labelWrapperClassName={styles.labelWrapper}
                inputClassName={styles.input}
                selectClassName={styles.input}
                inputErrorClassName={styles.inputError}
                inputNotEmptyClassName={styles.inputContains}
                errorClassName={styles.errorWrapper}
                >
                    {children}
                </FormTemplate>
            )}
        </div>
    )
}