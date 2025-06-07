import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import type { ModalProps } from "../types";

const Settings = (props: ModalProps) => {
    const { open, onClose } = { ...props }
    const { t, i18n } = useTranslation(); 
    const { theme, setTheme, toast, setToast } = useContext(SettingsContext);

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="p-1 mb-1">
                <p className="text-center text-gray-900 dark:text-white text-xl lg:text-3xl [transition:color_350ms,font-size_350ms]">{t('modals.settings.header')}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <ul className="flex-1 overflow-auto p-4 flex flex-wrap gap-4 sm:gap-8 md:gap-16 lg:gap-24 justify-center items-center [transition:gap_350ms]">
                <li>
                    <div className="p-1">
                        <p className="text-center text-gray-900 dark:text-white text-base lg:text-xl [transition:color_350ms,font-size_350ms]">{t('modals.settings.theme')}</p>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]">
                        <button
                            className="flex flex-1 items-center justify-center cursor-pointer bg-sky-100 hover:bg-sky-100 focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 dark:bg-gray-800 dark:hover:bg-gray-700 py-5 px-7 transition-[background-color] duration-350 hover:duration-100"
                            onClick={() => setTheme('light')}
                            title={t('modals.settings.buttonLightTitle')}
                            type="button"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`size-[36px] lg:size-[48px] ${theme === 'light' ? 'fill-amber-400' : 'fill-gray-300 dark:fill-gray-600'} transition-[fill_width_height] duration-350`}
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"></path> </g>
                            </svg>
                        </button>
                        <button
                            className="flex flex-1 items-center justify-center cursor-pointer bg-white hover:bg-slate-100 focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 dark:bg-gray-600 dark:hover:bg-gray-600 py-5 px-7 transition-[background-color] duration-350 hover:duration-100"
                            onClick={() => setTheme('dark')}
                            title={t('modals.settings.buttonDarkTitle')}
                            type="button"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`size-[36px] lg:size-[48px] ${theme === 'dark' ? 'fill-sky-300' : 'fill-gray-300 dark:fill-gray-600'} transition-[fill_width_height] duration-350`}
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"></path> <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path> </g>
                            </svg>
                        </button>
                    </div>
                </li>
                <li className="flex flex-col justify-center items-center">
                    <div className="p-1">
                        <p className="text-center text-gray-900 dark:text-white text-base lg:text-xl [transition:color_350ms,font-size_350ms]">{t('modals.settings.language')}</p>
                    </div>
                    <div className="flex w-fit rounded-lg overflow-hidden border-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]">
                        <button
                            className={`flex cursor-pointer focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 ${i18n.language === 'en-US' ? 'bg-slate-300 hover:bg-slate-300 dark:bg-gray-600 dark:hover:bg-gray-600' : 'bg-white hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700'} py-5 px-7 transition-[background-color] duration-350 hover:duration-100`}
                            onClick={() => i18n.changeLanguage('en-US')}
                            title={t('modals.settings.buttonEnTitle')}
                            type="button"
                        >
                            <p className={`text-center text-2xl lg:text-4xl ${i18n.language === 'en-US' ? 'text-sky-600 dark:text-sky-300' : 'text-gray-300 dark:text-gray-600'} size-[36px] lg:size-[48px] transition-[width_height_color_font-size] duration-350`}>EN</p>
                        </button>
                        <button
                            className={`flex cursor-pointer focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 ${i18n.language === 'pl' ? 'bg-slate-300 hover:bg-slate-300 dark:bg-gray-600 dark:hover:bg-gray-600' : 'bg-white hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700'} py-5 px-7 transition-[background-color] duration-350 hover:duration-100`}
                            onClick={() => i18n.changeLanguage('pl')}
                            title={t('modals.settings.buttonPlTitle')}
                            type="button"
                        >
                            <p className={`text-center text-2xl lg:text-4xl ${i18n.language === 'pl' ? 'text-sky-600 dark:text-sky-300' : 'text-gray-300 dark:text-gray-600'} size-[36px] lg:size-[48px] transition-[width_height_color_font-size] duration-350`}>PL</p>
                        </button>
                    </div>
                </li>
                <li>
                    <div className="p-1">
                        <p className="text-center text-gray-900 dark:text-white text-base lg:text-xl [transition:color_350ms,font-size_350ms]">{t('modals.settings.toast')}</p>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]">
                        <button
                            className={`flex cursor-pointer focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 ${toast === true ? 'bg-slate-300 hover:bg-slate-300 dark:bg-gray-600 dark:hover:bg-gray-600' : 'bg-white hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700'} py-5 px-7 transition-[background-color] duration-350 hover:duration-100`}
                            onClick={() => setToast(true)}
                            title={t('modals.settings.buttonToastOnTitle')}
                            type="button"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`size-[36px] lg:size-[48px] ${toast === true ? 'fill-sky-600 dark:fill-sky-300' : 'fill-gray-300 dark:fill-gray-600'} transition-[fill_width_height] duration-350`}
                            >
                                <path d="M4 19v-2h2v-7q0-2.075 1.25-3.688T10.5 4.2v-.7q0-.625.438-1.063T12 2q.625 0 1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2H4Zm8 3q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22Z" />
                            </svg>
                        </button>
                        <button
                            className={`flex cursor-pointer focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-500 dark:focus-visible:inset-ring-slate-300 ${toast === false ? 'bg-slate-300 hover:bg-slate-300 dark:bg-gray-600 dark:hover:bg-gray-600' : 'bg-white hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700'} py-5 px-7 transition-[background-color] duration-350 hover:duration-100`}
                            onClick={() => setToast(false)}
                            title={t('modals.settings.buttonToastOffTitle')}
                            type="button"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`size-[36px] lg:size-[48px] ${toast === false ? 'fill-sky-600 dark:fill-sky-300' : 'fill-gray-300 dark:fill-gray-600'} transition-[fill_width_height] duration-350`}
                            >
                                <path d="M4 19v-2h2v-7q0-.825.213-1.625T6.85 6.85L10 10H7.2L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4l-3.65-3.6H4Zm14-3.85l-9.8-9.8q.5-.4 1.075-.7T10.5 4.2v-.7q0-.625.438-1.063T12 2q.625 0 1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v5.15ZM12 22q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22Z" />
                            </svg>
                        </button>
                    </div>
                </li>
                
            </ul>
        </Modal>
    );
};

export default Settings;