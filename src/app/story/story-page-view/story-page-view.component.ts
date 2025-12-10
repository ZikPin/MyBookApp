import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/Story';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-page-view',
  standalone: false,
  templateUrl: './story-page-view.component.html',
  styleUrl: './story-page-view.component.scss'
})
export class StoryPageViewComponent {
  id: number;
  stories$: Observable<Story>;

  constructor(
    private router: ActivatedRoute,
    private storyService: StoryService
  ) {
    this.id = router.snapshot.params["id"];
    this.stories$ = this.storyService.getStory(this.id);
    this.stories$.subscribe( (data) => {
      console.log(data);
    });
  }

}
