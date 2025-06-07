import type { IconProps } from "./types";

const Icon = (props: IconProps) => {
    const { className, color, type } = { ...props }
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            style={{ fill: color }}
        >
            <path d={type}></path>
        </svg>
    );
}

export default Icon;