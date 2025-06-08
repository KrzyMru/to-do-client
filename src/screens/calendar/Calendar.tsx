import { TaskSkeleton } from "../../components/skeletons";
import { Task } from "../../components/task";
import React, { useCallback, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getDateTasks, getTaskCounts } from "../../api";
import CalendarWeek from "./CalendarWeek";
import { useTranslation } from "react-i18next";
import type { ScreenProps } from "../types";
import { UserContext } from "../../contexts";
import type { TaskCounts } from "./types";
import type { TaskProps, TaskStatus } from "../../components/task/types";
import { AnimatePresence, motion } from "motion/react";

const createCalendarGrid = (firstDayOfMonth: Dayjs) => {
    const weekdayOfFirstDay = firstDayOfMonth.day();
     const offset = weekdayOfFirstDay === 0 ? 6 : weekdayOfFirstDay - 1;
    const calendarStart = firstDayOfMonth.startOf('day').subtract(offset, 'day');

    const calendarGrid: Dayjs[] = [];
    for (let i = 0; i < 42; i++) {
        calendarGrid.push(calendarStart.add(i, 'day'));
    }

    return calendarGrid;
}

const Calendar = (props: ScreenProps) => {
    const { hidden } = { ...props }
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = dayjs();
    const today = now.startOf('day');
    const [selectedDate, setSelectedDate] = React.useState<Dayjs>(today);
    const [calendarDate, setCalendarDate] = React.useState<Dayjs>(today);
    const [calendarGrid, setCalendarGrid] = React.useState<Dayjs[]>(createCalendarGrid(calendarDate.startOf('month')));
    const [selectedDateTasks, setSelectedDateTasks] = React.useState<TaskProps[]>([]);
    const [calendarGridTaskCounts, setCalendarGridTaskCounts] = React.useState<Record<string, TaskCounts>>({});
    const [loadingCalendarGrid, setLoadingCalendarGrid] = React.useState<boolean>(false);
    const [loadingSelectedDateTasks, setLoadingSelectedDateTasks] = React.useState<boolean>(false);
    const { token, setToken } = useContext(UserContext);
    const { t } = useTranslation();
    // Timers for smooth animations
    const listTimer = React.useRef<number | undefined>(undefined);
    const calendarTimer = React.useRef<number | undefined>(undefined);

    const calendarDateHeader = t('screens.calendar.months.' + months[calendarDate.month()]) + " " + calendarDate.year();

    const loadDateTasks = useCallback(async (date: Dayjs) => {
        const startTime = Date.now();
        try {
            setLoadingSelectedDateTasks(true);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const dateString = date.format('MM/DD/YYYY HH:mm:ss Z');
            const response = await getDateTasks({ token, setToken, date: dateString, timezone });
            setSelectedDateTasks(response);
        } catch (e) { }
        finally {
            const minDelay = 600;
            const delay = Date.now() - startTime;
            if (listTimer.current !== undefined)
                clearTimeout(listTimer.current)
            listTimer.current = setTimeout(() => setLoadingSelectedDateTasks(false), minDelay - delay);
        }
    }, [token, setToken]); 

    const loadTaskCounts = useCallback(async (startDate: Dayjs, endDate: Dayjs) => {
        const startTime = Date.now();
        try {
            setLoadingCalendarGrid(true);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const startDateString = startDate.format('MM/DD/YYYY HH:mm:ss Z');
            const endDateString = endDate.format('MM/DD/YYYY HH:mm:ss Z');
            const response = await getTaskCounts({ token, setToken, startDate: startDateString, endDate: endDateString, timezone });
            setCalendarGridTaskCounts(response);
        } catch (e) { }
        finally {
            const minDelay = 600;
            const delay = Date.now() - startTime;
            if (calendarTimer.current !== undefined)
                clearTimeout(calendarTimer.current)
            calendarTimer.current = setTimeout(() => setLoadingCalendarGrid(false), minDelay - delay);
        }
    }, [token, setToken]);
    
    const handleRemoveTask = (taskId: number) => {
        const task = selectedDateTasks.find(task => task.id === taskId);
        if (task) {
            const taskDueDate = dayjs(task.due);
            const taskStatus: TaskStatus = task.completed ? "Completed" : taskDueDate.isAfter(now) ? "Pending" : "Overdue";
            const taskDueDateString = dayjs(task.due).format("YYYY-MM-DD");

            setCalendarGridTaskCounts(prevRecord => {
                const updatedEntries = Object.entries(prevRecord).map(entry => {
                    const entryDate = entry[0];
                    if (entryDate === taskDueDateString) {
                        const entryTaskCounts = { ...entry[1] };
                        entryTaskCounts[taskStatus] = entryTaskCounts[taskStatus] - 1;
                        return [entryDate, entryTaskCounts]
                    }
                    return entry;
                });
                return Object.fromEntries(updatedEntries);
            });

            setSelectedDateTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }
    }
    const handleUpdateTask = (task: TaskProps) => {
        const oldTask = selectedDateTasks.find(tsk => tsk.id === task.id);
        if (oldTask) {
            const taskDueDate = dayjs(task.due);
            const oldTaskDueDate = dayjs(oldTask.due);
            const taskStatus: TaskStatus = task.completed ? "Completed" : taskDueDate.isAfter(now) ? "Pending" : "Overdue";
            const oldTaskStatus: TaskStatus = oldTask.completed ? "Completed" : oldTaskDueDate.isAfter(now) ? "Pending" : "Overdue";
            const taskDueDateString = dayjs(task.due).format("YYYY-MM-DD");
            const oldTaskDueDateString = dayjs(oldTask.due).format("YYYY-MM-DD");

            setCalendarGridTaskCounts(prevRecord => {
                let updatedEntries = Object.entries(prevRecord).map(entry => {
                    const entryDate = entry[0];
                    const entryTaskCounts = { ...entry[1] };
                    if (entryDate === oldTaskDueDateString || entryDate === taskDueDateString) {
                        if (entryDate === oldTaskDueDateString)
                            entryTaskCounts[oldTaskStatus] = entryTaskCounts[oldTaskStatus] - 1;
                        if (entryDate === taskDueDateString)
                            entryTaskCounts[taskStatus] = entryTaskCounts[taskStatus] + 1;
                        return [entryDate, entryTaskCounts]
                    }
                    return entry;
                });

                // If the target date has no task count, then create a new one
                if (!updatedEntries.find(entry => entry[0] === taskDueDateString)) {
                    const defaultTaskCounts = { ["Overdue"]: 0, ["Pending"]: 0, ["Completed"]: 0 };
                    const newTaskCounts = { ...defaultTaskCounts, ...prevRecord[taskDueDateString] };
                    newTaskCounts[taskStatus] = newTaskCounts[taskStatus] + 1;
                    updatedEntries = [...updatedEntries, [taskDueDateString, newTaskCounts]];
                }

                return Object.fromEntries(updatedEntries);
            });

            // Update loaded tasks too
            if (oldTaskDueDateString !== taskDueDateString)
                setSelectedDateTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
            else
                setSelectedDateTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));
        }
        
    }

    const handleSelectDate = (date: Dayjs) => {
        setSelectedDate(date);
        loadDateTasks(date);
    }
    const handleSelectToday = () => {
        handleSelectDate(today);
        setCalendarDate(today);
    }

    const handleNextMonth = () => {
        setCalendarDate(calendarDate.add(1, 'month'));
    }
    const handlePreviousMonth = () => {
        setCalendarDate(calendarDate.subtract(1, 'month'));
    }
    const handleNextYear = () => {
        setCalendarDate(calendarDate.add(1, 'year'));
    }
    const handlePreviousYear = () => {
        setCalendarDate(calendarDate.subtract(1, 'year'));
    }

    React.useEffect(() => {
        if (!hidden)
            loadDateTasks(selectedDate);
    }, [hidden, selectedDate, loadDateTasks]);

    React.useEffect(() => {
        if (!hidden)
            loadTaskCounts(calendarGrid[0], calendarGrid[41]);
    }, [hidden, calendarGrid, loadTaskCounts]);

    React.useEffect(() => {
        setCalendarGrid(createCalendarGrid(calendarDate.startOf('month')));
    }, [calendarDate]);

    // Clear all timers on unmount
    React.useEffect(() => {
        return () => {
            if (listTimer.current !== undefined)
                clearTimeout(listTimer.current);
            if (calendarTimer.current !== undefined)
                clearTimeout(calendarTimer.current);
        }
    }, []);

    const calendarWeekdays =
        <tr>
            {
                weekdays.map((weekday) => (
                    <th
                        className="text-center border-1 border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300 [transition:border-color_350ms,color_350ms]"
                        key={weekday}
                    >
                        {t('screens.calendar.weekdays.'+weekday)}
                    </th>
                ))
            }
        </tr>;

    const calendarWeeks = 
        <React.Fragment>
            {Array.from(Array(8).keys()).map(week =>
                <CalendarWeek
                    key={week}
                    dates={calendarGrid.slice(week * 7, (week + 1) * 7)}
                    selectedDate={selectedDate}
                    calendarDate={calendarDate}
                    taskCounts={calendarGridTaskCounts}
                    onDateClick={handleSelectDate}
                    onBeforeMonthClick={handlePreviousMonth}
                    onAfterMonthClick={handleNextMonth}
                    loading={loadingCalendarGrid}
                />
            )}
        </React.Fragment>

    return (
        <div className={`flex-1 flex flex-col flex-nowrap overflow-auto ${hidden && 'hidden'}`}>
            <div className="flex items-center justify-center p-[6px] lg:p-2 relative [transition:padding_350ms]">
                <p className="text-xl lg:text-2xl font-bold line-clamp-1 text-gray-900 dark:text-white [transition:color_350ms,font-size_350ms]">{t('screens.calendar.header')}</p>
                <button
                    className="hover:cursor-pointer bg-sky-100 hover:bg-sky-200 active:bg-sky-300 focus-visible:outline-3 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-300 dark:bg-sky-600 dark:hover:bg-sky-500 dark:active:bg-sky-400 rounded-full p-1 absolute right-4 transition-[background-color] duration-350 hover:duration-100"
                    onClick={handleSelectToday}
                    title={t('screens.calendar.buttonTodayTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] fill-gray-600 dark:fill-white shrink-0 [transition:fill_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
                    </svg>
                </button>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <div className="flex justify-center items-center pt-4 px-2 pb-2">
                <button
                    className="rounded-full hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 dark:hover:bg-gray-500 dark:active:bg-gray-400 mx-1 transition-[background-color] duration-350 hover:duration-100"
                    onClick={handlePreviousYear}
                    title={t('screens.calendar.buttonPrevYearTitle')}
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[24px] lg:size-[32px] shrink-0 fill-gray-600 dark:fill-gray-300 rotate-180 [transition:fill_350ms,width_350ms,height_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m19 12-7-5v10zM5 7v10l7-5z"></path></g>
                    </svg>
                </button>
                <button
                    className="rounded-full hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 dark:hover:bg-gray-500 dark:active:bg-gray-400 transition-[background-color] duration-350 hover:duration-100"
                    onClick={handlePreviousMonth}
                    title={t('screens.calendar.buttonPrevMonthTitle')}
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[24px] lg:size-[32px] shrink-0 fill-gray-600 dark:fill-gray-300 rotate-180 [transition:fill_350ms,width_350ms,height_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5528 11.7764L6.15777 5.57889C5.62585 5.31293 5 5.69972 5 6.29443V17.7056C5 18.3003 5.62585 18.6871 6.15777 18.4211L18.5528 12.2236C18.737 12.1315 18.737 11.8685 18.5528 11.7764Z"></path> </g>
                    </svg>
                </button>
                <p className="font-semibold text-lg lg:text-xl w-[200px] xs:mx-4 lg:mx-20 xl:mx-30 text-center text-gray-600 dark:text-gray-300 [transition:font-size_350ms,color_350ms,margin_350ms]">{calendarDateHeader}</p>
                <button
                    className="rounded-full hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 dark:hover:bg-gray-500 dark:active:bg-gray-400 transition-[background-color] duration-350 hover:duration-100"
                    onClick={handleNextMonth}
                    title={t('screens.calendar.buttonNextMonthTitle')}
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[24px] lg:size-[32px] shrink-0 fill-gray-600 dark:fill-gray-300 [transition:fill_350ms,width_350ms,height_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5528 11.7764L6.15777 5.57889C5.62585 5.31293 5 5.69972 5 6.29443V17.7056C5 18.3003 5.62585 18.6871 6.15777 18.4211L18.5528 12.2236C18.737 12.1315 18.737 11.8685 18.5528 11.7764Z"></path> </g>
                    </svg>
                </button>
                <button
                    className="rounded-full hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 dark:hover:bg-gray-500 dark:active:bg-gray-400 mx-1 transition-[background-color] duration-350 hover:duration-100"
                    onClick={handleNextYear}
                    title={t('screens.calendar.buttonNextYearTitle')}
                    type="button"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[24px] lg:size-[32px] shrink-0 fill-gray-600 dark:fill-gray-300 [transition:fill_350ms,width_350ms,height_350ms]"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m19 12-7-5v10zM5 7v10l7-5z"></path></g>
                    </svg>
                </button>
            </div>
            <table className="mb-4 mx-4">
                <thead>{calendarWeekdays}</thead>
                <tbody>{calendarWeeks}</tbody>
            </table>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <div className="flex-1 overflow-auto min-h-[300px] p-4">
                <AnimatePresence mode='wait'>
                    {
                        loadingSelectedDateTasks ?
                        <motion.ul className="space-y-4" key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            {Array.from({ length: 2 }, (_, index) => <TaskSkeleton key={index} />)}
                        </motion.ul>
                        :
                        selectedDateTasks.length === 0 ?
                        <motion.p className="text-center text-base lg:text-xl font-sans text-gray-600 dark:text-gray-300 [transition:font-size_350ms,color_350ms]"
                            key="noTasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} 
                        >
                            {t('screens.calendar.noTasks')}
                        </motion.p>
                        :
                        <motion.ul className="space-y-4" key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <AnimatePresence>
                                {selectedDateTasks.map((task, index) => (
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
        </div>
    );
}

export default Calendar;