import { Injectable } from "@angular/core";
import { Book } from "../models/Book";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class BookService {
    baseUrl = 'http://localhost:3000/books';

    booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
    books$: Observable<Book[]> = this.booksSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadBooks();
    }

    loadBooks() {
        this.http.get<Book[]>(this.baseUrl).subscribe(books => {
            this.booksSubject.next(books);
        });
    }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl);
    }

    getBook(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.baseUrl}/${id}`)
    }

    addBook(book: Book): Observable<Book> {
        return this.http.post<Book>(this.baseUrl, book);
    }

    updateBook(id: number, book: Partial<Book>): Observable<Book> {
        return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
    }

    deleteBook(id: number): Observable<Object> {
        console.log('Deleting book with id ' + String(id) + '...');
        return this.http.delete(`${this.baseUrl}/${id}`).pipe(
            tap(() => {
                // Remove deleted book from the subject
                const updated = this.booksSubject.value.filter(b => b.id !== id);
                this.booksSubject.next(updated);
            })
        );
    }
}