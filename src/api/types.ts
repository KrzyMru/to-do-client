import { IconType } from "../components/icon/types";

interface JwtApiProps {
    token: string;
    setToken: (token: string) => void;
}

interface SignUpApiProps {
    formData: SignUpFormData
}
interface SignInApiProps {
    formData: SignInFormData
}

interface GetListApiProps extends JwtApiProps {
    listId: number
}
interface DeleteListApiProps extends JwtApiProps {
    listId: number
}
interface SaveListApiProps extends JwtApiProps {
    formData: CreateListFormData
}
interface UpdateListApiProps extends JwtApiProps {
    formData: UpdateListFormData
}

interface GetTodayTasks extends JwtApiProps {
    timezone: string;
}
interface GetDateTasksApiProps extends JwtApiProps {
    date: string;
    timezone: string;
}
interface GetTaskCountsApiProps extends JwtApiProps {
    startDate: string,
    endDate: string,
    timezone: string
}
interface SaveTaskApiProps extends JwtApiProps {
    formData: CreateTaskFormData
}
interface UpdateTaskApiProps extends JwtApiProps {
    formData: UpdateTaskFormData
}
interface DeleteTaskApiProps extends JwtApiProps {
    taskId: number
}
interface ToggleTaskApiProps extends JwtApiProps {
    taskId: number
}

interface SignInFormData {
    email: string
    password: string
}
interface SignUpFormData {
    email: string
    password: string
}
interface CreateListFormData {
    name: string,
    iconType: IconType,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
}
interface UpdateListFormData {
    id: number;
    name: string,
    iconType: IconType,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
}
interface CreateTaskFormData {
    listId: number;
    name: string,
    description: string,
    due: string,
    created: string,
}
interface UpdateTaskFormData {
    id: number;
    name: string,
    description: string,
    due: string,
}

export type {
    JwtApiProps,
    SignUpApiProps, SignInApiProps,
    GetListApiProps, DeleteListApiProps, SaveListApiProps, UpdateListApiProps,
    GetTodayTasks, GetDateTasksApiProps, GetTaskCountsApiProps, SaveTaskApiProps, UpdateTaskApiProps, DeleteTaskApiProps, ToggleTaskApiProps,
    SignInFormData, SignUpFormData, CreateListFormData, UpdateListFormData, CreateTaskFormData, UpdateTaskFormData,
}