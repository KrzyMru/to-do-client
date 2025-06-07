import type { InputProps } from './types';

const Input = (props: InputProps) => {
    const { type, disabled, error, helperText, label, name, onChange, placeholder, ref, required, textarea, autoComplete, autoFocus, value, id } = { ...props }

    return (
        <div className="p-1">
            {label && <label htmlFor={id} className={`${error ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'} text-base lg:text-xl [transition:font-size_350ms,color_350ms]`}>{label}</label>}
            {
                textarea ?
                <textarea
                    className={`rounded-md shadow-sm p-2 lg:p-3 w-full text-base lg:text-xl bg-stone-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:[color-scheme:dark] focus:outline-2 ${error ? "focus-visible:outline-red-300 dark:focus-visible:outline-red-400" : "focus-visible:outline-gray-400"} transition-[color_background-color_font-size_padding_outline-color] duration-350 focus:duration-0 min-h-[150px] max-h-[400px]`}
                    ref={ref}
                    id={id}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
                :
                <input
                    className={`rounded-md shadow-sm p-2 lg:p-3 w-full text-base lg:text-xl bg-stone-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:[color-scheme:dark] focus:outline-2 ${error ? "focus-visible:outline-red-300 dark:focus-visible:outline-red-400" : "focus-visible:outline-gray-400"} transition-[color_background-color_font-size_padding_outline-color] focus:duration-0 duration-350`}
                    ref={ref}
                    id={id}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
            }
            <p className={`text-sm lg:text-lg ${error ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400 [transition:font-size_350ms,color_350ms]'}`}>{helperText}</p>
        </div>
    );
}

export default Input;