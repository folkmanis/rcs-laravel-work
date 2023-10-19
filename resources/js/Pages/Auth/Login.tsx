import { LoginForm } from "@/Components/LoginForm";
import { GuestLayout } from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Login({
    canResetPassword,
}: {
    canResetPassword: boolean;
}) {
    return (
        <GuestLayout>
            <Head title="Pieslēgties" />

            <LoginForm canResetPassword={canResetPassword} />
        </GuestLayout>
    );
}
