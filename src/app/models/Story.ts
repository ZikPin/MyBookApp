export interface Story {
    id: number;
    title: string;
    author: string;
    tags?: string[];
    backgroundColor?: string;
    sections?: Section[];
}

export interface Section {
    story_id?: number;
    section_title?: string;
    section_body?: string;
}