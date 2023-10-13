import { User } from "./user";

export * from "./user";
export * from "./message";
export * from "./photo";
export * from "./comment";
export * from "./vote";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
