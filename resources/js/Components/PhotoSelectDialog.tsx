import { Photo } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import {
    Dispatch,
    DispatchWithoutAction,
    Fragment,
    useMemo,
    useState,
} from "react";
import { IconButton } from "./IconButton";
import { PhotoList } from "./PhotoList";

const sortSelectedPhotosFirst = (selected: string[], photos?: Photo[]) =>
    photos?.toSorted(
        (a, b) => +selected.includes(b.id) - +selected.includes(a.id)
    );

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
        () => sortSelectedPhotosFirst(initialSelection, photos),
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
                    className="fixed inset-0 p-0 sm:p-2 lg:p-4"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 sm:scale-50"
                    enterTo="opacity-100 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 sm:scale-100"
                    leaveTo="opacity-0 sm:scale-50"
                    afterEnter={() => setShowContent(true)}
                    afterLeave={() => setShowContent(false)}
                >
                    <Dialog.Panel className="h-full p-2 bg-white shadow lg:rounded-lg">
                        <div className="flex flex-col max-h-full">
                            <div className="bg-white py-2 flex overflow-hidden flex-shrink-0  border-gray-300 shadow">
                                {selection.length > 0 && (
                                    <span className="my-auto">
                                        Atzīmēti {selection.length}
                                    </span>
                                )}
                                <IconButton
                                    onClick={() => onSelect(selection)}
                                    className="ml-auto"
                                    primary
                                >
                                    check
                                </IconButton>
                                <IconButton onClick={onClose} className="ml-2">
                                    close
                                </IconButton>
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
