import { Photo } from "@/types";
import { Link } from "@inertiajs/react";
import { Caption } from "./Caption";

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
                    <Link
                        href={route("photos.destroy", photo.id)}
                        method="delete"
                        as="button"
                        className="w-[24px] h-[24px] bg-white hover:bg-green-200 text-gray-700  shadow-sm rounded-full disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        <span className="material-symbols-outlined text-base">
                            delete
                        </span>
                    </Link>
                </div>
            ) : null}
        </div>
    );
}
