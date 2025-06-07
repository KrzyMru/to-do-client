import type { ListHeaderProps } from "../../screens/task-list/types";

interface TaskComponentProps {
    task: TaskProps;
    onDelete: (taskId: number) => void;
    onUpdate: (task: TaskProps) => void;
    onToggle: (task: TaskProps) => void;
}
interface TaskProps {
    id: number;
    name: string;
    description: string;
    created: string;
    due: string;
    completed: boolean;
    listHeader: ListHeaderProps;
}
type TaskStatus = "Pending" | "Overdue" | "Completed";

export type { TaskProps, TaskComponentProps, TaskStatus }