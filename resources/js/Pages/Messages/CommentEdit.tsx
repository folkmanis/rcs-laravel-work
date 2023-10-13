import { IconButton } from "@/Components/IconButton";
import { InputError } from "@/Components/InputError";
import { PhotoSelectDialog } from "@/Components/PhotoSelectDialog";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { TextArea } from "@/Components/TextArea";
import { Comment, Message, Photo } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    FormEventHandler,
    HTMLAttributes,
    Dispatch,
    useState,
    useEffect,
} from "react";

export interface CommentEditProps {
    messageId: number;
    comment?: Comment;
    onClose?: Dispatch<void>;
    page?: number;
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
        } else {
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
