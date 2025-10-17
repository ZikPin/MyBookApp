import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-gallery-panel',
  standalone: false,
  templateUrl: './book-gallery-panel.component.html',
  styleUrl: './book-gallery-panel.component.scss'
})
export class BookGalleryPanelComponent {
  @Input({ required: true }) book!: Book;

  constructor(private bookService: BookService) {
  }

  deleteBook() {
    console.log('Deleted book with id' + String(this.book.id));
    console.log(this.book);
    this.bookService.deleteBook(this.book.id).subscribe({
      next: () => {
        console.log('Book deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
      }
    });
  }
}
