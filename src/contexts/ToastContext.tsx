import React, { createContext, useContext } from 'react';
import type { ContextProviderProps, ToastContextProps, } from './types';
import type { ToastProps } from '../components/toast/types';
import { Toast } from '../components/toast';
import { AnimatePresence, motion } from 'motion/react';
import { SettingsContext } from './SettingsContext';

const ToastContext = createContext<ToastContextProps>({ 
    openToast: () => { }
});

interface ToastInnerProps {
    id: number;
    component: ToastProps;
    timeout: number;
}

const ToastContextProvider = (props: ContextProviderProps) => {
    const { children } = { ...props }
    const { toast = true } = useContext(SettingsContext) || {};
    const [toasts, setToasts] = React.useState<ToastInnerProps[]>([]);

    const openToast = (toast: ToastProps, timeout = 5000) => {
        const id = Date.now();
        setToasts(prevToasts => [{ id, component: toast, timeout: timeout }, ...prevToasts])
    }

    const closeToast = (toastId: number) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== toastId));
    }

    return (
        <ToastContext.Provider value={{ openToast }}>
            {children}
            <ul className="fixed bottom-2 right-2 flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((toastElem) => (
                        <motion.li key={toastElem.id} initial={{ opacity: 0, x: 100, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }} exit={{ opacity: 0, x: 100, height: 0, margin: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
                            <Toast
                                key={toastElem.id}
                                type={toastElem.component.type}
                                title={toastElem.component.title}
                                text={toastElem.component.text}
                                timeout={toastElem.timeout}
                                onClose={() => closeToast(toastElem.id)}   
                                onClick={() => closeToast(toastElem.id)}
                                visible={toast}
                            />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </ToastContext.Provider>
    )
}

export { ToastContextProvider, ToastContext }