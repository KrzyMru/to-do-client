import type { TaskProps } from "../../task/types";
import type { ModalProps } from "../types";

interface UpdateTaskProps extends ModalProps {
    task: TaskProps;
    onUpdate: (task: TaskProps) => void;
}

export type { UpdateTaskProps }