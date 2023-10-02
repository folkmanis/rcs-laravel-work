import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Message } from "@/types/message";
import { Head } from "@inertiajs/react";
import { MessageContainer } from "./MessageContainer";
import { NewMessage } from "./NewMessage";

export default function Index({
    auth,
    messages,
}: PageProps<{ messages: Message[] }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ziņojumi" />
            <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                <NewMessage />
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
