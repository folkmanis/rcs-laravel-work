import { InputError } from "@/Components/InputError";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { TextArea } from "@/Components/TextArea";
import { Photo } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export interface CaptionProps {
    photo: Photo;
    editable?: boolean;
}

export function Caption({
    photo: { caption, id },
    editable = false,
}: CaptionProps) {
    const {
        data,
        setData,
        patch,
        errors,
        reset,
        isDirty,
        clearErrors,
        setDefaults,
        processing,
    } = useForm({
        caption,
    });
    const [editing, setEditing] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("photos.update", id), {
            onSuccess: () => {
                setEditing(false);
                setDefaults(data);
            },
        });
    };

    const cancel = () => {
        setEditing(false);
        reset();
        clearErrors();
    };

    return (
        <div className="mt-1">
            {editing ? (
                <form className="px-px mb-1" onSubmit={submit}>
                    <TextArea
                        className="p-1 block w-full"
                        value={data.caption}
                        onChange={(e) => setData("caption", e.target.value)}
                        isFocused
                    />
                    <InputError message={errors.caption} className="mt-px" />
                    <div className="flex flex-wrap">
                        <PrimaryButton
                            className="mt-1 mr-2"
                            onClick={submit}
                            disabled={!isDirty || processing}
                        >
                            Saglabāt
                        </PrimaryButton>
                        <SecondaryButton
                            className="mt-1"
                            onClick={cancel}
                            disabled={processing}
                        >
                            Atcelt
                        </SecondaryButton>
                    </div>
                </form>
            ) : (
                <p
                    onClick={() => setEditing(editable)}
                    className={
                        "text-gray-500 " +
                        (caption && editable ? "" : "italic ") +
                        (editable ? "cursor-pointer hover:text-green-900 " : "")
                    }
                >
                    {caption || (editable ? "Paraksts" : "")}
                </p>
            )}
        </div>
    );
}
