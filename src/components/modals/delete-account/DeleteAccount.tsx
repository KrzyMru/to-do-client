import React, { useContext, useRef } from "react";
import Modal from "../Modal";
import type { ModalProps } from "../types";
import { useTranslation } from "react-i18next";
import { Button } from "../../button";
import { deleteAccount } from "../../../api";
import { ToastContext, UserContext } from "../../../contexts";

const DeleteAccount = (props: ModalProps) => {
    const { open, onClose } = { ... props }
    const [timer, setTimer] = React.useState(10000);
    const [disabledButton, setDisabledButton] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { token, setToken } = useContext(UserContext);
    const { openToast } = useContext(ToastContext);
    const interval = useRef<NodeJS.Timeout|undefined>(undefined);
    const { t } = useTranslation();

    const timeLeft = (timer / 1000);

    React.useEffect(() => {
        if (open) {
            if (interval.current !== undefined)
                clearInterval(interval.current);
            interval.current = setInterval(() => {
                setTimer(timer => timer - 1000);
            }, 1000);
        }
        else {
            if(interval.current !== undefined)
                clearInterval(interval.current);
            setTimer(10000);
            setDisabledButton(true);
        }
    }, [open]);

    React.useEffect(() => {
        if (timer <= 0) {
            if (interval.current !== undefined)
                clearInterval(interval.current);
            setDisabledButton(false);
        }
    }, [timer]);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteAccount({ token, setToken });
            openToast({
                type: 'success',
                title: t('modals.deleteAccount.toast.success.title'),
                text: t('modals.deleteAccount.toast.success.text')
            });
            onClose();
            setToken("");
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('modals.deleteAccount.toast.error.title'),
                text: t('modals.deleteAccount.toast.error.text')
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="p-1 mb-1">
                <p className="text-center text-gray-900 dark:text-white text-xl lg:text-3xl line-clamp-1 [transition:font-size_350ms,color_350ms]">{t('modals.deleteAccount.header')}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <div className="pt-8 pb-16 px-16">
                <p className="text-center text-base lg:text-xl text-gray-900 dark:text-white [transition:color_350ms,font-size_350ms]">{t('modals.deleteAccount.text')}</p>
            </div>
            <div className="ml-auto w-fit">
                <div className="relative">
                    {disabledButton && <p className="z-999 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl lg:text-3xl font-mono uppercase dark:text-white text-gray-900 [transition:font-size_350ms,color_350ms]">{timeLeft}</p>}
                    <Button
                        title={t('modals.deleteAccount.buttonTitle')}
                        disabled={disabledButton || loading}
                        loading={loading}
                        onClick={handleDelete}
                        type="submit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[24px] lg:size-[36px] shrink-0 mr-1 ${(disabledButton || loading) ? 'fill-indigo-100 dark:fill-gray-600' : 'fill-white'} transition[height_width_fill] duration-350`}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"></path> </g>
                        </svg>
                        <p className={`text-base lg:text-xl font-mono uppercase ${(disabledButton || loading)  ? 'text-indigo-100 dark:text-gray-600' : 'text-white'} [transition:font-size_350ms,color_350ms]`}>{t('modals.deleteAccount.buttonText')}</p>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};  
                       
export default DeleteAccount;