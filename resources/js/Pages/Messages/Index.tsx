import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm, Head } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { Message } from "@/types/message";
import { TextArea } from "@/Components/TextArea";
import { InputError } from "@/Components/InputError";
import { MessageContainer } from "./MessageContainer";

export default function Index({
    auth,
    messages,
}: PageProps<{ messages: Message[] }>) {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ziņojumi" />
            <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <TextArea
                        value={data.text}
                        onChange={(e) => setData("text", e.target.value)}
                        className="block w-full"
                        isFocused
                    ></TextArea>
                    <InputError message={errors.text} className="mt-4" />
                    <div className="mt-4">
                        <PrimaryButton disabled={processing}>
                            Nosūtīt
                        </PrimaryButton>
                    </div>
                </form>
                <div className="mt-6">
                    {messages.map((message) => {
                        return (
                            <MessageContainer
                                key={message.id}
                                message={message}
                            />
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
