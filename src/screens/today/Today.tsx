import { Task } from "../../components/task";
import React, { useContext } from "react";
import { getTodayTasks } from "../../api";
import { TaskSkeleton } from "../../components/skeletons";
import { useTranslation } from "react-i18next";
import type { ScreenProps } from "../types";
import { UserContext } from "../../contexts/UserContext";
import type { TaskProps } from "../../components/task/types";
import { AnimatePresence, motion } from "motion/react";

const Today = (props: ScreenProps) => {
    const { hidden } = { ...props }
    const { token, setToken } = useContext(UserContext);
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tasks, setTasks] = React.useState<TaskProps[]>([]);
    // Timer for smooth animations
    const listTimer = React.useRef<number|undefined>(undefined);

    const handleRemoveTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
    const handleUpdateTask = (task: TaskProps) => {
        setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));
    }

    React.useEffect(() => {
        if (!hidden) {
            const loadTodayTasks = async () => {
                const startTime = Date.now();
                try {
                    setLoading(true);
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const response = await getTodayTasks({ token, setToken, timezone });
                    setTasks(response);
                } catch (e) { }
                finally {
                    const minDelay = 600;
                    const delay = Date.now() - startTime;
                    if (listTimer.current !== undefined)
                        clearTimeout(listTimer.current)
                    listTimer.current = setTimeout(() => setLoading(false), minDelay - delay);
                }
            }
            loadTodayTasks();
        }
    }, [hidden, token, setToken]);

    React.useEffect(() => {
        return () => {
            if (listTimer.current !== undefined)
                clearTimeout(listTimer.current)
        }
    }, []);

    return (
        <div className={`flex-1 flex flex-col overflow-hidden ${hidden && 'hidden'}`}>
            <div className="flex items-center justify-center p-[6px] lg:p-2 [transition:padding_350ms]">
                <p className="text-xl lg:text-2xl font-bold line-clamp-1 text-gray-900 dark:text-white [transition:color_350ms,font-size_350ms]">{t('screens.today.header')}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]"></div>
            <div className="flex-1 overflow-auto p-4">
                <AnimatePresence mode='wait'>
                    {
                        loading ?
                        <motion.ul className="space-y-4" key="skeletons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            {Array.from({ length: 4 }, (_, index) => <TaskSkeleton key={index} />)}
                        </motion.ul>
                        :
                        tasks.length === 0 ?
                        <motion.p key="noTasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            className="text-base text-center lg:text-xl font-sans line-clamp-1 text-gray-600 dark:text-gray-300 [transition:color_350ms,font-size_350ms]"
                        >
                            {t('screens.today.noTasks')}
                        </motion.p>
                        :
                        <motion.ul className="space-y-4" key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                            <AnimatePresence>
                                {tasks.map((task, index) => (
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

export default Today;