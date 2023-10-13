import { Checkbox } from "@/Components/Checkbox";
import { InputHTMLAttributes, forwardRef, useRef } from "react";

export const ThumbnailCheckbox = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
    return (
        <Checkbox
            {...props}
            ref={ref}
            className="absolute top-1 left-1 opacity-50 checked:opacity-100"
        />
    );
});
