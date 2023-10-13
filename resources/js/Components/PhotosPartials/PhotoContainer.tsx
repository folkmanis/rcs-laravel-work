import { Photo } from "@/types";
import { Properties } from "./Properties";
import { Thumbnail } from "./Thumbnail";

export interface PhotoContainerProps {
    photo: Photo;
    grid?: boolean;
    selectable?: boolean;
    onSelect?: (s: boolean) => void;
    selected?: boolean;
    editable?: boolean;
}

export function PhotoContainer({
    photo,
    grid = false,
    selectable = false,
    onSelect = () => {},
    selected = false,
    editable = false,
}: PhotoContainerProps) {
    return (
        <div
            className={
                "mt-4 p-2 flex bg-white shadow" + (grid ? " flex-col" : "")
            }
        >
            <Thumbnail
                id={photo.id}
                selectable={selectable}
                onSelect={onSelect}
                selected={selected}
                className="flex-shrink-0"
            />
            <Properties
                photo={photo}
                className={
                    grid
                        ? "max-w-[180px]"
                        : "min-h-full ml-1 sm:ml-4 basis-[180px]"
                }
                editable={editable}
            />
        </div>
    );
}
