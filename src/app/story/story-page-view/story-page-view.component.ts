import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/Story';
import { map, Observable, of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { StoryPageEditComponent } from '../story-page-edit/story-page-edit.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-story-page-view',
  standalone: false,
  templateUrl: './story-page-view.component.html'
})
export class StoryPageViewComponent {
  id: number;
  stories$: Observable<Story>;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private storyService: StoryService,
    private dialogService: DialogService
  ) {
    this.id = router.snapshot.params["id"];
    this.stories$ = this.storyService.getStory(this.id);
  }

  deleteStory() {
    this.storyService.deleteStory(this.id).subscribe(() => this.route.navigate(['/book-gallery']));
  }

  editStory() {
    console.log('Opening a dialogue for Story with id: ' + this.id);
    const ref = this.dialogService.open(StoryPageEditComponent, {
      header: 'Edit the Story',
      width: '50vw',
      modal: true,
      closable: true,
      inputValues: {
        id: this.id
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
