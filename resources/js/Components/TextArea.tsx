import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    TextareaHTMLAttributes,
} from "react";

export const TextArea = forwardRef(function TextInput(
    {
        className = "",
        isFocused = false,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            className={
                "border-gray-300 focus:border-green-600 focus:ring-green-600 shadow-sm " +
                className
            }
            ref={localRef}
        ></textarea>
    );
});
