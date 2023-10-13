import { InputHTMLAttributes, forwardRef } from "react";

export const Checkbox = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
    return (
        <input
            {...props}
            type="checkbox"
            ref={ref}
            className={
                "rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-600 " +
                className
            }
        />
    );
});
