import type { JwtApiProps, SignInApiProps, SignUpApiProps } from "./types";

const signUp = async (props: SignUpApiProps): Promise<void> => {
    const { formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/auth/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message);
    }
}

const signIn = async (props: SignInApiProps): Promise<string> => {
    const { formData } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/auth/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);
    return data?.token;
}

const deleteAccount = async (props: JwtApiProps): Promise<void> => {
    const { token, setToken } = { ...props };
    const response = await fetch("https://to-do-server.azurewebsites.net/api/auth/deleteAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
    });
    if (!response.ok) {
        if (response.status === 401)
            setToken("");
        throw new Error();
    }
}

export { signUp, signIn, deleteAccount }
