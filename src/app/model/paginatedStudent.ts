import { Student } from "./student";

export interface PaginatedStudent {
    content: Student[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number:number;
    numberOfElement: number;
    pageable: Pageable;
    sort: Sort;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: false;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}