import React, { createContext } from 'react';
import type { ContextProviderProps, SettingsContextProps } from './types';

const SettingsContext = createContext<SettingsContextProps>({
    theme: 'light',
    setTheme: () => { },
    toast: true,
    setToast: () => { }
});

const SettingsContextProvider = (props: ContextProviderProps) => {
    const { children } = { ...props }
    const [theme, setTheme] = React.useState<'light' | 'dark'>(
        () => {
            try {
                const item = localStorage.getItem("theme");
                if (item === undefined || item === null)
                    throw new Error();
                return JSON.parse(item);
            } catch (e: unknown) {
                return 'light';
            }
        }
    );
    const [toast, setToast] = React.useState<boolean>(
        () => {
            try {
                const item = localStorage.getItem("toast");
                if (item === undefined || item === null)
                    throw new Error();
                return JSON.parse(item);
            } catch (e: unknown) {
                return true;
            }
        }
    );

    React.useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);
    React.useEffect(() => {
        localStorage.setItem("toast", JSON.stringify(toast));
    }, [toast]);

    return (
        <SettingsContext.Provider value={{ theme, setTheme, toast, setToast }}>
            {children}
        </SettingsContext.Provider>
    )
}

export { SettingsContextProvider, SettingsContext }