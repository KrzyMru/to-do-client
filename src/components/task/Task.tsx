import React, { useContext } from 'react';
import { Icon } from '../icon';
import { TaskInfo } from '../modals';
import type { TaskComponentProps, TaskStatus } from './types';
import { deleteTask, toggleTask } from '../../api';
import { UpdateTask } from '../modals/update-task';
import { ScreenContext } from '../../contexts';
import { UserContext } from '../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { ToastContext } from '../../contexts/ToastContext';
import dayjs from 'dayjs';

const Task = (props: TaskComponentProps) => {
    const { task, onDelete, onToggle, onUpdate } = { ...props }
    const { t } = useTranslation();
    const { setScreen } = useContext(ScreenContext);
    const { openToast } = useContext(ToastContext);
    const { token, setToken } = useContext(UserContext);
    const [openInfo, setOpenInfo] = React.useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const actionTimer = React.useRef<NodeJS.Timeout | undefined>(undefined);
    const loadingTimer = React.useRef<NodeJS.Timeout | undefined>(undefined);

    const due = dayjs(task.due);
    const now = dayjs();
    const status: TaskStatus = task.completed ? "Completed" : due.isAfter(now) ? "Pending" : "Overdue";

    const handleToggle = async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        const startTime = Date.now();
        const minDelay = 600;
        try {
            setLoading(true);
            const response = await toggleTask({ token, setToken, taskId: task.id });
            const delay = Date.now() - startTime;
            if (actionTimer.current !== undefined)
                clearTimeout(actionTimer.current)
            actionTimer.current = setTimeout(() => {
                onToggle(response);
                openToast({
                    type: 'success',
                    title: t('task.toast.toggle.success.title'),
                });
            }, minDelay - delay);
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('task.toast.toggle.error.title'),
                text: t('task.toast.toggle.error.text')
            });
        }
        finally {
            const delay = Date.now() - startTime;
            if (loadingTimer.current !== undefined)
                clearTimeout(loadingTimer.current)
            loadingTimer.current = setTimeout(() => setLoading(false), minDelay - delay);
        }
    }

    const handleDelete = async (e: React.SyntheticEvent) => {
        e.stopPropagation();
        try {
            setLoading(true);
            await deleteTask({ token, setToken, taskId: task.id });
            onDelete(task.id);
            openToast({
                type: 'success',
                title: t('task.toast.delete.success.title'),
            });
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('task.toast.delete.error.title'),
                text: t('task.toast.delete.error.text')
            });
            setLoading(false);
        }
    }
    const handleUpdate = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setOpenUpdate(true);
    }
    const handleListClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setScreen(task.listHeader.id);
    }

    React.useEffect(() => {
        return () => {
            if (actionTimer.current !== undefined)
                clearTimeout(actionTimer.current)
            if (loadingTimer.current !== undefined)
                clearTimeout(loadingTimer.current)
        }
    }, []);

    const TaskColor = {
        ["Pending"]: "bg-gradient-to-r from-sky-50 via-cyan-100 to-sky-200 dark:bg-gradient-to-l dark:from-sky-900 dark:via-cyan-800 dark:to-sky-600",
        ["Overdue"]: "bg-gradient-to-r from-rose-50 via-pink-100 to-rose-200 dark:bg-gradient-to-l dark:from-rose-900 dark:via-pink-800 dark:to-rose-700",
        ["Completed"]: "bg-gradient-to-r from-emerald-50 via-teal-100 to-emerald-200 dark:bg-gradient-to-l dark:from-emerald-900 dark:via-teal-800 dark:to-emerald-600",
    }

    const untoggledIcon = "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16";
    const toggledIcon = "M4 12a8 8 0 1 1 16 0a8 8 0 0 1-16 0m8-10C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5.457 7.457l-1.414-1.414L11 13.086l-2.793-2.793l-1.414 1.414L11 15.914z";

    const modals =
        <React.Fragment>
            {openInfo &&
                <TaskInfo
                    open={openInfo}
                    onClose={() => setOpenInfo(false)}
                    task={task}
                />
            }
            {openUpdate &&
                <UpdateTask
                    open={openUpdate}
                    onClose={() => setOpenUpdate(false)}
                    task={task}
                    onUpdate={onUpdate}
                />
            }
        </React.Fragment>;

    return (
        <React.Fragment>
            <div
                tabIndex={0}
                role="button"
                className={`p-0 flex items-center shadow-sm rounded-md cursor-pointer items-stretch focus-visible:outline-3 focus-visible:outline-slate-500 dark:focus-visible:outline-slate-300 [&:has(button:hover)]:shadow-sm hover:shadow-md active:shadow-sm dark:shadow-gray-500 ${loading ? "pointer-events-none brightness-[95%]" : "pointer-events-auto"} ${TaskColor[status]} [transition:background-color_350ms,box-shadow_100ms]`}
                onClick={() => setOpenInfo(true)}
                onKeyDown={(event) => {
                    if (event.currentTarget === event.target // for event bubbling from children on key press
                        && event.key === 'Enter' || event.key === ' ')
                        setOpenInfo(true)
                }}
                title={t('task.buttonInfoTitle')}
            >
                <AnimatePresence mode='wait'>
                    {
                        loading ?
                        <motion.div
                            className="flex-1 items-center my-18 xs:my-11 lg:my-15 mx-2 [transition:margin_350ms] p-2"
                            key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                        >
                            <div className="flex animate-pulse bg-white dark:bg-gray-400 h-[20px] xs:h-[12px] lg:h-[20px] rounded-md [transition:height_350ms]" />
                        </motion.div>
                        :
                        <motion.div
                            className="flex flex-1 flex-col flex-wrap xs:flex-row xs:flex-nowrap overflow-hidden p-2"
                            key="task" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                        >
                            <div className="hidden xs:flex justify-center items-center pr-2">
                                <button
                                    className="cursor-pointer group focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200"
                                    onClick={handleToggle}
                                    title={t('task.buttonToggleTitle')}
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                            className="size-[48px] lg:size-[56px] fill-slate-400 group-hover:fill-slate-500 dark:fill-white dark:group-hover:fill-slate-400 shrink-0 transition-[width,height,fill] duration-[350ms,350ms,350ms] hover:duration-[350ms,350ms,100ms]"
                                    >
                                        <path d={task.completed ? toggledIcon : untoggledIcon}></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex overflow-hidden w-[calc(100%+1rem)] h-[32px] xs:w-[32px] xs:h-[116px] lg:h-[156px] -mx-2 -mt-2 xs:-mx-0 xs:-my-2 rounded-t-md xs:rounded-none hover:shadow-md active:shadow-none dark:shadow-gray-400 transition-[box-shadow,height] duration-[100ms,0ms] xs:duration-[100ms,350ms]">
                                <button
                                    className="flex-1 flex overflow-hidden flex-nowrap xs:writing-sideways-lr p-1 focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-700 dark:focus-visible:inset-ring-slate-200 cursor-pointer"
                                    style={{ backgroundColor: task.listHeader.backgroundColor }}
                                    onClick={handleListClick}
                                    title={t('task.buttonListTitle')}
                                    type="button"
                                >
                                    <Icon
                                        type={task.listHeader.iconType}
                                        color={task.listHeader.iconColor}
                                        className="size-[24px] xs:rotate-270 shrink-0"
                                    />
                                    <p className="line-clamp-1 text-base" style={{ color: task.listHeader.textColor }}>
                                        {task.listHeader.name}
                                    </p>
                                </button>
                            </div>
                            <div className="flex-1 max-w-full mt-2 xs:pl-2 xs:mt-0 overflow-hidden [transition:padding_350ms]">
                                <p className="font-bold line-clamp-1 text-gray-900 dark:text-white text-lg lg:text-xl font-serif [transition:color_350ms,font-size_350ms]">{task.name}</p>
                                <p className="line-clamp-3 lg:line-clamp-4 text-gray-900 dark:text-white text-base lg:text-lg h-[72px] lg:h-[112px] transition-[height_font-size_color] duration-350">{task.description}</p>
                            </div>
                            <div className="hidden sm:flex border-gray-300 dark:border-gray-500 -my-2 border-l-1 mx-2 [transition:border-color_350ms]"></div>
                            <div className="hidden sm:flex sm:min-w-[80px] lg:min-w-[104px] mx-1 justify-center flex-col items-center [transition:min-width_350ms]">
                                <p className="text-sm text-gray-900 dark:text-white lg:text-lg uppercase whitespace-nowrap [transition:color_350ms,font-size_350ms]">{t('taskStatus.' + status)}</p>
                                <p className="text-sm text-gray-900 dark:text-white lg:text-lg uppercase font-mono whitespace-nowrap [transition:color_350ms,font-size_350ms]">{due.format("HH:mm")}</p>
                                <p className="text-sm text-gray-900 dark:text-white lg:text-lg uppercase font-mono whitespace-nowrap [transition:color_350ms,font-size_350ms]">{due.format("DD/MM/YYYY")}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2 xs:pl-2 xs:mt-0 [transition:padding_350ms,margin_350ms]">
                                <button
                                    className="cursor-pointer mr-2 group focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200" 
                                    onClick={handleUpdate} 
                                    title={t('task.buttonUpdateTitle')}
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="size-[24px] lg:size-[32px] scale-100 active:scale-110 fill-slate-400 group-hover:fill-slate-500 dark:fill-white dark:group-hover:fill-slate-400 shrink-0 transition-[width,height,fill] duration-[350ms,350ms,350ms] hover:duration-[350ms,350ms,100ms]"
                                    >
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path>
                                    </svg>
                                </button>
                                <button
                                    className="cursor-pointer mr-2 group xs:hidden focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200"
                                    onClick={handleToggle} 
                                    title={t('task.buttonToggleTitle')}
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="size-[24px] lg:size-[32px] scale-100 active:scale-110 fill-slate-400 group-hover:fill-slate-500 dark:fill-white dark:group-hover:fill-slate-400 shrink-0 transition-[width,height,fill] duration-[350ms,350ms,350ms] hover:duration-[350ms,350ms,100ms]"
                                    >
                                        <path d={task.completed ? toggledIcon : untoggledIcon}></path>
                                    </svg>
                                </button>
                                <button
                                    className="cursor-pointer group focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200"
                                    onClick={handleDelete} 
                                    title={t('task.buttonDeleteTitle')}
                                    type="button"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-[24px] lg:size-[32px] scale-100 active:scale-110 fill-slate-400 group-hover:fill-slate-500 dark:fill-white dark:group-hover:fill-slate-400 shrink-0 transition-[width,height,fill] duration-[350ms,350ms,350ms] hover:duration-[350ms,350ms,100ms]"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"></path> </g>
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            {modals}
        </React.Fragment>
        );
}

export default Task;