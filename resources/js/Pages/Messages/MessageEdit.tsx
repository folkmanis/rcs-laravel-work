import { IconButton } from "@/Components/IconButton";
import { InputError } from "@/Components/InputError";
import { PhotoSelectDialog } from "@/Components/PhotoSelectDialog";
import { Thumbnail } from "@/Components/PhotosPartials/Thumbnail";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { TextArea } from "@/Components/TextArea";
import { Message, PageProps, Photo } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { Dispatch, FormEventHandler, HTMLAttributes, useState } from "react";

export interface MessageEditProps {
    message?: Message;
    onClose?: Dispatch<void>;
}

interface MessageForm {
    text: string;
    photos: string[];
}

export function MessageEdit({
    message,
    onClose = () => {},
    ...props
}: MessageEditProps & HTMLAttributes<HTMLDivElement>) {
    const [photoSelectorState, setPhotoSelectorState] = useState(false);
    const photos = usePage<PageProps<{ photos?: Photo[] }>>().props.photos;

    const { data, setData, patch, post, reset, errors, clearErrors, isDirty } =
        useForm<MessageForm>({
            text: message?.text || "",
            photos: message?.photos.map(({ id }) => id) || [],
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (message) {
            patch(
                route("messages.update", {
                    message: message.id,
                }),
                {
                    onSuccess: () => {
                        onClose();
                        reset();
                    },
                    preserveScroll: true,
                }
            );
        } else {
            post(route("messages.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const onOpenPhotoSelection = () => {
        router.reload({ only: ["photos"] });
        setPhotoSelectorState(true);
    };

    const onPhotosSelected = (selected: string[]) => {
        setPhotoSelectorState(false);
        setData("photos", selected);
    };

    return (
        <div {...props}>
            {data.photos.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                    {data.photos.map((photoId) => {
                        return <Thumbnail key={photoId} id={photoId} />;
                    })}
                </div>
            )}
            <form onSubmit={submit}>
                <TextArea
                    value={data.text}
                    onChange={(e) => setData("text", e.target.value)}
                    className="block w-full"
                />
                <InputError message={errors.text} className="mt-2" />
                <div className="mt-4 flex gap-2">
                    <PrimaryButton
                        disabled={isDirty === false || data.text.length === 0}
                    >
                        {message ? "Saglabāt" : "Nosūtīt"}
                    </PrimaryButton>
                    <IconButton type="button" onClick={onOpenPhotoSelection}>
                        image
                    </IconButton>
                    {message && (
                        <SecondaryButton
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                reset();
                                clearErrors();
                            }}
                        >
                            Atcelt
                        </SecondaryButton>
                    )}
                </div>
            </form>
            <PhotoSelectDialog
                show={photoSelectorState}
                onClose={() => setPhotoSelectorState(false)}
                onSelect={onPhotosSelected}
                photos={photos}
                initialSelection={data.photos}
            />
        </div>
    );
}
