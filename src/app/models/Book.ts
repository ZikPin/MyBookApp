export interface Book {
    id: number;
    title: string;
    author: string;
    isbn?: string;
    pages?: number;
    rating?: number;
}