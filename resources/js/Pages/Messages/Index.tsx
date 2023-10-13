import { Paginator } from "@/Components/Paginator";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { LengthAwarePaginator } from "@/types/length-aware-paginator";
import { Message } from "@/types/message";
import { Head } from "@inertiajs/react";
import { MessageContainer } from "./MessageContainer";
import { NewMessage } from "./NewMessage";
import { ScrollToTop } from "@/Components/ScrollToTop";

export default function Index({
    auth,
    messages,
}: PageProps<{ messages: LengthAwarePaginator<Message> }>) {
    const { data, ...paginator } = messages;
    console.log(paginator);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ziņojumi" />
            <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                <NewMessage />
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
    );
}
