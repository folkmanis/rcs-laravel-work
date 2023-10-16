import { User } from "./user";

export interface Photo {
    id: string;
    name: string;
    extension: string;
    caption: string;
    height: number;
    width: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

export type MessagePhoto = Photo & {
    url: string;
    thumbnail_url: string;
};
