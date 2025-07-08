import styles from './index.module.css'

interface SectionWrapperProps {
    children: React.ReactNode
}

export default function SectionWrapper({
    children
}: SectionWrapperProps) {
    return (
        <div>
            {children}
        </div>
    )
}