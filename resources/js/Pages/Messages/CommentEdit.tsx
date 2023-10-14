import { IconButton } from "@/Components/IconButton";
import { InputError } from "@/Components/InputError";
import { TextArea } from "@/Components/TextArea";
import { Comment } from "@/types";
import { useForm } from "@inertiajs/react";
import { Dispatch, FormEventHandler, HTMLAttributes } from "react";

export interface CommentEditProps {
    messageId?: number;
    comment?: Comment;
    onClose?: Dispatch<void>;
}

export function CommentEdit({
    messageId,
    comment,
    onClose = () => {},
    ...props
}: CommentEditProps & HTMLAttributes<HTMLDivElement>) {
    const { data, setData, patch, post, reset, errors, clearErrors } = useForm({
        text: comment?.text || "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (comment) {
            patch(
                route("comments.update", {
                    comment: comment.id,
                }),
                {
                    onSuccess: () => {
                        onClose();
                        reset();
                    },
                    preserveScroll: true,
                }
            );
        } else if (messageId !== undefined) {
            post(
                route("messages.comments.store", {
                    message: messageId,
                }),
                {
                    onSuccess: () => reset(),
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <div {...props}>
            <form onSubmit={submit} className="w-full flex gap-2">
                <div className="flex-1">
                    <TextArea
                        value={data.text}
                        id="text"
                        name="text"
                        rows={1}
                        onChange={(e) => setData("text", e.target.value)}
                        className="w-full"
                    />
                    <InputError message={errors.text} className="mt-2" />
                </div>
                {comment && (
                    <IconButton
                        className="flex-0"
                        mini
                        disabled={!data.text}
                        onClick={(e) => {
                            e.preventDefault();
                            reset();
                            clearErrors();
                            onClose();
                        }}
                    >
                        cancel
                    </IconButton>
                )}
                <IconButton className="flex-0" mini disabled={!data.text}>
                    send
                </IconButton>
            </form>
        </div>
    );
}
