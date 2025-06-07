import type { ListHeaderProps, ListProps } from "../screens/task-list/types";
import type { DeleteListApiProps, GetListApiProps, JwtApiProps, SaveListApiProps, UpdateListApiProps } from "./types";

const getListHeaders = async (props: JwtApiProps): Promise<ListHeaderProps[]> => {
    const { token, setToken } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/list/getListHeaders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const getList = async (props: GetListApiProps): Promise<ListProps> => {
    const { token, setToken, listId } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/list/getList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(listId),
    });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error(data?.message);
    }
    return data;
}

const saveList = async (props: SaveListApiProps): Promise<ListHeaderProps> => {
    const { token, setToken, formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/list/saveList", {
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

const updateList = async (props: UpdateListApiProps): Promise<ListProps> => {
    const { token, setToken, formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/list/updateList", {
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

const deleteList = async (props: DeleteListApiProps): Promise<void> => {
    const { token, setToken, listId } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/list/deleteList", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
        body: JSON.stringify(listId),
    });
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error();
    }
}

export { getListHeaders, getList, saveList, updateList, deleteList }
