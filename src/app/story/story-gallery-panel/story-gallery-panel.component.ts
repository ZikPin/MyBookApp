import { Component, Input } from '@angular/core';
import { Story } from '../../models/Story';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-gallery-panel',
  standalone: false,
  templateUrl: './story-gallery-panel.component.html',
  styleUrl: './story-gallery-panel.component.scss'
})
export class StoryGalleryPanelComponent {
  @Input({ required: true }) story!: Story;

  constructor(private storyService: StoryService) {
  }

  deleteStory() {
    console.log('Deleted book with id' + String(this.story.id));
    console.log(this.story);
    this.storyService.deleteStory(this.story.id).subscribe({
      next: () => {
        console.log('Story deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete story:', err);
      }
    });
  }
}
