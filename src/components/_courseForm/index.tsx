'use client'
import CourseForm from "../courseForm";
import Heading from "../heading";
import LevelSelector from "./levelSelector";
import { useState } from 'react';
import { SelectChangeEvent } from '@/components/types/events';
import styles from './index.module.css';
import { levels } from "@/context/college/types";
import LandingPageSectionWrapper from '../landing/sectionWrapper';



const studentLevels = Object.keys(levels).map(key => ({value: levels[key]}));

export default function _StudentCourseForm() {
    const [level, setLevel] = useState<string | null>(null);

    const handleSelectChange = (e: SelectChangeEvent) => {
        setLevel(e.target.value);
    }
    const levelOptions = [
        {name: "Level", value: ""},
        ...studentLevels
    ]

    return (
        <LandingPageSectionWrapper 
        useDefaultChildWrapper
        containerModifyClass={styles.container}
        childWrapperModifyClass={styles.sectionWrapper}
        showWave
        // useWave2
        >
        <Heading heading="Course Form"/>
        <div className={styles.formWrapper}>
            <LevelSelector 
            handleSelectChange={handleSelectChange} 
            options={levelOptions}
            hasSelectValue={level ? true : false}
            />
            <CourseForm level={level}/>
        </div>
        </LandingPageSectionWrapper> 
    )
}