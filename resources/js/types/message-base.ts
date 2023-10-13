import { User } from "./user";
import { Vote } from "./vote";

export interface MessageBase {
    id: number;
    text: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: Pick<User, "id" | "name">;
    votes_sum_votablesrating: string | null;
    votes: Vote[];
}
