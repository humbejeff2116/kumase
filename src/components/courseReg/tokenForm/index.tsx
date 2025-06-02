'use client';
import { studentTokenAuthForm } from '@/data/form';
import FormTemplate from '@/components/forms/formik';
import styles from './index.module.css';




interface TokenAuthenticatorProps {
    handleSubmit: (values: any) => void
    children: React.ReactNode
}

export default function TokenAuthenticator({
    handleSubmit,
    children
}: TokenAuthenticatorProps) {
    
    return (
        <div className={styles.formWrapper}>
            <FormTemplate
            {...studentTokenAuthForm}
            handleSubmit={handleSubmit}
            labelWrapperClassName={styles.labelWrapper}
            inputClassName={styles.input}
            inputErrorClassName={styles.inputError}
            inputNotEmptyClassName={styles.inputContains}
            errorClassName={styles.errorWrapper}
            >
                {children}
            </FormTemplate>

        </div>
    )
}


export function CourseRegButtons() {
    return (
        <div>
            <button type='submit'>
                Verify
            </button>
        </div>
    )
}