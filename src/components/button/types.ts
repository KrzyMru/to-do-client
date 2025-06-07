interface ButtonProps {
    type?: "button" | "reset" | "submit";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    title?: string;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export type { ButtonProps }