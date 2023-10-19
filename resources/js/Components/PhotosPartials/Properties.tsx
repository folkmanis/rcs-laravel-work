import { Photo } from "@/types";
import { Caption } from "./Caption";
import { IconButton } from "../IconButton";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { useState } from "react";
import { router } from "@inertiajs/react";

interface PropertiesProps {
    photo: Photo;
    className?: string;
    editable?: boolean;
}

export function Properties({
    photo,
    className = "",
    editable,
}: PropertiesProps) {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const onDelete = () => {
        setDeleteConfirmation(false);
        router.delete(route("photos.destroy", photo.id));
    };
    return (
        <>
            <div
                className={
                    "mt-2 grow shrink overflow-hidden flex flex-col text-sm " +
                    className
                }
            >
                <h3 className="font-bold overflow-hidden text-ellipsis">
                    {photo.name}
                </h3>
                <Caption photo={photo} editable={editable} />
                {editable && (
                    <div className="mt-auto">
                        <IconButton
                            mini
                            onClick={() => setDeleteConfirmation(true)}
                        >
                            delete
                        </IconButton>
                    </div>
                )}
            </div>
            <DeleteConfirmationDialog
                onCancel={() => setDeleteConfirmation(false)}
                onConfirm={onDelete}
                show={deleteConfirmation}
            />
        </>
    );
}
