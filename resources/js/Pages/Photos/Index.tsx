import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { PageProps, Photo } from "@/types";
import { Head } from "@inertiajs/react";
import { PhotoFileUpload } from "./Partials/PhotoFileUpload";
import { PhotoList } from "@/Components/PhotoList";
import { ScrollToTop } from "@/Components/ScrollToTop";

export default function Index({
    auth,
    photos,
}: PageProps<{ photos: Photo[] }>) {
    return (
        <>
            <Head title="Fotogalerija" />
            <AuthenticatedLayout user={auth.user}>
                <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8 pb-16">
                    <PhotoFileUpload></PhotoFileUpload>
                    <PhotoList photos={photos} className="mt-2" editable />
                </div>
                <ScrollToTop />
            </AuthenticatedLayout>
        </>
    );
}
