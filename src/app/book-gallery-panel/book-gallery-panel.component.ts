import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-gallery-panel',
  standalone: false,
  templateUrl: './book-gallery-panel.component.html',
  styleUrl: './book-gallery-panel.component.scss'
})
export class BookGalleryPanelComponent {
  @Input({ required: true }) book!: Book;
  randomBackgroundColor: string = '';

  constructor() {
    this.randomBackgroundColor = this.randomBackground();
    console.log(this.randomBackgroundColor);
  }

  randomBackground(): string {
    let value: number = (Math.floor(Math.random() * 10) * 100 ) % 300 + 100;
    let baseColors: string[] = [
      "emerald",
      "green",
      "lime",
      "red",
      "orange",
      "amber",
      "yellow",
      "teal",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose"
    ]
    let color: string = baseColors[Math.floor(Math.random()*baseColors.length)]

    return `var(--p-${color}-${value})`;
  }

}
