import useCourseContext from '@/context/course/context';
import styles from './index.module.css';
import { EntryRequirementsTable } from '../course';




export default function ApplyCourse() {
    const { getCourse } = useCourseContext();
    const course = getCourse();

    return (
        <div className={styles.container}>
            <div>
                {course?.title}
            </div>
            <div>
            {course && (
                <EntryRequirementsTable 
                duration={course.duration} 
                entryRequirement={course.entryRequirement} 
                certificateType={course.certificateType}
                />
            )}
            </div>
            <AuthRegistration/>
        </div>
    )
}


function AuthRegistration() {
    return (
        <div>
            auth reg form
        </div>
    )
}