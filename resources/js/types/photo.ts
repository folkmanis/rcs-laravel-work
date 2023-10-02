import { User } from "./user";

export interface Photo {
    name: string;
    extension: string;
    id: string;
    caption: string;
    height: number;
    width: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}
