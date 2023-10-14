import { HTMLAttributes } from "react";
import { CommentEdit } from "./CommentEdit";

export interface NewCommentProps {
    messageId: number;
}

export function NewComment({
    className,
    messageId,
}: NewCommentProps & HTMLAttributes<HTMLDivElement>) {
    return <CommentEdit className={className} messageId={messageId} />;
}
