import { Component, Input } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-gallery-panel',
  standalone: false,
  templateUrl: './book-gallery-panel.component.html',
  styleUrl: './book-gallery-panel.component.scss'
})
export class BookGalleryPanelComponent {
  @Input({required: true}) book!: Book;

  constructor() {
  }

}
