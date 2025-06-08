import type { ToastProps } from "../components/toast/types";
import type { Screen } from "../screens/types";

interface ScreenContextProps {
    screen: Screen | number;
    setScreen: (screen: Screen | number) => void;
}

interface UserContextProps {
    token: string;
    setToken: (token: string) => void;
}

interface SettingsContextProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    toast: boolean;
    setToast: (toast: boolean) => void;
}

interface ToastContextProps {
    openToast: (toast: ToastProps, timeout?: number) => void;
}

interface ContextProviderProps {
    children: React.ReactNode;
}

export type { ContextProviderProps, ScreenContextProps, UserContextProps, ToastContextProps, SettingsContextProps }