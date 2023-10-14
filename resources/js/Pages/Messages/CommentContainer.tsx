import { PageProps } from "@/types";
import { Comment } from "@/types/comment";
import { router, usePage } from "@inertiajs/react";
import { HTMLAttributes, useState } from "react";
import { MessageMenu } from "./MessageMenu";
import { Votes } from "./Votes";
import { CommentEdit } from "./CommentEdit";
import { CreationTime } from "./CreationTime";

export interface CommentContainerProps {
    comment: Comment;
    messageId: number;
}

export function CommentContainer({
    comment,
    messageId,
    className,
    ...props
}: CommentContainerProps & HTMLAttributes<HTMLDivElement>) {
    const { auth } = usePage<PageProps>().props;
    const [editing, setEditing] = useState(false);

    const onDeleteComment = () => {
        router.delete(route("comments.destroy", { comment: comment.id }), {
            preserveScroll: true,
        });
    };

    return (
        <div className={className} {...props}>
            <div className="p-2 flex text-sm items-baseline">
                <span className="font-bold">{comment.user.name}</span>

                <CreationTime
                    createdAt={comment.created_at}
                    updatedAt={comment.updated_at}
                />
                <MessageMenu
                    show={comment.user_id === auth.user.id && !editing}
                    onSetEditing={() => setEditing(true)}
                    onDelete={onDeleteComment}
                />
            </div>

            {editing ? (
                <CommentEdit
                    comment={comment}
                    className="px-2"
                    onClose={() => setEditing(false)}
                />
            ) : (
                <>
                    <p className="px-2">{comment.text}</p>
                    <div className="p-2">
                        <Votes
                            votesSum={
                                +(comment["votes_sum_votablesrating"] ?? 0)
                            }
                            votes={comment.votes}
                            actionRoute={route("comments.vote", {
                                comment: comment.id,
                            })}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
