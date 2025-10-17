import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-book-gallery',
  standalone: false,
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.scss'
})
export class BookGalleryComponent {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = this.bookService.books$;
    this.books$.pipe(
      map((data) => {
        if (!data) {
          return {};
        } else {
          return data;
        }
      })
    );
  }

}
