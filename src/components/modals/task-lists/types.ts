import type { ListHeaderProps } from "../../../screens/task-list/types";
import type { ModalProps } from "../types";

interface TaskListsProps extends ModalProps {
    listHeaders: ListHeaderProps[];
}

export type { TaskListsProps }