import { IconType } from "../../components/icon/types";
import type { TaskProps } from "../../components/task/types";
import type { ScreenProps } from "../types";

interface TaskListProps extends ScreenProps {
    listId: number;
    onDelete: (listHeaderId: number) => void;
    onUpdate: (listHeader: ListHeaderProps) => void;
}
interface ListHeaderProps {
    id: number;
    name: string;
    iconType: IconType;
    backgroundColor: string,
    textColor: string,
    iconColor: string,
}

interface ListProps extends ListHeaderProps {
    tasks: TaskProps[];
}

export type { TaskListProps, ListHeaderProps, ListProps }