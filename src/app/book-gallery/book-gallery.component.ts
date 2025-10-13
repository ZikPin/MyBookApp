import { Component } from '@angular/core';
import { BookGalleryService } from './book-gallery.service';
import { Book } from '../models/Book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-gallery',
  standalone: false,
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.scss'
})
export class BookGalleryComponent {
  books$: Observable<Book[]>;
  books!: Book[];

  constructor(private bookService: BookGalleryService) {
    this.books$ = this.bookService.getBooks();
  }

  getBooks(): Book[] {
    this.books$.subscribe( (data) => {
      this.books = data;
    } )

    return this.books;
  }

}
