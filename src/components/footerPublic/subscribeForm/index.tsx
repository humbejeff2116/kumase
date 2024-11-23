import { Form, Formik } from 'formik';
import { subscribeForm } from '@/data/form';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { RiMailAddFill } from 'react-icons/ri';
import { Timer } from '@/components/types';
import * as Yup from 'yup';
import usePopUpFor from '@/components/modal/shared';
import { TextInput } from '@/components/forms/formik/components';
import { SpinnerSmall } from '@/components/loader/spinner';
import { subscribeNewsLetter } from '@/services/services.http';
import styles from './index.module.css';



interface SubscribeFormValues {
    // fullName: string
    email: string
}

const subScribeData = {
    subscribeHeading: "Subscribe To Our News Letter",
    subscribeForm: subscribeForm
}

export default function SubscribeForm() {
    const [subscribing, setSubscribing] = useState(false);
    const [message, setMessage] = useState('');
    const [showPopup, setShowpopup] = useState(false);
    const [error, setError] = useState(false);
    const [userAlreadySubscribed, setUserAlreadySubscribed] = useState(false);
    let timer: Timer;

    useEffect(() => {
        if (showPopup) {
            timer = setTimeout(() => {
                setShowpopup(false);
            }, 5000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [showPopup]);

    const handleSubcribe = async (values: SubscribeFormValues) => {
        setSubscribing(true);

        try {
            const subscribeResponse = await subscribeNewsLetter(values);
            if (subscribeResponse.alreadySubscribed) {
                setUserAlreadySubscribed(true);
            }
            setSubscribing(false);
            setMessage(subscribeResponse.message);
            setShowpopup(true);
        } catch(err) {
            setError(true);
            if (err instanceof Error) {
                setMessage(err.message);
            }
            setSubscribing(false);
            setShowpopup(true);
        }
    }

    const closePopUp = () => {
        setShowpopup(false);
    }

    const usePopupFor = () => {
        return userAlreadySubscribed ? '' : error ? usePopUpFor.error : usePopUpFor.success;
    }
    return (
        <Formik
        initialValues={subscribeForm.initial}
        validationSchema={Yup.object(subscribeForm.yupValidation)}
        onSubmit={handleSubcribe}
        >
            <Form className={styles.container}>
            {subscribeForm.formData.map((input, i) =>
                <TextInput
                key={i} 
                {...input} 
                useOnlyTextInput
                dontShowErrorText
                inputClassName={styles.input}
                inputErrorClassName={styles.inputError}
                inputNotEmptyClassName={styles.inputContains}
                errorClass={styles.errorDisplay}
                />  
            )}
            <div className={styles.buttonWrapper}>
                <button type='submit' disabled={subscribing}>
                {subscribing ? (
                    <>
                    <RiMailAddFill className={styles.subscribeIcon}/>
                    <SpinnerSmall unsetMarginTop/>
                    </>
                ) : (
                    <>
                    <RiMailAddFill className={styles.subscribeIcon}/>
                    Subscribe
                    </>
                )}
                </button>
            </div>  
            </Form>
        </Formik>
    )
}