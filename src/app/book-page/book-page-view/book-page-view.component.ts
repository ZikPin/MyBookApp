import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-page-view',
  standalone: false,
  templateUrl: './book-page-view.component.html',
  styleUrl: './book-page-view.component.scss'
})
export class BookPageViewComponent {
  id: number;
  book$: Observable<Book>;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService
  ) {
    this.id = router.snapshot.params["id"];
    this.book$ = this.bookService.getBook(this.id);
    this.book$.subscribe( (data) => {
      console.log(data);
    });
  }

}
