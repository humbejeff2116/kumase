import { IconContext } from 'react-icons';
import styles from './index.module.css';


interface HeadingProps {
    wrapperClass?: string
    headerClass?: string
    icon?: JSX.Element
    iconClassName?: string
    heading: string
}

export default function Heading({
    wrapperClass,
    // headerClass,
    icon,
    iconClassName,
    heading
}: HeadingProps) {
    return (
        <div className={wrapperClass ?? styles.headerWrapper}>
            <div className={wrapperClass ?? styles.heading}>
                {icon && (
                    <span className={styles.headingIcon}>
                        <IconContext.Provider value={{className: iconClassName ?? styles.icon}}>
                        {icon}
                        </IconContext.Provider>
                    </span>
                )}
                {heading}
            </div>
        </div>
    )
}