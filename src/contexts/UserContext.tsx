import React, { createContext } from 'react';
import type { ContextProviderProps, UserContextProps } from './types';

const UserContext = createContext<UserContextProps>({
    token: "",
    setToken: () => { }
});

const UserContextProvider = (props: ContextProviderProps) => {
    const { children } = { ...props }
    const [token, setToken] = React.useState<string>(
        () => {
            const item = localStorage.getItem("token");
            return (item === undefined || item === null) ? "" : JSON.parse(item);
        }
    );

    React.useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }