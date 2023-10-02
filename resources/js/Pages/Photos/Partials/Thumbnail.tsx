import { Photo } from "@/types";
import { ThumbnailCheckbox } from "./ThumbnailCheckbox";

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

    return (
        <div
            className={
                "w-[180px] h-[120px] relative bg-gray-300 bg-cover bg-center " +
                className
            }
            style={{ backgroundImage }}
        >
            {selectable ? (
                <ThumbnailCheckbox
                    checked={selected}
                    onChange={(e) => onSelect(e.target.checked)}
                />
            ) : null}
        </div>
    );
}
