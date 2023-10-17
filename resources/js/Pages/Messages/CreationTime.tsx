import dayjs, { Dayjs } from "dayjs";

export interface CreationTimeProps {
    createdAt: string;
    updatedAt: string;
}

function coerceToNow(date: string, now = new Date()): Dayjs {
    let day = dayjs(date);
    return day.isAfter(now) ? dayjs(now) : day;
}

export function CreationTime({ createdAt, updatedAt }: CreationTimeProps) {
    const now = new Date();
    let created = coerceToNow(createdAt, now);
    let updated = coerceToNow(updatedAt, now);
    return (
        <span className="ml-2 text-xs italic">
            {created.isSame(updatedAt)
                ? created.fromNow()
                : "labots " + updated.from(now)}
        </span>
    );
}
