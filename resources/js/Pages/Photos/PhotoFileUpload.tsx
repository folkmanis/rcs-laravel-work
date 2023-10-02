import { InputError } from "@/Components/InputError";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { TextInput, TextInputHandle } from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export function PhotoFileUpload() {
    const { data, setData, post, reset, progress, errors, processing } =
        useForm<{
            photo_files: FileList | "";
        }>({
            photo_files: "",
        });

    const fileInputRef = useRef<TextInputHandle>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("photos.store"), {
            onSuccess: () => {
                reset();
                fileInputRef.current?.reset();
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div className="flex">
                    <TextInput
                        className="flex-1"
                        type="file"
                        name="photo_file"
                        id="photo_file"
                        disabled={processing}
                        ref={fileInputRef}
                        multiple
                        onChange={(e) =>
                            setData("photo_files", e.target.files || "")
                        }
                    />
                    <PrimaryButton
                        disabled={processing || !data.photo_files}
                        className="ml-2"
                    >
                        Augšuplādēt
                    </PrimaryButton>
                </div>
                <InputError message={errors.photo_files} className="mt-4" />
            </form>
            <div>
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
            </div>
        </div>
    );
}
