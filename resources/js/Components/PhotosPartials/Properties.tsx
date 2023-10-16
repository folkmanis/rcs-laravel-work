import { Photo } from "@/types";
import { Link } from "@inertiajs/react";
import { Caption } from "./Caption";
import { IconLink } from "../IconLink";

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
    return (
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
            {editable ? (
                <div className="mt-auto">
                    <IconLink
                        href={route("photos.destroy", photo.id)}
                        method="delete"
                        as="button"
                        mini
                    >
                        delete
                    </IconLink>
                </div>
            ) : null}
        </div>
    );
}
