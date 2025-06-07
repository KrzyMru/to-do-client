import { useTranslation } from "react-i18next";
import type { CalendarDayProps } from "./types";
import React from "react";

const CalendarDay = (props: CalendarDayProps) => {
    const { date, onClick, selected, taskCounts, faded, loading } = { ...props }
    const day = date.get('date');
    const allTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0);
    const allCount = allTasks > 99 ? 99 : allTasks;
    const overdueCount = taskCounts["Overdue"] > 99 ? 99 : taskCounts["Overdue"];
    const pendingCount = taskCounts["Pending"] > 99 ? 99 : taskCounts["Pending"];
    const completedCount = taskCounts["Completed"] > 99 ? 99 : taskCounts["Completed"];
    const { t } = useTranslation();

    return (
        <td className={`border-1 border-gray-200 dark:border-gray-700 relative overflow-hidden max-w-[35px] max-h-[40px] lg:max-h-[50px] xl:max-h-[60px] ${selected ? 'bg-gray-100' : 'bg-white'} transition-[max-height_border-color] duration-350`}>
            <p className={`absolute top-0 right-1 text-sm lg:text-lg font-mono ${faded ? 'text-gray-300 dark:text-gray-900' : 'text-gray-900 dark:text-gray-300'} [transition:font-size_350ms,color_350ms]`}>{day}</p> 
            <button
                className={`p-1 w-full h-full items-center justify-center justify-self-center flex items-end min-w-[35px] min-h-[40px] lg:min-h-[50px] xl:min-h-[60px] hover:cursor-pointer active:bg-gray-100 focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-slate-700 dark:focus-visible:inset-ring-slate-200 ${selected ? 'bg-gray-100 hover:bg-gray-100 dark:bg-gray-400 dark:hover:bg-gray-400' : 'bg-white hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500'} transition-[min-height_background-color] duration-350 focus-visible:duration-0 hover:duration-0`}
                onClick={() => onClick(date)}
                title={t('screens.calendar.buttonDayTitle')}
                type="button"
            >
                {
                    loading ?
                        <div className="animate-pulse flex-1 h-[6px] bg-sky-100 dark:bg-gray-400 rounded-xl my-2 [transition:background-color_350ms]" />
                    :
                    <React.Fragment>
                            <p className={`mx-1 rounded-full items-center justify-center p-1 line-clamp-1 size-[20px] lg:size-[25px] xl:size-[30px] text-xs md:text-sm lg:text-base xl:text-lg text-gray-900 dark:text-white bg-amber-100 dark:bg-amber-400 transition-[width_height_font-size_color_background-color] duration-350 sm:hidden ${allCount === 0 ? 'hidden' : 'flex'}`}>{allCount}</p>
                            <p className={`mx-1 rounded-full items-center justify-center p-1 line-clamp-1 size-[20px] lg:size-[25px] xl:size-[30px] text-xs md:text-sm lg:text-base xl:text-lg text-gray-900 dark:text-white bg-rose-100 dark:bg-rose-400 transition-[width_height_font-size_color_background-color] duration-350 hidden ${overdueCount > 0 && 'sm:flex'}`}>{overdueCount}</p>
                            <p className={`mx-1 rounded-full items-center justify-center p-1 line-clamp-1 size-[20px] lg:size-[25px] xl:size-[30px] text-xs md:text-sm lg:text-base xl:text-lg text-gray-900 dark:text-white bg-sky-100 dark:bg-sky-400 transition-[width_height_font-size_color_background-color] duration-350 hidden ${pendingCount > 0 && 'sm:flex'}`}>{pendingCount}</p>
                            <p className={`mx-1 rounded-full items-center justify-center p-1 line-clamp-1 size-[20px] lg:size-[25px] xl:size-[30px] text-xs md:text-sm lg:text-base xl:text-lg text-gray-900 dark:text-white bg-emerald-100 dark:bg-emerald-400 transition-[width_height_font-size_color_background-color] duration-350 hidden ${completedCount > 0 && 'sm:flex'}`}>{completedCount}</p>
                    </React.Fragment>
                }
            </button>
        </td>
    );
}

export default CalendarDay;