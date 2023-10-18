import { Link, Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { SecondaryButton } from "@/Components/SecondaryButton";
import { GuestLayout } from "@/Layouts/GuestLayout";
import { LoginForm } from "@/Components/LoginForm";

export type WelcomePageProps = {
    laravelVersion: string;
    phpVersion: string;
    canLogin: boolean;
    canRegister: boolean;
    canResetPassword: boolean;
};

export default function Welcome({
    canResetPassword,
}: PageProps<WelcomePageProps>) {
    return (
        <>
            <Head title="e." />
            <GuestLayout>
                <LoginForm canResetPassword={canResetPassword} />

                {canResetPassword && (
                    <div className="mt-4 text-center">
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                        >
                            Aizmirsta parole?
                        </Link>
                    </div>
                )}

                <SecondaryButton
                    onClick={() => router.get("register")}
                    className="mt-4 w-full"
                >
                    REĢISTRĒTIES
                </SecondaryButton>
            </GuestLayout>
        </>
    );
}
