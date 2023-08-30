import { InputHTMLAttributes } from "react";

export function Checkbox({
    className = "",
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-600 " +
                className
            }
        />
    );
}
