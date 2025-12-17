import { Component, Input } from '@angular/core';
import { Story } from '../../models/Story';
import { StoryService } from '../../services/story.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StoryPageEditComponent } from '../story-page-edit/story-page-edit.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-story-gallery-panel',
  standalone: false,
  templateUrl: './story-gallery-panel.component.html',
  styleUrl: './story-gallery-panel.component.scss'
})
export class StoryGalleryPanelComponent {
  @Input({ required: true }) story!: Story;

  constructor(
    private storyService: StoryService,
    private dialogService: DialogService
  ) {
  }

  editStory() {
    console.log('Opening a dialogue for Story with id: ' + this.story?.id);
    const ref = this.dialogService.open(StoryPageEditComponent, {
      header: 'Edit the Story',
      width: '50vw',
      modal: true,
      closable: true,
      inputValues: {
        id: this.story?.id
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

  deleteStory() {
    this.storyService.deleteStory(this.story.id).subscribe();
  }
}
