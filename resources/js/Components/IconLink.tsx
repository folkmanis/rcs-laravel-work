import { InertiaLinkProps, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Ripple } from "./Ripple";

interface IconLinkProperties {
    mini?: boolean;
}

export function IconLink({
    children,
    className = "",
    disabled,
    href,
    mini = false,
    ...props
}: PropsWithChildren<InertiaLinkProps & IconLinkProperties>) {
    const buttonClass =
        `relative w-[34px] h-[34px] inline-flex items-center justify-center 
         bg-white text-gray-700 
         shadow-sm hover:bg-gray-50 
         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
         disabled:opacity-25 
         transition ease-in-out duration-150 
         ${disabled && "opacity-25"} 
            ${
                !mini
                    ? "w-[34px] h-[34px] border border-gray-300  "
                    : "w-[24px] h-[24px] "
            }` + className;

    return (
        <Link
            href={href}
            disabled={disabled}
            className={buttonClass}
            {...props}
        >
            <i className="material-symbols-outlined">{children}</i>
            <Ripple />
        </Link>
    );
}
