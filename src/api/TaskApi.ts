import type { TaskProps } from "../components/task/types";
import type { TaskCounts } from "../screens/calendar/types";
import type { DeleteTaskApiProps, GetDateTasksApiProps, GetTaskCountsApiProps, GetTodayTasks, SaveTaskApiProps, ToggleTaskApiProps, UpdateTaskApiProps } from "./types";

const getTodayTasks = async (props: GetTodayTasks): Promise<TaskProps[]> => {
    const { token, setToken, timezone } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/getTodayTasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(timezone),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const getDateTasks = async (props: GetDateTasksApiProps): Promise<TaskProps[]> => {
    const { token, setToken, date, timezone } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/getDateTasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify({date, timezone}),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;    
}

const getTaskCounts = async (props: GetTaskCountsApiProps): Promise<Record<string, TaskCounts>> => {
    const { token, setToken, startDate, endDate, timezone } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/getTaskCounts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify({ startDate, endDate, timezone }),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const saveTask = async (props: SaveTaskApiProps): Promise<TaskProps> => {
    const { token, setToken, formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/saveTask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const deleteTask = async (props: DeleteTaskApiProps): Promise<void> => {
    const { token, setToken, taskId } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/deleteTask", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(taskId),
    });
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error();
    }
}

const updateTask = async (props: UpdateTaskApiProps): Promise<TaskProps> => {
    const { token, setToken, formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/updateTask", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const toggleTask = async (props: ToggleTaskApiProps): Promise<TaskProps> => {
    const { token, setToken, taskId } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/task/toggleTask", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(taskId),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

export { getTodayTasks, saveTask, deleteTask, updateTask, toggleTask, getDateTasks, getTaskCounts }
