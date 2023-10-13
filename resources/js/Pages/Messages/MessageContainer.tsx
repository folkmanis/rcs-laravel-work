import { Message, PageProps } from "@/types";
import { CommentContainer } from "./CommentContainer";
import { NewComment } from "./NewComment";
import { HTMLAttributes, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { MessageMenu } from "./MessageMenu";
import { Thumbnail } from "@/Components/PhotosPartials/Thumbnail";
import { MessageEdit } from "./MessageEdit";
import { Votes } from "./Votes";

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
    const [messagePhotos, setMessagePhotos] = useState<string[]>(
        message.photos?.map(({ id }) => id) || []
    );

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

                <span className="ml-2 text-xs italic">
                    {message.created_at !== message.updated_at
                        ? "labots " + dayjs(message.updated_at).fromNow()
                        : dayjs(message.created_at).fromNow()}
                </span>
                <MessageMenu
                    show={message.user_id === auth.user.id && !editing}
                    onSetEditing={() => setEditing(true)}
                    onDelete={onDeleteMessage}
                />
            </div>

            <div className="px-2 flex flex-wrap gap-1">
                {messagePhotos.map((photoId) => {
                    return <Thumbnail key={photoId} id={photoId} />;
                })}
            </div>

            {editing ? (
                <MessageEdit
                    className="p-2"
                    message={message}
                    onClose={() => setEditing(false)}
                    onPhotoSelectionUpdate={setMessagePhotos}
                />
            ) : (
                <>
                    <p className="px-2">{message.text}</p>
                    <div className="p-2">
                        <Votes
                            votesSum={
                                +(message["votes_sum_votablesrating"] ?? 0)
                            }
                            votes={message.votes}
                            route={route("messages.vote", {
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
                <NewComment messageId={message.id} />
            </div>
        </div>
    );
}
