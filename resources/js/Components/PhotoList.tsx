import { Photo } from "@/types";
import { PhotoContainer } from "./PhotosPartials/PhotoContainer";
import { useState, useEffect } from "react";

export interface PhotoListProps {
    photos: Photo[];
    grid?: boolean;
    className?: string;
    selectable?: boolean;
    editable?: boolean;
    selected?: string[]; // initial selection
    onSelectionChange?: (selection: Photo[]) => void;
}

export function PhotoList({
    photos,
    grid = false,
    className = "",
    selectable = false,
    editable = false,
    onSelectionChange = () => {},
    selected = [],
}: PhotoListProps) {
    const [selection, setSelection] = useState<string[]>(selected);

    useEffect(() => {
        const filtered = selection.filter((id) =>
            photos.some((photo) => photo.id === id)
        );
        if (filtered.length !== selection.length) {
            setSelection(filtered);
        }
    }, [photos]);

    useEffect(() => {
        selectable &&
            onSelectionChange(photos.filter((p) => selection.includes(p.id)));
    }, [selection, selectable, photos]);

    const photoSelectionChange = (id: string, state: boolean) => {
        const idx = selection.indexOf(id);
        if (idx === -1 && state === true) {
            setSelection([...selection, id]);
        }
        if (idx > -1 && state === false) {
            setSelection(selection.filter((s) => s !== id));
        }
    };

    const containers = photos.map((photo) => (
        <PhotoContainer
            key={photo.id}
            grid={grid}
            photo={photo}
            selectable={selectable}
            onSelect={(s) => photoSelectionChange(photo.id, s)}
            selected={selection.includes(photo.id)}
            editable={editable}
        />
    ));
    return (
        <div
            className={
                className + (grid ? " flex flex-wrap gap-1 justify-center" : "")
            }
        >
            {containers}
        </div>
    );
}
