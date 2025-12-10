export interface Story {
    id: number;
    title: string;
    author: string;
    tags?: string[];
    backgroundColor?: string;
    text?: Section[];
}

export interface Section {
    title: string;
    body: string;
}