import DeleteConfirmationDialog from "@/Components/DeleteConfirmationDialog";
import { Dropdown } from "@/Components/Dropdown";
import { IconButton } from "@/Components/IconButton";
import { Dispatch, useState } from "react";

export interface MessageMenuProps {
    show: boolean;
    onSetEditing: Dispatch<boolean>;
    onDelete: Dispatch<void>;
}

export function MessageMenu({
    show,
    onSetEditing,
    onDelete,
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
                        <IconButton mini className="text-gray-400">
                            more_horiz
                        </IconButton>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Button
                            onClick={() => onSetEditing(true)}
                            className="block w-full text-sm text-left leading-5 text-gray-700 px-4 py-2 hover:bg-green-100 focus:bg-green-100 transition duration-150 ease-in-out"
                        >
                            Labot
                        </Dropdown.Button>
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
                onConfirm={() => {
                    setDeleteConfirmation(false);
                    onDelete();
                }}
            />
        </>
    );
}
