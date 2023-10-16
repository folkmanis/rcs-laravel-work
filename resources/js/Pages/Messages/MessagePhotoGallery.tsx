import { MessagePhoto } from "@/types";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "/resources/css/image-gallery.scss";

export interface MessagePhotoGalleryProps {
    messagePhotos?: MessagePhoto[];
}

export function MessagePhotoGallery({
    messagePhotos,
}: MessagePhotoGalleryProps) {
    const images: ReactImageGalleryItem[] =
        messagePhotos?.map((photo) => ({
            original: photo.url,
            thumbnail: photo.thumbnail_url,
            originalHeight: photo.height,
            originalWidth: photo.width,
            description: photo.caption,
        })) ?? [];

    return <ReactImageGallery items={images} />;
}
