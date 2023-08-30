import { useEffect, FormEventHandler } from "react";
import { Checkbox } from "@/Components/Checkbox";
import { GuestLayout } from "@/Layouts/GuestLayout";
import { InputError } from "@/Components/InputError";
import { InputLabel } from "@/Components/InputLabel";
import { PrimaryButton } from "@/Components/PrimaryButton";
import { TextInput } from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Pieslēgties" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Lietotājvārds" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => {
                            setData("username", e.target.value);
                        }}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Parole" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => {
                                setData("remember", e.target.checked);
                            }}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Atcerēties pieslēgumu
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                        >
                            Aizmirsta parole?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Pieslēgties
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
