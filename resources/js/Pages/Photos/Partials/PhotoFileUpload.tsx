import { InputError } from "@/Components/InputError";
import { Thumbnail } from "@/Components/PhotosPartials/Thumbnail";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { useFilePicker } from "use-file-picker";
import {
    FileAmountLimitValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
} from "use-file-picker/validators";

export function PhotoFileUpload({ maxWidth }: { maxWidth: number }) {
    const { data, setData, post, reset, progress, errors, processing } =
        useForm<{ photo_files: File[] }>({
            photo_files: [],
        });

    const { openFilePicker, filesContent, clear } = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: true,
        onFilesSelected: (data) => setData("photo_files", data.plainFiles),
        validators: [
            new FileAmountLimitValidator({ max: 50 }),
            new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 }),
            new ImageDimensionsValidator({
                maxWidth,
            }),
        ],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("photos.store"), {
            onSuccess: () => {
                clear();
                reset();
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div className="flex gap-2">
                    <SecondaryButton onClick={openFilePicker}>
                        Izvēlēties
                    </SecondaryButton>
                    <span>
                        {filesContent.length === 1
                            ? filesContent[0].name
                            : `Izvēlēti ${filesContent.length} foto`}
                    </span>
                    <PrimaryButton
                        disabled={processing || !data.photo_files.length}
                        className="ml-auto"
                    >
                        Augšuplādēt
                    </PrimaryButton>
                </div>
                <InputError message={errors.photo_files} className="mt-4" />
                {filesContent.length > 0 && (
                    <div className="my-2 flex flex-wrap gap-1">
                        {filesContent.map((photo, idx) => {
                            return (
                                <Thumbnail
                                    key={idx}
                                    url={`url(${photo.content})`}
                                />
                            );
                        })}
                    </div>
                )}
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
