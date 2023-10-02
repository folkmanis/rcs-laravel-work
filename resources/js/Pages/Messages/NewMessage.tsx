import { InputError } from "@/Components/InputError";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { TextArea } from "@/Components/TextArea";
import { Message } from "@/types/message";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export function NewMessage() {
    const { data, setData, post, reset, processing, errors } = useForm<
        Partial<Message>
    >({
        text: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("messages.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit}>
            <TextArea
                value={data.text}
                onChange={(e) => setData("text", e.target.value)}
                className="block w-full"
                isFocused
            ></TextArea>
            <InputError message={errors.text} className="mt-4" />
            <div className="mt-4">
                <PrimaryButton disabled={processing}>Nosūtīt</PrimaryButton>
            </div>
        </form>
    );
}
