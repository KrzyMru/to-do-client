import type { ListProps, TaskListProps } from "./types";
import React, { useContext } from "react";
import { deleteList, getList } from "../../api";
import { Task } from "../../components/task";
import { TaskSkeleton } from "../../components/skeletons";
import { IconType } from "../../components/icon/types";
import { UpdateList } from "../../components/modals/update-list";
import { CreateTask } from "../../components/modals/create-task";
import { ToastContext, UserContext } from "../../contexts";
import { useTranslation } from "react-i18next";
import type { TaskProps } from "../../components/task/types";
import { AnimatePresence, motion } from "motion/react";

const TaskList = (props: TaskListProps) => {
    const { hidden, listId, onDelete, onUpdate } = { ...props };
    const { token, setToken } = useContext(UserContext);
    const [list, setList] = React.useState<ListProps>({
        id: -1,
        name: "",
        iconType: IconType.List,
        backgroundColor: "#BAE6FD",
        textColor: "#757575",
        iconColor: "#757575",
        tasks: []
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openListEdit, setOpenListEdit] = React.useState<boolean>(false);
    const [openCreateTask, setOpenCreateTask] = React.useState<boolean>(false);
    const { openToast } = useContext(ToastContext);
    const { t } = useTranslation();
    // Timer for smooth animations
    const listTimer = React.useRef<number | undefined>(undefined);

    const handleDeleteList = async () => {
        try {
            setLoading(true);
            await deleteList({ token, setToken, listId });
            onDelete(list.id);
            openToast({
                type: 'success',
                title: t('screens.taskList.toast.delete.success.title'),
            });
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('screens.taskList.toast.delete.error.title'),
                text: t('screens.taskList.toast.delete.error.text')
            });
        }
        finally {
            setLoading(false);
        }
    }

    const handleUpdateList = async (list: ListProps) => {
        onUpdate(list);
        setList(list);
    }

    const handleRemoveTask = (taskId: number) => {
        setList(prevList => ({...prevList, tasks: prevList.tasks.filter(task => task.id !== taskId)}));
    }
    const handleUpdateTask = (task: TaskProps) => {
        setList(prevList => ({...prevList, tasks: prevList.tasks.map(t => t.id === task.id ? task : t)}));
    }
    const handleSaveTask = (task: TaskProps) => {
        setList(prevList => ({ ...prevList, tasks: [...prevList.tasks, task] }));
    }

    React.useEffect(() => {
        if (!hidden) {
            const loadListData = async () => {
                const startTime = Date.now();
                try {
                    setLoading(true);
                    const response = await getList({ token, setToken, listId });
                    setList(response)
                } catch (e: unknown) {
                    window.location.href = "/";
                }
                finally {
                    const minDelay = 600;
                    const delay = Date.now() - startTime;
                    if (listTimer.current !== undefined)
                        clearTimeout(listTimer.current)
                    listTimer.current = setTimeout(() => setLoading(false), minDelay - delay);
                }
            }
            loadListData();
        }

    }, [hidden, listId, token, setToken]);

    React.useEffect(() => {
        return () => {
            if (listTimer.current !== undefined)
                clearTimeout(listTimer.current)
        }
    }, []);

    const modals =
        <React.Fragment>
            {openListEdit &&
                <UpdateList
                    open={openListEdit}
                    onClose={() => setOpenListEdit(false)}
                    list={list}
                    onUpdate={handleUpdateList}
                />
            }
            {openCreateTask &&
                <CreateTask
                    open={openCreateTask}
                    onClose={() => setOpenCreateTask(false)}
                    listId={list.id}
                    onSave={handleSaveTask}
                />
            }
        </React.Fragment>;

    return (
        <div className={`flex-1 flex flex-col overflow-hidden ${hidden && 'hidden'}`}>
            <div className="p-1" style={{ backgroundColor: list.backgroundColor }}> 
                <AnimatePresence mode='wait'>
                {
                    loading ?
                    <motion.div
                        className="items-center m-3 lg:m-4 [transition:margin_350ms]"
                        key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                        <div className="animate-pulse flex-1 h-[8px] bg-white dark:bg-gray-400 rounded-xl [transition:background-color_350ms]" />
                    </motion.div>
                    :
                    <motion.div
                        className="flex justify-center items-center"
                        key="header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[32px] lg:size-[40px] mr-2 shrink-0 [transition:width_350ms,height_350ms]`}
                            style={{ fill: list.iconColor }}
                        >
                            <path d={list.iconType}></path>
                        </svg>
                        <p className={`text-xl lg:text-2xl font-bold line-clamp-1 [transition:font-size_350ms]`} style={{ color: list.textColor }}>{list.name}</p>
                    </motion.div>
                }
                </AnimatePresence>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <div className="flex flex-nowrap justify-around items-center p-1">
                <button
                    className="focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-1 transition-[background-color] duration-350 hover:duration-100"
                    onClick={() => setOpenListEdit(true)}
                    disabled={list.id === -1}
                    title={t('screens.taskList.buttonUpdateTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white transition-colors shrink-0 [transition:width_350ms,height_350ms,fill_350ms]"
                    >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path>
                    </svg>
                </button>
                <button
                    className="focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-1 group transition-[background-color] duration-350 hover:duration-100"
                    onClick={() => setOpenCreateTask(true)}
                    disabled={list.id === -1}
                    title={t('screens.taskList.buttonCreateTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white transition-colors shrink-0 [transition:width_350ms,height_350ms,fill_350ms]"
                    >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                    </svg>
                </button>
                <button
                    className="focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-1 group transition-[background-color] duration-350 hover:duration-100"
                    onClick={() => handleDeleteList()}
                    disabled={list.id === -1}
                    title={t('screens.taskList.buttonDeleteTitle')}
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white transition-colors shrink-0 [transition:width_350ms,height_350ms,fill_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z"></path> </g>
                    </svg>
                </button>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <div className="flex-1 overflow-auto p-4">
                <AnimatePresence mode='wait'>
                    {
                        loading ?
                        <motion.ul className="space-y-4" key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            {Array.from({ length: 4 }, (_, index) => <TaskSkeleton key={index} />)}
                        </motion.ul>
                        :
                        list.tasks.length === 0 ?
                        <motion.p key="noTasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            className="text-base text-center lg:text-xl font-sans line-clamp-1 text-gray-600 dark:text-gray-300 [transition:font-size_350ms,color_350ms]"
                        >
                            {t('screens.taskList.noTasks')}
                        </motion.p>
                        :
                        <motion.ul className="space-y-4" key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <AnimatePresence>
                                {list.tasks.map((task, index) => (
                                    <motion.li key={task.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0, margin: 0 }} transition={{ duration: 0.3, delay: index * 0.12, ease: "easeOut" }}>
                                        <Task
                                            key={task.id}
                                            task={task}
                                            onDelete={handleRemoveTask}
                                            onUpdate={handleUpdateTask}
                                            onToggle={handleUpdateTask}
                                        />
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>
            {modals}
        </div>
    );
}

export default TaskList;