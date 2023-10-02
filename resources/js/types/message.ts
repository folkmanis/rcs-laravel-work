import { User } from "./user";
import { Photo } from "./photo";
export interface Message {
    id: number;
    text: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
    photos: Pick<Photo, "id">[];
}
