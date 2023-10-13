import { InertiaLinkProps, Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Ripple } from "./Ripple";

export function IconLink({
    children,
    className = "",
    disabled,
    href,
    ...props
}: PropsWithChildren<InertiaLinkProps>) {
    const buttonClass =
        `relative w-[34px] h-[34px] inline-flex items-center justify-center 
    bg-white border border-gray-300  text-gray-700 
    shadow-sm hover:bg-gray-50 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
    disabled:opacity-25 
    transition ease-in-out duration-150 
    ${disabled && "opacity-25"} ` + className;

    return (
        <Link
            href={href}
            disabled={disabled}
            className={buttonClass}
            {...props}
        >
            <span className="material-symbols-outlined">{children}</span>
            <Ripple />
        </Link>
    );
}
