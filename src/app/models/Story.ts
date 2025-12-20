export interface Story {
    id: number;
    title: string;
    author: string;
    tags?: string[];
    backgroundColor?: string;
    sections?: Section[];
}

export interface Section {
    section_title: string;
    section_body: string;
}