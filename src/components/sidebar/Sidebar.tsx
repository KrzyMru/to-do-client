import React, { useContext } from 'react';
import type { SidebarProps } from './types';
import { useNavigate } from "react-router";
import { CreateList, Settings } from '../modals';
import { getListHeaders } from '../../api'
import { TaskLists } from '../modals/task-lists';
import { useTranslation } from 'react-i18next';
import { ScreenContext } from '../../contexts';
import { UserContext } from '../../contexts/UserContext';
import { Icon } from '../icon';
import { AnimatePresence, motion } from 'motion/react';

const Sidebar = (props: SidebarProps) => {
    const { listHeaders, onLoadHeaders, onSaveList } = { ...props };
    const { screen, setScreen } = useContext(ScreenContext);
    const { token, setToken } = useContext(UserContext);
    const [open, setOpen] = React.useState<boolean>(false);
    const [openSettings, setOpenSettings] = React.useState<boolean>(false);
    const [openCreateList, setOpenCreateList] = React.useState<boolean>(false);
    const [openTaskLists, setOpenTaskLists] = React.useState<boolean>(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const loadListHeaders = async () => {
            try {
                const response = await getListHeaders({ token, setToken });
                onLoadHeaders(response);
            } catch (e: unknown) { }
        }
        loadListHeaders();
    }, [token, setToken, onLoadHeaders]);

    const modals = 
        <React.Fragment>
            {openSettings &&
                <Settings
                    open={openSettings}
                    onClose={() => setOpenSettings(false)}
                />
            }
            {openCreateList &&
                <CreateList
                    open={openCreateList}
                    onClose={() => setOpenCreateList(false)}
                    onSave={onSaveList}
                />
            }
            {openTaskLists &&
                <TaskLists
                    open={openTaskLists}
                    onClose={() => setOpenTaskLists(false)}
                    listHeaders={listHeaders}
                />
            }
        </React.Fragment>

    return (
        <div className="flex flex-row flex-nowrap sm:flex-col sm:border-r-1 border-gray-300 dark:border-gray-700 [transition:border-color_350ms]">
            <button
                className="group border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 rounded-none sm:rounded-tl-lg hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2 
                    border-gray-300 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-radius_border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0"
                onClick={() => setOpen(!open)}
                title={t('sidebar.header.buttonTitle')}
                type="button"
            >
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 ${open && 'rotate-90'} transition-[width_height_fill] duration-350`}
                >
                    <path d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75"></path>
                </svg>
                <p className={`sm:line-clamp-1 text-gray-900 dark:text-white text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} font-mono uppercase text-center hidden transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.header.text')}</p>
            </button>
            <div className="flex flex-row sm:flex-col flex-nowrap overflow-auto sm:min-h-[82px] lg:min-h-[98px] min-w-[112px] sm:min-w-0">
                <button
                    className={`border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2 ${screen === "Today" ? 'bg-slate-300 dark:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700'}
                        border-gray-300 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0`}
                    onClick={() => setScreen("Today")}
                    title={t('sidebar.items.today.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
                    </svg>
                    <p className={`line-clamp-1 text-gray-900 dark:text-white text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.items.today.text')}</p>
                </button>
                <button
                    className={`border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2 ${screen === "Calendar" ? 'bg-slate-300 dark:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700'}
                        border-gray-300 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0`}
                    onClick={() => setScreen("Calendar")}
                    title={t('sidebar.items.calendar.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                    >
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"></path>
                    </svg>         
                    <p className={`line-clamp-1 text-gray-900 dark:text-white text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.items.calendar.text')}</p>
                </button>
                <button
                    className={`border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2 ${screen === "Profile" ? 'bg-slate-300 dark:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700'}
                        border-gray-300 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0`}
                    onClick={() => setScreen("Profile")}
                    title={t('sidebar.items.profile.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path>
                    </svg>  
                    <p className={`line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} text-gray-900 dark:text-white transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.items.profile.text')}</p>
                </button>
                <button
                    className="border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2
                        border-gray-300 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0"
                    onClick={() => setOpenSettings(true)}
                    title={t('sidebar.items.settings.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                    >
                        <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"></path>
                    </svg> 
                    <p className={`line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} text-gray-900 dark:text-white transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.items.settings.text')}</p>
                </button>
                <button
                    className="border-b-1 border-r-1 sm:border-r-0 h-fit flex items-center px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2
                        border-gray-300 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0"
                    onClick={() => setOpenCreateList(true)}
                    title={t('sidebar.items.newList.buttonTitle')}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                    >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                    </svg> 
                    <p className={`line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} text-gray-900 dark:text-white transition-[width_font-size_color_margin-left_opacity] duration-350`}>{t('sidebar.items.newList.text')}</p>
                </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 overflow-auto flex-1 shrink min-h-[82px] lg:min-h-[98px] hidden sm:block [transition:min-height_350ms,background-color_350ms]">
                <AnimatePresence>
                    {
                        listHeaders.map((header, index) => 
                            <motion.button key={header.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }} transition={{ duration: 0.3, delay: index * 0.12, ease: "easeOut" }}
                                className="bg-indigo-50 border-b-1 border-gray-300 focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-slate-500 dark:border-gray-700 flex items-center h-fit px-4 py-2 hover:brightness-[90%] active:brightness-[85%] hover:cursor-pointer dark:focus-visible:inset-ring-slate-300 [transition:border-color_350ms,filter_100ms]"
                                style={{ backgroundColor: header.backgroundColor }}
                                onClick={() => setScreen(header.id)}
                                title={`${t('sidebar.items.listHeader.buttonTitle')} '${header.name}'`}
                            >
                                <Icon 
                                    type={header.iconType}
                                    color={header.iconColor}
                                    className={`size-[24px] lg:size-[32px] shrink-0 ${screen === header.id && 'rotate-90'} transition-all duration-350`}
                                />
                                <p className={`line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} transition-[width_font-size_margin-left_opacity] duration-350`} style={{ color: header.textColor }}>{header.name}</p>
                            </motion.button>
                        )
                }
                </AnimatePresence>
            </div>
            <button
                className="border-b-1 border-r-1 sm:border-r-0 flex sm:hidden items-center h-fit px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2 flex-1 min-w-[56px] overflow-hidden
                    border-gray-300 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-800 dark:focus-visible:inset-ring-slate-300 transition-[border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0"
                onClick={() => setOpenTaskLists(true)}
                title={t('sidebar.items.lists.buttonTitle')}
                type="button"
            >
                <div className="flex flex-1 overflow-hidden flex-row flex-nowrap justify-center shrink">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350" 
                    >
                        <path d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3m-1-5v2a1 1 0 1 0 2 0v-2zM6 7v2h8V7zm0 4v2h8v-2zm0 4v2h5v-2z"></path>
                    </svg> 
                    <p className={`line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} transition-[width_font-size_margin-left_opacity] duration-350`}>{t('sidebar.items.lists.text')}</p>
                </div>
            </button>
            <button
                className="border-b-1 sm:border-b-0 sm:border-t-1 rounded-none sm:rounded-bl-lg flex items-center h-fit px-4 py-2 hover:cursor-pointer focus:outline-none focus-visible:inset-ring-2
                    border-gray-300 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 focus-visible:inset-ring-slate-500 dark:border-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700 dark:active:bg-slate-800 dark:focus-visible:inset-ring-slate-300 transition-[border-radius_border-width_border-color_background-color] duration-350 hover:duration-0 focus-visible:duration-0"
                onClick={() => navigate('/signOut')}
                title={t('sidebar.items.signOut.buttonTitle')}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-[24px] lg:size-[32px] fill-gray-600 dark:fill-white shrink-0 transition-[width_height_fill] duration-350"
                >
                    <path d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"></path>
                </svg> 
                <p className={`sm:line-clamp-1 text-base lg:text-xl ${open ? 'opacity-100 w-20 lg:w-25 ml-2' : 'opacity-0 w-0 ml-0'} hidden text-gray-900 dark:text-white transition-[width_font-size_margin-left_opacity] duration-350`}>{t('sidebar.items.signOut.text')}</p>
            </button>
            {modals}
        </div>
    );
}

export default Sidebar;