import { Photo } from "@/types";
import {
    Dispatch,
    DispatchWithoutAction,
    Fragment,
    useMemo,
    useState,
} from "react";
import { PhotoList } from "./PhotoList";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { Dialog, Transition } from "@headlessui/react";

function sortPhotos(selected: string[], photos?: Photo[]): Photo[] | undefined {
    if (!photos) {
        return undefined;
    }
    const exists: Photo[] = [];
    const notExists: Photo[] = [];
    photos.forEach((photo) => {
        if (selected.includes(photo.id)) {
            exists.push(photo);
        } else {
            notExists.push(photo);
        }
    });
    return exists.concat(notExists);
}

export interface PhotoSelectDialogProps {
    show: boolean;
    photos?: Photo[];
    onClose: DispatchWithoutAction;
    onSelect: Dispatch<string[]>;
    initialSelection?: string[];
}

export function PhotoSelectDialog({
    photos,
    show,
    onClose,
    onSelect,
    initialSelection = [],
}: PhotoSelectDialogProps) {
    const [selection, setSelection] = useState<string[]>(initialSelection);
    const [showContent, setShowContent] = useState(false);
    const sortedPhotos = useMemo(
        () => sortPhotos(initialSelection, photos),
        [photos, initialSelection]
    );
    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog open={show} onClose={onClose} className="fixed z-50">
                {/*  backdrop */}
                <Transition.Child
                    className="fixed inset-0 bg-black/30"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                />

                <Transition.Child
                    className="fixed inset-0 p-4"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 sm:scale-50"
                    enterTo="opacity-100 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 sm:scale-100"
                    leaveTo="opacity-0 sm:scale-50"
                    afterEnter={() => setShowContent(true)}
                    afterLeave={() => setShowContent(false)}
                >
                    <Dialog.Panel className="h-full p-4 bg-white shadow rounded-lg">
                        <div className="flex flex-col max-h-full">
                            <div className="bg-white p-4 flex overflow-hidden h-[66px] flex-shrink-0">
                                <span className="my-auto">
                                    Atzīmēti {selection.length} fotoattēli
                                </span>
                                <PrimaryButton
                                    onClick={() => onSelect(selection)}
                                    className="ml-2"
                                >
                                    Saglabāt
                                </PrimaryButton>
                                <SecondaryButton
                                    onClick={onClose}
                                    className="ml-2"
                                >
                                    Atcelt
                                </SecondaryButton>
                            </div>

                            <div className="overflow-y-auto">
                                {sortedPhotos && showContent && (
                                    <PhotoList
                                        photos={sortedPhotos}
                                        selectable
                                        grid
                                        onSelectionChange={(p) =>
                                            setSelection(p.map(({ id }) => id))
                                        }
                                        selected={initialSelection}
                                    />
                                )}
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
