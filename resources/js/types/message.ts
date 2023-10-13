import { Comment } from "./comment";
import { MessageBase } from "./message-base";
import { Photo } from "./photo";

export type Message = MessageBase & {
    comments: Comment[];
    photos: Pick<Photo, "id">[];
};
