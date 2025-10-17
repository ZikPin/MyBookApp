export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    pages?: number;
    rating?: number;
    backgroundColor?: string;
    info?: Section[];
}

export interface Section {
    title: string;
    body: string;
}