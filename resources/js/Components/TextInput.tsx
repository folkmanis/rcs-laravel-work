import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";

export interface TextInputHandle {
    focus: () => void;
    reset: () => void;
}

export const TextInput = forwardRef<
    TextInputHandle,
    InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }
>(({ type = "text", className = "", isFocused = false, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
        reset: () => {
            if (localRef.current !== null) {
                localRef.current.value = "";
            }
        },
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                // eslint-disable-next-line operator-linebreak
                "border-gray-300 focus:border-green-600 focus:ring-green-600 shadow-sm " +
                className
            }
            ref={localRef}
        />
    );
});
