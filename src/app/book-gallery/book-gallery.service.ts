import { Injectable } from "@angular/core";
import { Book } from "../models/Book";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class BookGalleryService {
    baseUrl = 'http://localhost:3000/books'

    constructor(private http: HttpClient) {
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

    deleteBook(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}