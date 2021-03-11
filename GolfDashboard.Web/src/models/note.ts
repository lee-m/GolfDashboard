import { Tag } from "./tag";

export interface Note {
    title: string;
    content: string;
    tags: Tag[];
}