import { useTranslation } from "react-i18next";
import type { ScreenProps } from "../types";
import React from "react";
import { DeleteAccount } from "../../components/modals/delete-account";

const Profile = (props: ScreenProps) => {
    const { hidden } = { ...props }
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const modals = 
        <React.Fragment>
            {openModal &&
                <DeleteAccount
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                />
            }
        </React.Fragment>

    return (
        <div className={`flex-1 flex flex-col overflow-hidden ${hidden && 'hidden'}`}>
            <div className="flex items-center justify-center p-[6px] lg:p-2 [transition:padding_350ms]">
                <p className="text-xl lg:text-2xl font-bold line-clamp-1 text-gray-900 dark:text-white [transition:color_350ms,font-size_350ms]">{t('screens.profile.header')}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]"></div>
            <div className="flex flex-col justify-center items-center pt-16">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="p-2 size-[124px] lg:size-[188px] mr-1 fill-gray-600 dark:fill-white transition[height_width_fill] duration-350"
                >
                    <path d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"></path>
                </svg>
                <button
                    className="flex flex-nowrap items-center p-2 rounded-lg shadow-md hover:cursor-pointer focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 bg-rose-400 hover:bg-rose-500 dark:bg-rose-800 dark:hover:bg-rose-700 transition-[background-color] duration-350 hover:duration-100"
                    onClick={() => setOpenModal(true)}
                    title={t('pages.profile.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[36px] mr-1 fill-white transition[height_width] duration-350"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"></path> </g>
                    </svg>
                    <p className="text-base lg:text-xl font-mono uppercase text-white [transition:font-size_350ms]">{t('pages.profile.buttonText')}</p>
                </button>
            </div>
            {modals}
        </div>
    );
}

export default Profile;