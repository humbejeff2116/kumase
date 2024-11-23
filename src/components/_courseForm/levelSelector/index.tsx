import { SelectOption } from '@/components/forms/formik';
import styles from './index.module.css';
import { SelectChangeEvent } from '@/components/types/events';
import { IconContext } from 'react-icons';
import { BiPrinter } from 'react-icons/bi';

interface LevelSelectorProps {
    handleSelectChange: (e: SelectChangeEvent) => void
    options: Array<any>
    hasSelectValue: boolean
}

export default function LevelSelector({
    handleSelectChange,
    hasSelectValue,
    options  
}: LevelSelectorProps) {

    return (
        <div className={styles.container}>
            <div className={styles.selectWrapper}>
                {/* <ButtonText text='Level'/> */}
                <select onChange={handleSelectChange}>
                {options.map((option, i) =>
                    <SelectOption key={i} {...option}/>
                )}
                </select>
            </div>
            {hasSelectValue && (
                <PrintFormButton/>
            )}
        </div>
    )
}

function PrintFormButton() {
    const handlePrintForm = () => {

    }

    return (
        <div className={styles.buttonWrapper}>
            {/* <ButtonText text='Print'/> */}
            <button onClick={handlePrintForm}>
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <BiPrinter/>
                </IconContext.Provider>
            </button>
        </div>
    )
}

interface ButtonTextProps {
    text: string
}

function ButtonText({
    text
}: ButtonTextProps) {
    return (
        <div className={styles.textWrapper}>
            {text}
        </div>
    )
}