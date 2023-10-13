import { ButtonHTMLAttributes } from "react";
import { Ripple } from "./Ripple";

export function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                "relative inline-flex items-center justify-center px-4 py-2 bg-green-700 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 focus:bg-green-600 " +
                "active:bg-green-900 " +
                "focus:outline-none " +
                "focus:ring-2 " +
                "focus:ring-green-500 focus:ring-offset-2 " +
                "transition ease-in-out duration-150 " +
                (disabled ? "opacity-25 " : "") +
                className
            }
            disabled={disabled}
        >
            {children}
            <Ripple />
        </button>
    );
}
