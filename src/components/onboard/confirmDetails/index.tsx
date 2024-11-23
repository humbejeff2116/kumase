import { userEnum } from '@/context/auth/context';
import styles from './index.module.css';
import { getCoursesABreviation, getDepartmentABreviation } from '@/lib';



interface ConfirmOnboardingDetailsProps {
    forms: Array<any>
    children: React.ReactNode
}

export default function ConfirmOnboardingDetails({
    forms,
    children
}: ConfirmOnboardingDetailsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.childWrapper}>
            {forms.map((form, i) => 
                <Detail 
                key={i} 
                form={form}
                formNumber={i + 1}
                /> 
            )}
            {children}
            </div>
        </div>
    )
}


interface DetailProps {
    form: any
    formNumber: number
}

function Detail({
    form,
    formNumber
}: DetailProps) {
    // userEnum
    return (
        <div className={styles.detailWrapper}>
            <div className={styles.detailHeader}>
                <h2>Form {formNumber.toString()}</h2>
            </div>
            {Object.keys(form).map(key => {
                return (
                    <div className={styles.detail}>
                        {userEnum[key]}:
                        <span>
                        {key === 'department' ? (
                            getDepartmentABreviation(form[key])
                        ) : key === 'course' ? (
                            getCoursesABreviation(form[key])
                        ) : (
                            form[key]  
                        )}
                        </span> 
                    </div>
                )
            })}
        </div>
    )
}