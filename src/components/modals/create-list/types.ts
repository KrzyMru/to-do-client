import type { ListHeaderProps } from "../../../screens/task-list/types";
import type { ModalProps } from "../types";

interface CreateListProps extends ModalProps {
    onSave: (list: ListHeaderProps) => void;
}

export type { CreateListProps }