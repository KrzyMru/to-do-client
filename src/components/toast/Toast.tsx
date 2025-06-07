import React, { useState } from "react";
import type { ToastComponentProps } from "./types";
import { useTranslation } from "react-i18next";

const Toast = (props: ToastComponentProps) => {
    const { onClick, onClose, timeout, title, type, visible, text } = { ...props }
    const [timer, setTimer] = useState(timeout);
    const [pauseInterval, setPauseInterval] = useState(false);
    const { t } = useTranslation();

    const timeLeftPercent = timer / timeout * 100;

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeftPercent <= 0)
                onClose();
            else if (!pauseInterval)
                setTimer(timer - 100);
        }, 100);

        return () => clearInterval(interval);
    }, [timer, timeLeftPercent, props, pauseInterval, onClose]);

    const toastBackground = {
        ['info']: 'bg-gradient-to-r from-white via-sky-100 to-blue-200 dark:from-gray-800 dark:via-sky-800 dark:to-blue-700',
        ['success']: 'bg-gradient-to-r from-white via-emerald-100 to-green-200 dark:from-gray-800 dark:via-emerald-800 dark:to-green-700',
        ['error']: 'bg-gradient-to-r from-white via-rose-100 to-red-200 dark:from-gray-800 dark:via-rose-800 dark:to-red-700'
    }
    const toastLoadingBar = {
        ['info']: 'bg-sky-200 group-hover:bg-sky-300 dark:bg-sky-700 dark:group-hover:bg-sky-600',
        ['success']: 'bg-lime-200 group-hover:bg-lime-300 dark:bg-lime-700 group-hover:bg-lime-600',
        ['error']: 'bg-red-200 group-hover:bg-red-300 dark:bg-red-700 dark:group-hover:bg-red-600'
    }

    return (
        <button
            className={`${visible ? 'flex' : 'hidden'} relative flex-col rounded-lg shadow-md hover:shadow-lg focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 dark:shadow-gray-500 hover:cursor-pointer transition-colors duration-350 w-[260px] xs:w-[300px] md:w-[350px] lg:w-[400px] bg-gray-50 dark:bg-gray-700 p-2 overflow-hidden border-gray-200 dark:border-gray-600 border-1 group`}
            onClick={onClick}
            title={t('toast.buttonTitle')}
            type="button"
            onMouseEnter={() => setPauseInterval(true)}
            onMouseLeave={() => setPauseInterval(false)}
            onFocus={() => setPauseInterval(true)}
            onBlur={() => setPauseInterval(false)}
        >
            <div className={`${toastBackground[type]} -m-2 p-2`}>
                <p className="text-start font-semibold text-base lg:text-lg text-gray-900 dark:text-white">{title}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-400 mt-2 -mx-2" />
            <div className="flex-1 flex flex-col justify-between">
                {   text && 
                    <div className="h-[42px] lg:h-[50px] overflow-auto my-1">
                        <p className="text-start text-sm lg:text-base text-gray-800 dark:text-gray-50">{text}</p>
                    </div>
                }
                <div className="rounded-b-lg -mx-2 -mb-2 h-2 bg-gray-300 dark:bg-neutral-600 overflow-hidden">
                    <div className={`flex flex-col justify-center h-full transition-all duration-100 ease-in ${toastLoadingBar[type]}`}
                        style={{ width: timeLeftPercent +'%' }}
                    />
                </div>
            </div>
        </button>
    );
}

export default Toast;