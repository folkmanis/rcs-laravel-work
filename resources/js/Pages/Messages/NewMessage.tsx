import { Thumbnail } from "@/Components/PhotosPartials/Thumbnail";
import { useState } from "react";
import { MessageEdit } from "./MessageEdit";

export function NewMessage() {
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const selectedPhotosThumbnails = selectedPhotos.map((photoId) => {
        return <Thumbnail key={photoId} id={photoId} />;
    });

    return (
        <>
            {selectedPhotosThumbnails.length > 0 && (
                <div className="my-4 flex flex-wrap gap-1">
                    {selectedPhotosThumbnails}
                </div>
            )}
            <MessageEdit onPhotoSelectionUpdate={setSelectedPhotos} />
        </>
    );
}
