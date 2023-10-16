import { MessagePhoto } from ".";
import { Comment } from "./comment";
import { MessageBase } from "./message-base";

export type Message = MessageBase & {
    comments: Comment[];
    photos: MessagePhoto[];
};
