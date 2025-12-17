import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { StoryPageEditComponent } from './story/story-page-edit/story-page-edit.component';
import { take } from 'rxjs';

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

  constructor(private dialogService: DialogService) {
  }

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

  addStory() {
      console.log('Opening a dialogue for a new Story');

      const ref = this.dialogService.open(StoryPageEditComponent, {
        header: 'Adding new Story',
        width: '50vw',
        modal: true,
        closable: true,
        inputValues: {
          id: -1
        }
      });
  
      ref?.onChildComponentLoaded
        .subscribe((instance: StoryPageEditComponent) => {
          instance.result
            .pipe(take(1))
            .subscribe(result => {
              ref.close(result);
            });
        });
    }
}
