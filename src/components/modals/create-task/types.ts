import type { TaskProps } from "../../task/types";
import type { ModalProps } from "../types";

interface CreateTaskProps extends ModalProps {
    listId: number;
    onSave: (task: TaskProps) => void;
}

export type { CreateTaskProps }