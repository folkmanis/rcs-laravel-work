import { IconButton } from "@/Components/IconButton";
import { InputError } from "@/Components/InputError";
import { PhotoSelectDialog } from "@/Components/PhotoSelectDialog";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { TextArea } from "@/Components/TextArea";
import { Message, Photo } from "@/types";
import { MessageBase } from "@/types/message-base";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    FormEventHandler,
    HTMLAttributes,
    Dispatch,
    useState,
    useEffect,
} from "react";

export interface MessageEditProps {
    message?: MessageBase;
    onClose?: Dispatch<void>;
    page?: number;
    onPhotoSelectionUpdate: Dispatch<string[]>;
}

interface MessageForm {
    text: string;
    photos: string[];
}

export function MessageEdit({
    message,
    page,
    onClose = () => {},
    onPhotoSelectionUpdate,
    ...props
}: MessageEditProps & HTMLAttributes<HTMLDivElement>) {
    const [photoSelectorState, setPhotoSelectorState] = useState(false);
    const {
        props: { photos },
    } = usePage<{ messages: Message[]; photos?: Photo[] }>();

    const { data, setData, patch, post, reset, errors, clearErrors } =
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
                    page: page ?? "",
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

    useEffect(() => {
        onPhotoSelectionUpdate(data.photos);
    }, [data.photos]);

    return (
        <div {...props}>
            <form onSubmit={submit}>
                <TextArea
                    value={data.text}
                    onChange={(e) => setData("text", e.target.value)}
                    className="block w-full"
                />
                <InputError message={errors.text} className="mt-2" />
                <div className="mt-4 flex gap-2">
                    <PrimaryButton>
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
