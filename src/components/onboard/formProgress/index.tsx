import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { FaCheck } from 'react-icons/fa';


interface FormProgressProps {
    children: React.ReactNode
}

export default function FormProgressWrapper({
    children
}: FormProgressProps) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}


interface ProgressIndicatorProps {
    id: string
    completed: boolean,
    isActive: boolean
}

export function ProgressIndicator({
    id,
    completed,
    isActive
}: ProgressIndicatorProps) {
    const indicatorClassName = `
    ${styles.progressWrapper} 
    ${completed && styles.isCompleted} 
    ${isActive && styles.isActive}`;

    return (
        <div className={indicatorClassName}>
            <span>
                {completed ? (
                    <IconContext.Provider value={{className: styles.icon}}>
                    <FaCheck/>
                    </IconContext.Provider>
                ) : (
                    id
                )}
            </span>
        </div>
    )
}