import type { ListProps } from "../../../screens/task-list/types";
import type { ModalProps } from "../types";

interface UpdateListProps extends ModalProps {
    list: ListProps;
    onUpdate: (list: ListProps) => void;
}

export type { UpdateListProps }