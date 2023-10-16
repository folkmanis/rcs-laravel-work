import { Paginator } from "@/Components/Paginator";
import { ScrollToTop } from "@/Components/ScrollToTop";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { LengthAwarePaginator, Message, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { MessageContainer } from "./MessageContainer";
import { MessageEdit } from "./MessageEdit";

export type MessageIndexProps = {
    messages: LengthAwarePaginator<Message>;
};

export default function Index({
    auth,
    messages,
}: PageProps<MessageIndexProps>) {
    const { data, ...paginator } = messages;

    return (
        <>
            <Head title="Ziņojumi" />
            <AuthenticatedLayout user={auth.user}>
                <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                    <MessageEdit />

                    <div className="mt-6">
                        <div className="text-right">
                            <Paginator {...paginator}></Paginator>
                        </div>
                        {data.map((message) => {
                            return (
                                <MessageContainer
                                    key={message.id}
                                    message={message}
                                />
                            );
                        })}
                        <div className="mt-4 text-right">
                            <Paginator {...paginator}></Paginator>
                        </div>

                        <ScrollToTop />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
