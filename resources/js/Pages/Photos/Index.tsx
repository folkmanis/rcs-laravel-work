import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { PageProps, Photo } from "@/types";
import { Head } from "@inertiajs/react";
import { PhotoFileUpload } from "./PhotoFileUpload";
import PhotoList from "./PhotoList";

export default function Index({
    auth,
    photos,
}: PageProps<{ photos: Photo[] }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Foto galerija" />
            <div className="p-4 max-w-2xl mx-auto sm:p-6 lg:p-8">
                <PhotoFileUpload></PhotoFileUpload>
                <PhotoList photos={photos} className="mt-2" editable />
            </div>
        </AuthenticatedLayout>
    );
}