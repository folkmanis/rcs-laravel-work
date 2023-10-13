import { IconButton } from "@/Components/IconButton";
import { InputError } from "@/Components/InputError";
import { TextArea } from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, HTMLAttributes } from "react";

export interface NewCommentProps {
    messageId: number;
}

export function NewComment({
    className,
    messageId,
}: NewCommentProps & HTMLAttributes<HTMLDivElement>) {
    const { data, setData, post, errors, reset } = useForm({
        text: "",
    });

    const submitComment: FormEventHandler = (event) => {
        event.preventDefault();
        console.log(data);
        post(route("messages.comments.store", { message: messageId }), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className={className}>
            <form onSubmit={submitComment} className="w-full flex gap-2">
                <TextArea
                    value={data.text}
                    className="flex-1"
                    id="text"
                    name="text"
                    rows={1}
                    onChange={(e) => setData("text", e.target.value)}
                />
                <InputError message={errors.text} className="mt-2" />
                <IconButton className="flex-0" mini disabled={!data.text}>
                    send
                </IconButton>
            </form>
        </div>
    );
}
