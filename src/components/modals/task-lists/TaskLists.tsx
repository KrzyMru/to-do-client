import { useContext } from "react";
import Modal from "../Modal";
import type { TaskListsProps } from "./types";
import { ScreenContext } from "../../../contexts";
import { Icon } from "../../icon";
import { useTranslation } from "react-i18next";

const TaskLists = (props: TaskListsProps) => {
    const { open, onClose, listHeaders } = { ...props }
    const { setScreen } = useContext(ScreenContext);
    const { t } = useTranslation();

    const handleListClick = (headerId: number) => {
        setScreen(headerId)
        onClose()
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="p-1 mb-1">
                <p className="text-center text-gray-900 dark:text-white text-xl lg:text-3xl [transition:font-size_350ms,color_350ms]">{t('modals.taskLists.header')}</p>
            </div>
            <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
            <ul className="space-y-3 p-4">
                {
                    listHeaders.length === 0 ?
                    <p className="text-base text-center lg:text-xl font-sans line-clamp-1 text-gray-600 dark:text-gray-300 [transition:font-size_350ms,color_350ms]">{t('modals.taskLists.noLists')}</p>
                    :
                    listHeaders.map(header => (
                        <button
                            className="w-full flex items-center rounded-lg shadow-sm hover:shadow-md focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-slate-500 dark:focus-visible:outline-slate-300 dark:shadow-gray-500 p-3 hover:brightness-[95%] active:brightness-[85%] hover:cursor-pointer transition-[box-shadow_opacity] duration-100 focus-visible:duration-0"
                            style={{ backgroundColor: header.backgroundColor }}
                            onClick = {() => handleListClick(header.id)}
                            key={header.id}
                            type="button"
                        >
                            <Icon
                                type={header.iconType}
                                color={header.iconColor}
                                className="size-[24px] lg:size-[32px] shrink-0 mr-2 [transition:width_350ms,height_350ms]"
                            />
                            <p className="line-clamp-1 text-base text-left lg:text-xl [transition:font-size_350ms]" style={{ color: header.textColor }}>{header.name}</p>
                        </button>
                    ))
                }
            </ul>
        </Modal>
    );
};

export default TaskLists;