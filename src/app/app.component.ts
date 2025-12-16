import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit{
  title = 'my-book-app';
  items: MenuItem[] = [];
  addStoryDialogVisible: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/home'
          },
          {
            label: 'Book Gallery',
            icon: 'pi pi-book',
            routerLink: '/book-gallery'
          },
          {
            label: 'About',
            icon: 'pi pi-info-circle',
            routerLink: '/about'
          }
        ]
      }
    ];
  }
}
