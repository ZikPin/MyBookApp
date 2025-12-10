import { Injectable } from "@angular/core";
import { Story } from "../models/Story";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class StoryService {
    baseUrl = 'http://localhost:3000/books';

    storiesSubject: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);
    stories$: Observable<Story[]> = this.storiesSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadStories();
    }

    loadStories() {
        this.http.get<Story[]>(this.baseUrl).subscribe(stories => {
            this.storiesSubject.next(stories);
        });
    }

    getStories(): Observable<Story[]> {
        return this.http.get<Story[]>(this.baseUrl);
    }

    getStory(id: number): Observable<Story> {
        return this.http.get<Story>(`${this.baseUrl}/${id}`)
    }

    addStory(story: Story): Observable<Story> {
        return this.http.post<Story>(this.baseUrl, story);
    }

    updateStory(id: number, story: Partial<Story>): Observable<Story> {
        return this.http.put<Story>(`${this.baseUrl}/${id}`, story);
    }

    deleteStory(id: number): Observable<Object> {
        console.log('Deleting story with id ' + String(id) + '...');
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(
            tap(() => {
                // Remove deleted book from the subject
                const updated = this.storiesSubject.value.filter(b => b.id !== id);
                this.storiesSubject.next(updated);
            })
        );
    }
}