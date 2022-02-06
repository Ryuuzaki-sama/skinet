import { IProduit } from "./Product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduit[];
}