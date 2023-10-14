import { useRef, useState, FormEventHandler } from "react";
import { DangerButton } from "@/Components/DangerButton";
import { InputError } from "@/Components/InputError";
import { InputLabel } from "@/Components/InputLabel";
import { Modal } from "@/Components/Modal";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { TextInput, TextInputHandle } from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export function DeleteUserForm({ className = "" }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<TextInputHandle>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => {
                reset();
            },
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Konta dzēšana
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Līdz ar konta dzēšanu tiks likvidēta visa ar to saistītā
                    informācija. Lūdzu saglabājiet pie sevis visus datus, kuri
                    nākotnē varētu būt noderīgi.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Dēst</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Konta dzēšana
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Līdz ar konta dzēšanu tiks likvidēta visa ar to saistītā
                        informācija. Lūdzu saglabājiet pie sevis visus datus,
                        kuri nākotnē varētu būt noderīgi.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Parole"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => {
                                setData("password", e.target.value);
                            }}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Parole"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Atcelt
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Dzēst kontu
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
