import { Message, PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { HTMLAttributes, useState } from "react";
import { CommentContainer } from "./CommentContainer";
import { CreationTime } from "./CreationTime";
import { MessageEdit } from "./MessageEdit";
import { MessageMenu } from "./MessageMenu";
import { MessagePhotoGallery } from "./MessagePhotoGallery";
import { Votes } from "./Votes";
import { CommentEdit } from "./CommentEdit";

export interface MessageProps {
    message: Message;
}

export function MessageContainer({
    message,
    className = "",
    ...props
}: MessageProps & HTMLAttributes<HTMLDivElement>) {
    const { auth } = usePage<PageProps>().props;
    const [editing, setEditing] = useState(false);

    const onDeleteMessage = () => {
        router.delete(route("messages.destroy", message.id));
    };

    return (
        <div
            className={className + "mt-4 bg-white border-gray-300 shadow"}
            {...props}
        >
            <div className="p-2 flex text-sm items-baseline">
                <span className="font-bold">{message.user.name}</span>

                <CreationTime
                    createdAt={message.created_at}
                    updatedAt={message.updated_at}
                />
                <MessageMenu
                    show={message.user_id === auth.user.id && !editing}
                    onSetEditing={() => setEditing(true)}
                    onDelete={onDeleteMessage}
                />
            </div>

            {editing ? (
                <MessageEdit
                    className="p-2"
                    message={message}
                    onClose={() => setEditing(false)}
                />
            ) : (
                <>
                    {message.photos.length > 0 && (
                        <div className="mb-2">
                            <MessagePhotoGallery
                                messagePhotos={message.photos}
                            />
                        </div>
                    )}
                    <p className="px-2">{message.text}</p>
                    <div className="p-2">
                        <Votes
                            votesSum={
                                +(message["votes_sum_votablesrating"] ?? 0)
                            }
                            votes={message.votes}
                            actionRoute={route("messages.vote", {
                                message: message.id,
                            })}
                        />
                    </div>
                </>
            )}

            <div className="p-1 sm:p-2">
                {message.comments.map((comment) => (
                    <CommentContainer
                        key={comment.id}
                        comment={comment}
                        messageId={message.id}
                        className="border-gray-300 shadow mt-2 bg-gray-50"
                    />
                ))}
                <CommentEdit className="mt-2" messageId={message.id} />
            </div>
        </div>
    );
}
