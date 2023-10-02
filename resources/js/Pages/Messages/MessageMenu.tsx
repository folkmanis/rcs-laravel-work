import DeleteConfirmationDialog from "@/Components/DeleteConfirmationDialog";
import { Dropdown } from "@/Components/Dropdown";
import { router } from "@inertiajs/react";
import { useState } from "react";

export interface MessageMenuProps {
    show: boolean;
    onSetEditing: (s: boolean) => void;
    messageId: number;
}

export function MessageMenu({
    show,
    onSetEditing,
    messageId,
}: MessageMenuProps) {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    if (!show) {
        return <></>;
    }
    return (
        <>
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
                            onClick={() => onSetEditing(true)}
                            className="block w-full text-sm text-left leading-5 text-gray-700 px-4 py-2 hover:bg-green-100 focus:bg-green-100 transition duration-150 ease-in-out"
                        >
                            Labot
                        </Dropdown.Button>
                        <Dropdown.Link
                            href={route("messages.photo.edit", messageId)}
                            // href={`/messages/${messageId}/photo/edit`}
                        >
                            Pievienot foto
                        </Dropdown.Link>
                        <Dropdown.Button
                            onClick={() => setDeleteConfirmation(true)}
                        >
                            Dzēst
                        </Dropdown.Button>
                    </Dropdown.Content>
                </Dropdown>
            </span>
            <DeleteConfirmationDialog
                show={deleteConfirmation}
                onCancel={() => setDeleteConfirmation(false)}
                onConfirm={() =>
                    router.delete(route("messages.destroy", messageId))
                }
            />
        </>
    );
}
