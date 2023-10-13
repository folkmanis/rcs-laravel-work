import { ButtonHTMLAttributes } from "react";
import { Ripple } from "./Ripple";

export function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `relative inline-flex items-center px-4 py-2 bg-red-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
            <Ripple />
        </button>
    );
}
