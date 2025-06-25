import styles from './index.module.css';


interface TemplateProps {
    children: React.ReactNode, 
}

export default function CourseFormLayout({  
    children, 
}: TemplateProps) {
    return (
        <div className={styles.container}>
        {children}
        </div>
    )
}