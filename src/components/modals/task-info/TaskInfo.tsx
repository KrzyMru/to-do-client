import React from "react";
import type { TaskInfoProps } from "./types";
import dayjs from "dayjs";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";
import type { TaskStatus } from "../../task/types";

const TaskInfo = (props: TaskInfoProps) => {
    const { open, onClose, task } = { ...props }
    const [timeNow, setTimeNow] = React.useState(dayjs());
    const { t } = useTranslation();

    const due = dayjs(task.due);
    const created = dayjs(task.created);
    const overdueBy = due.diff(timeNow, 'second');
    const dueIn = timeNow.diff(due, 'second');
    const status: TaskStatus = task.completed ? "Completed" : due.isAfter(timeNow) ? "Pending" : "Overdue";
    const time = status === "Overdue" ? dueIn : overdueBy;

    const days = Math.max(Math.floor(time / 86400), 0);
    const hours = Math.max(Math.floor((time - days * 86400) / 3600), 0);
    const minutes = Math.max(Math.floor((time - days * 86400 - hours * 3600) / 60), 0);
    const seconds = Math.max(time - minutes * 60 - hours * 3600 - days * 86400, 0);

    const dayString = days + " " + t('modals.taskInfo.days');
    const timeString = hours + "h " + (minutes < 10 ? '0' + minutes : minutes) + "m " + (seconds < 10 ? '0' + seconds : seconds) + "s";

    const gradient = {
        ["Pending"]: "bg-gradient-to-b from-sky-50 via-cyan-100 to-sky-300 dark:from-sky-900 dark:via-cyan-800 dark:to-sky-600",
        ["Overdue"]: "bg-gradient-to-b from-rose-50 via-pink-200 to-rose-300 dark:from-rose-900 dark:via-pink-700 dark:to-rose-600",
        ["Completed"]: "bg-gradient-to-b from-emerald-50 via-teal-100 to-emerald-300 dark:from-emerald-900 dark:via-teal-800 dark:to-emerald-600",
    }

    React.useEffect(() => {
        const interval = setInterval(() => setTimeNow(dayjs()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className={`-m-6 p-6 ${gradient[status]} [transition:background-color_350ms]`}>
                <div className="p-1 mb-1">
                    <p className="text-center text-gray-900 dark:text-white text-xl lg:text-3xl [transition:color_350ms,font-size_350ms]">{task.name}</p>
                </div>
                <div className="border-b-1 border-gray-300 dark:border-gray-500 [transition:border-color_350ms]"/>
                <div className="flex justify-around p-4 gap-2">
                    <div>
                        <p className="text-center font-mono text-gray-900 dark:text-white text-base lg:text-xl uppercase [transition:color_350ms,font-size_350ms]">{t('modals.taskInfo.created')}</p>
                        <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{created.format("HH:mm")}</p>
                        <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{created.format("DD/MM/YYYY")}</p>
                    </div>
                    {
                        task.completed ?
                        <div>
                            <p className="text-center font-mono text-gray-900 dark:text-white text-base lg:text-xl uppercase line-through [transition:color_350ms,font-size_350ms]">{t('modals.taskInfo.timeLeft')}</p>
                            <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-base lg:text-xl uppercase [transition:color_350ms,font-size_350ms]">{t('modals.taskInfo.completed')}</p>
                        </div>
                        :
                        <div>
                            <p className="text-center font-mono text-gray-900 dark:text-white text-base lg:text-xl uppercase [transition:color_350ms,font-size_350ms]">
                                {status === "Overdue" ? t('modals.taskInfo.overdueBy') : t('modals.taskInfo.timeLeft')}
                            </p>
                            <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{dayString}</p>
                            <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{timeString}</p>
                        </div>
                    }
                    <div className="flex flex-col text-center">
                        <p className="text-center font-mono text-gray-900 dark:text-white text-base lg:text-xl uppercase [transition:color_350ms,font-size_350ms]">{t('modals.taskInfo.due')}</p>
                        <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{due.format("HH:mm")}</p>
                        <p className="text-center font-mono text-gray-700 dark:text-gray-300 text-sm lg:text-lg [transition:color_350ms,font-size_350ms]">{due.format("DD/MM/YYYY")}</p>          
                    </div>
                </div>
                <div className="min-h-40 lg:min-h-60 overflow-auto [transition:min-height_350ms]">
                    <p className="text-gray-900 dark:text-white text-base lg:text-xl [transition:color_350ms,font-size_350ms]">{task.description}</p>
                </div>
            </div>
        </Modal>
    );
};              

export default TaskInfo;