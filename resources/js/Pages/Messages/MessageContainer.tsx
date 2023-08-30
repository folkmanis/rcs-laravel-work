import { PrimaryButton } from "@/Components/PrimaryButton";
import { Message, PageProps } from "@/types";
import { usePage, useForm, Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import "dayjs/locale/lv";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dropdown } from "@/Components/Dropdown";
import { FormEventHandler, useState } from "react";
import { TextArea } from "@/Components/TextArea";
import { InputError } from "@/Components/InputError";
import { Modal } from "@/Components/Modal";
import { DangerButton } from "@/Components/DangerButton";
import { SecondaryButton } from "@/Components/SecondaryButton";

dayjs.extend(relativeTime);
dayjs.locale("lv");

export interface MessageProps {
    message: Message;
}

export function MessageContainer({ message }: MessageProps) {
    const { auth } = usePage<PageProps>().props;
    const [editing, setEditing] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
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

    return (
        <>
            <div className="mt-4  bg-white border-gray-300 shadow-sm">
                <div className="p-2 flex text-sm">
                    <span className="font-bold">{message.user.name}</span>
                    <span className="ml-2">
                        {dayjs(message.created_at).fromNow()}
                    </span>
                    {message.user_id === auth.user.id && (
                        <span className="ml-auto">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Button
                                        onClick={() => setEditing(true)}
                                        className="block w-full text-sm text-left leading-5 text-gray-700 px-4 py-2 hover:bg-green-100 focus:bg-green-100 transition duration-150 ease-in-out"
                                    >
                                        Labot
                                    </Dropdown.Button>
                                    <Dropdown.Button
                                        onClick={() =>
                                            setDeleteConfirmation(true)
                                        }
                                        disabled={editing === true}
                                    >
                                        Dzēst
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                        </span>
                    )}
                </div>
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
            <Modal
                show={deleteConfirmation}
                onClose={() => setDeleteConfirmation(false)}
                maxWidth="sm"
            >
                <Modal.Title>Izdzēst ziņojumu</Modal.Title>

                <p className="text-center">Tiešām vēlaties dzēst ziņojumu?</p>
                <div>
                    <Modal.Actions>
                        <DangerButton
                            onClick={() =>
                                router.delete(
                                    route("messages.destroy", message.id)
                                )
                            }
                        >
                            Dzēst!
                        </DangerButton>
                        <SecondaryButton
                            className="ml-4"
                            onClick={() => setDeleteConfirmation(false)}
                        >
                            Atcelt
                        </SecondaryButton>
                    </Modal.Actions>
                </div>
            </Modal>
        </>
    );
}
