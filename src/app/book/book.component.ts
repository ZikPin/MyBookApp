import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{
  bookTitle: string = 'Umwandlung';
  numberOfPages: number = 100;
  hideBooks: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.hideBooks = !this.hideBooks;
  }
}
