import { Photo } from "@/types";
import { ThumbnailCheckbox } from "./ThumbnailCheckbox";
import { useRef } from "react";
import { Ripple } from "../Ripple";

export type ThumbnailProps = Pick<Photo, "id"> & {
    className?: string;
    selectable?: boolean;
    onSelect?: (s: boolean) => void;
    selected?: boolean;
};

export function Thumbnail({
    id,
    className = "",
    selectable = false,
    onSelect = () => {},
    selected = false,
}: ThumbnailProps) {
    const backgroundImage = `url("/photos/${id}/thumbnail")`;
    const checkboxRef = useRef<HTMLInputElement>(null);
    return (
        <div
            className={
                "w-[180px] h-[120px] relative bg-gray-300 bg-cover bg-center " +
                className
            }
            style={{ backgroundImage }}
            onClick={(e) => {
                checkboxRef.current?.click();
                e.preventDefault();
            }}
        >
            {selectable ? (
                <>
                    <ThumbnailCheckbox
                        checked={selected}
                        onChange={(e) => onSelect(e.target.checked)}
                        ref={checkboxRef}
                    />
                    <Ripple />
                </>
            ) : null}
        </div>
    );
}
