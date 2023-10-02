import { InputError } from "@/Components/InputError";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { TextArea } from "@/Components/TextArea";
import { Message, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import "dayjs/locale/lv";
import relativeTime from "dayjs/plugin/relativeTime";
import { FormEventHandler, useState } from "react";
import { MessageMenu } from "./MessageMenu";
import { Thumbnail } from "@/Pages/Photos/Partials/Thumbnail";

dayjs.extend(relativeTime);
dayjs.locale("lv");

export interface MessageProps {
    message: Message;
}

export function MessageContainer({ message }: MessageProps) {
    const { auth } = usePage<PageProps>().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, reset, errors, clearErrors } = useForm({
        text: message.text,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("messages.update", message.id), {
            onSuccess: () => {
                setEditing(false);
            },
        });
    };

    const photos = message.photos.map((photo, idx) => {
        return <Thumbnail key={idx} id={photo.id} />;
    });

    return (
        <>
            <div className="mt-4  bg-white border-gray-300 shadow">
                <div className="p-2 flex text-sm">
                    <span className="font-bold">{message.user.name}</span>
                    <span className="ml-2">
                        {dayjs(message.created_at).fromNow()}
                    </span>
                    <MessageMenu
                        show={message.user_id === auth.user.id}
                        messageId={message.id}
                        onSetEditing={() => setEditing(true)}
                    />
                </div>

                <div className="mx-2 flex flex-wrap gap-1">{photos}</div>

                {editing ? (
                    <div className="p-2">
                        <form onSubmit={submit}>
                            <TextArea
                                value={data.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                                className="block w-full"
                            />
                            <InputError
                                message={errors.text}
                                className="mt-2"
                            />
                            <div className="mt-4 space-x-2">
                                <PrimaryButton>Saglabāt</PrimaryButton>
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        reset();
                                        clearErrors();
                                    }}
                                >
                                    Atcelt
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p className="p-2">{message.text}</p>
                )}
                {message.created_at !== message.updated_at && (
                    <div className="p-2 flex text-sm">
                        <span>
                            Labots {dayjs(message.updated_at).fromNow()}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
