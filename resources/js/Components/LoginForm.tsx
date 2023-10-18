import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";
import { PrimaryButton } from "./PrimaryButton";
import { TextInput } from "./TextInput";

export function LoginForm({ canResetPassword }: { canResetPassword: boolean }) {
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
        <>
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

                <div className="mt-4">
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

                <PrimaryButton className="mt-4 w-full" disabled={processing}>
                    Pieslēgties
                </PrimaryButton>
            </form>
        </>
    );
}
