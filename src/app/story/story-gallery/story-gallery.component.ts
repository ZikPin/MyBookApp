import { Component } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/Story';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-story-gallery',
  standalone: false,
  templateUrl: './story-gallery.component.html'
})
export class StoryGalleryComponent {
  stories$: Observable<Story[]>;

  constructor(private storyService: StoryService) {
    this.stories$ = this.storyService.stories$;
  }
}