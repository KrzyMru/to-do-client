interface ToastProps {
    type: 'info' | 'success' | 'error';
    title: string;
    text?: string;
}

interface ToastComponentProps extends ToastProps {
    timeout: number;
    onClose: () => void;
    onClick: () => void;
    visible: boolean;
}

export type { ToastProps, ToastComponentProps }