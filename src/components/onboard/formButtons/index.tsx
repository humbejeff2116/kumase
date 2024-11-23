import styles from './index.module.css';

interface PrevAndNextButtonsProps {
    dontShowBackButton?: boolean 
    customSubmitButton?: React.ReactNode 
    goBack?: () => void
}

export function PrevAndNextButtons({
    dontShowBackButton, 
    customSubmitButton, 
    goBack, 
}: PrevAndNextButtonsProps) {

    return (
        <div className={styles.container}>
            <div>
            {dontShowBackButton ? null : (
                <button onClick={goBack} className={styles.back}>
                    Back
                </button>
            )}
            </div>
            <div>
            {customSubmitButton ? customSubmitButton : (
                <button type="submit" className={styles.next}>
                Continue
                </button> 
            )}
            </div>
        </div>
    )
}