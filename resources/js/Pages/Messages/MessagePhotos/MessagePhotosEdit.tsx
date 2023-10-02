import { PrimaryButton } from "@/Components/PrimaryButton";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PhotoList from "@/Pages/Photos/PhotoList";
import { Message, PageProps, Photo } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function MessagePhotosEdit({
    auth,
    message,
    photos,
}: PageProps<{ message: Message; photos: Photo[] }>) {
    const initialSelection = message.photos.map((p) => p.id);
    const [selection, setSelection] = useState<string[]>(initialSelection);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                <div>{message.text}</div>
                <div className="mt-4 shadow bg-white p-4 flex overflow-hidden">
                    <span className="my-auto">
                        Atzīmēti {selection.length} fotoattēli
                    </span>
                    <PrimaryButton
                        onClick={() => {
                            router.patch(
                                route("messages.photo.update", message.id),
                                { photos: selection }
                            );
                        }}
                        className="ml-2"
                    >
                        Saglabāt
                    </PrimaryButton>
                </div>

                <div>
                    <PhotoList
                        photos={photos}
                        grid
                        selectable
                        onSelectionChange={(photos) =>
                            setSelection(photos.map((p) => p.id))
                        }
                        selected={initialSelection}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
