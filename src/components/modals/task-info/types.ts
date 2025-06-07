import type { TaskProps } from "../../task/types";
import type { ModalProps } from "../types";

interface TaskInfoProps extends ModalProps {
    task: TaskProps;
}

export type { TaskInfoProps }