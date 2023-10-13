import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Ripple } from "./Ripple";

export function IconButton({
    children,
    className = "",
    filled,
    mini,
    ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    filled?: boolean;
    mini?: boolean;
}) {
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
                bg-white text-gray-700 
                shadow-sm hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                disabled:opacity-25 
                transition ease-in-out duration-150 
                ${props.disabled ? "opacity-25 " : ""} 
                ${
                    !mini
                        ? "w-[34px] h-[34px] border border-gray-300  "
                        : "w-[24px] h-[24px] "
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
