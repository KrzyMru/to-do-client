import type { HTMLInputTypeAttribute } from "react";

interface InputProps {
    type: HTMLInputTypeAttribute;
    id?: string;
    ref?: React.RefCallback<HTMLElement>;
    textarea?: boolean;
    value?: string | number;
    label?: string;
    name?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    onChange?: React.ChangeEventHandler<HTMLElement>;
}

export type { InputProps }