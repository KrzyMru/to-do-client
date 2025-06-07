import type { ListHeaderProps } from "../../screens/task-list/types";

interface SidebarProps {
    listHeaders: ListHeaderProps[];
    onLoadHeaders: (listHeaders: ListHeaderProps[]) => void;
    onSaveList: (list: ListHeaderProps) => void;
}

export type { SidebarProps }