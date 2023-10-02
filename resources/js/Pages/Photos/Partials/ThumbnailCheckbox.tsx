import { Checkbox } from "@/Components/Checkbox";
import { InputHTMLAttributes } from "react";

export function ThumbnailCheckbox({
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Checkbox
            {...props}
            className="absolute top-1 left-1 opacity-50 checked:opacity-100"
        />
    );
}
