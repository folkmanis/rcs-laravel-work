import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";

export const TextInput = forwardRef(
    (
        {
            type = "text",
            className = "",
            isFocused = false,
            ...props
        }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
        ref
    ) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => ({
            focus: () => localRef.current?.focus(),
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
    }
);
