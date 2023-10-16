import { LengthAwarePaginator } from "@/types/length-aware-paginator";
import { router } from "@inertiajs/react";
import { ReactNode } from "react";
import { Dropdown } from "./Dropdown";
import { IconButton } from "./IconButton";
import { IconLink } from "./IconLink";
import { SecondaryButton } from "./SecondaryButton";

export type PaginatorProps = Omit<LengthAwarePaginator<any>, "data">;

export function Paginator(props: PaginatorProps) {
    const {
        first_page_url,
        last_page_url,
        prev_page_url,
        next_page_url,
        current_page,
        last_page,
    } = props;
    return (
        <div className={`inline-flex gap-1 items-center`}>
            <IconButton onClick={() => router.reload()}>refresh</IconButton>
            <PaginatorMenu {...props} />
            <IconLink
                href={first_page_url}
                disabled={current_page === 1}
                as="button"
            >
                first_page
            </IconLink>
            <IconLink
                href={prev_page_url || ""}
                disabled={prev_page_url == null}
                as="button"
            >
                navigate_before
            </IconLink>
            <IconLink
                href={next_page_url || ""}
                disabled={next_page_url == null}
                as="button"
            >
                navigate_next
            </IconLink>
            <IconLink
                href={last_page_url}
                disabled={current_page === last_page}
                as="button"
            >
                last_page
            </IconLink>
        </div>
    );
}

function PaginatorMenu({
    from,
    to,
    total,
    links,
    per_page,
    last_page,
}: PaginatorProps) {
    const menuItems: ReactNode[] = links.slice(1, -1).map((link, idx) => {
        const start = per_page * idx + 1;
        const end = start + per_page > total ? total : start + per_page - 1;
        return (
            <Dropdown.Link href={link.url} className="font-bold">
                {start}&hellip;{end}
            </Dropdown.Link>
        );
    });
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <SecondaryButton disabled={last_page <= 1}>
                    <span>
                        {from}&hellip;{to}
                    </span>
                    <span className="hidden sm:inline">&nbsp;no {total}</span>
                </SecondaryButton>
            </Dropdown.Trigger>
            <Dropdown.Content>{...menuItems}</Dropdown.Content>
        </Dropdown>
    );
}
