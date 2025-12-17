import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/Story';
import { Observable } from 'rxjs';

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
    private storyService: StoryService
  ) {
    this.id = router.snapshot.params["id"];
    this.stories$ = this.storyService.getStory(this.id);
    this.stories$.subscribe( (data) => {
      console.log(data);
    });
  }

  deleteStory() {
    this.storyService.deleteStory(this.id).subscribe({
      next: () => {
        console.log('Story deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete story:', err);
      }
    });

    this.route.navigate(['/book-gallery']);
  }
}
