import { Injectable } from "@angular/core";
import { Story } from "../models/Story";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class StoryService {
    baseUrl = 'http://localhost:3000/books';

    private storiesSubject: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>([]);
    stories$: Observable<Story[]> = this.storiesSubject.asObservable();

    constructor(private http: HttpClient,
        private messageService: MessageService
    ) {
        this.loadStories();
    }

    loadStories() {
        console.log('Loading the stories...');
        this.http.get<Story[]>(this.baseUrl).subscribe(stories => {
            this.storiesSubject.next(stories);
        });
    }

    getStory(id: number): Observable<Story> {
        console.log('Getting story with id: ' + id);
        return this.storiesSubject.pipe(
            map(story => {
                const s = story.find(s => s.id == id);
                if (s === undefined) return {id: 0, title: '', author: ''}
                else return s
            })
        );
    }

    addStory(story: Story): Observable<Story> {
        console.log('Adding a new story with id: ' + story.id);
        return this.http.post<Story>(this.baseUrl, story).pipe(
            tap(() => {
                const updated = [story, ... this.storiesSubject.value];
                this.storiesSubject.next(updated);
                this.messageService.add({ severity: 'contrast', summary: 'Story Added', detail: `A new story is successfully added` });
            })
        );
    }

    updateStory(id: number, updatedStory: Story): Observable<Story> {
        return this.http.put<Story>(`${this.baseUrl}/${id}`, updatedStory).pipe(
            tap((serverStory) => {
                this.storiesSubject.next(
                    this.storiesSubject.value.map(story =>
                        story.id === serverStory.id
                            ? { ...serverStory }
                            : story
                    )
                );
                this.messageService.add({ severity: 'contrast', summary: 'Story Updated', detail: `Story with id ${id} is successfully updated` });
            })
        );
    }

    deleteStory(id: number): Observable<Object> {
        console.log('Deleting story with id ' + String(id) + '...');
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(
            tap(() => {
                const updated = this.storiesSubject.value.filter(b => b.id != id);
                this.storiesSubject.next(updated);
                console.log(this.storiesSubject.value);
                this.messageService.add({ severity: 'contrast', summary: 'Story Deleted', detail: `Story with id ${id} is successfully deleted` });
            })
        );
    }

    getNewId(): number {
        let maxValue: number = 0;

        this.storiesSubject.value.map((story) => story.id).forEach((id) => {
            if (maxValue < id) { maxValue = id }
        });

        return maxValue + 1;
    }
}