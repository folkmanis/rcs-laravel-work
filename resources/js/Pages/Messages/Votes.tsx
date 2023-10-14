import { IconButton } from "@/Components/IconButton";
import { PageProps } from "@/types";
import { Vote } from "@/types/vote";
import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

export interface VotesProps {
    votesSum: number;
    actionRoute: string;
    votes: Vote[];
}

export function Votes({ votes, votesSum, actionRoute }: VotesProps) {
    const userId = usePage<PageProps>().props.auth.user.id;
    const lastVoteRating = useMemo(
        () => votes.filter((vote) => vote.user_id === userId)[0]?.rating ?? 0,
        [userId, votes]
    );
    const [busy, setBusy] = useState(false);

    const updateVote = (buttonValue: number) => {
        setBusy(true);
        router.post(
            actionRoute,
            { rating: lastVoteRating === buttonValue ? 0 : buttonValue },
            {
                preserveScroll: true,
                onFinish: () => setBusy(false),
            }
        );
    };

    return (
        <div className="inline-flex gap-1 items-center">
            <IconButton
                filled={lastVoteRating === 1}
                mini
                onClick={() => updateVote(1)}
                disabled={busy}
            >
                thumb_up
            </IconButton>
            <IconButton
                filled={lastVoteRating === -1}
                mini
                onClick={() => updateVote(-1)}
                disabled={busy}
            >
                thumb_down
            </IconButton>
            <span
                className={
                    "transition duration-300 " + (busy ? "opacity-0 " : "")
                }
            >
                {votesSum}
            </span>
        </div>
    );
}
