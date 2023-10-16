import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Ripple } from "./Ripple";

export interface IconButtonProps {
    filled?: boolean;
    mini?: boolean;
    primary?: boolean;
}

export function IconButton({
    children,
    className = "",
    filled = false,
    mini = false,
    primary = false,
    ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> &
    IconButtonProps) {
    const style = filled
        ? {
              fontVariationSettings:
                  '"FILL" 1, "wght" 300, "GRAD" 0, "opsz" 24',
          }
        : {};

    return (
        <button
            className={
                `relative inline-flex items-center justify-center 
                shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                disabled:opacity-25 
                transition ease-in-out duration-150 
                ${props.disabled ? "opacity-25 " : ""} 
                ${
                    !mini
                        ? "w-[34px] h-[34px] border border-gray-300  "
                        : "w-[24px] h-[24px] "
                }
                ${
                    primary
                        ? "bg-green-700 text-white hover:bg-green-600 "
                        : "bg-white text-gray-700 hover:bg-gray-50 "
                }` + className
            }
            {...props}
        >
            <i className="material-symbols-outlined " style={style}>
                {children}
            </i>
            <Ripple />
        </button>
    );
}
