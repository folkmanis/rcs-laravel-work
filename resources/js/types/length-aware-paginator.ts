export interface LengthAwarePaginatorLink {
    active: boolean;
    label: string;
    url: string;
}

export interface LengthAwarePaginator<T> {
    data: T[];
    from: number;
    to: number;
    path: string;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: LengthAwarePaginatorLink[];
}
