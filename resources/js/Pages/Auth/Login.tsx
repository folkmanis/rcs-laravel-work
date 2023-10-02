import { LoginForm } from "@/Components/LoginForm";
import { GuestLayout } from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    return (
        <GuestLayout>
            <Head title="Pieslēgties" />

            <LoginForm canResetPassword={canResetPassword} status={status} />
        </GuestLayout>
    );
}
