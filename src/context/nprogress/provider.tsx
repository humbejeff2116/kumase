'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NprogressProvider = ({ 
    children 
}: { children: React.ReactNode }) => {
    return (
        <>
        {children}
        <ProgressBar
        height="3px"
        color="rgb(26, 115, 232)"
        options={{ showSpinner: false }}
        shallowRouting
        />
        </>
    )
}

export default NprogressProvider;