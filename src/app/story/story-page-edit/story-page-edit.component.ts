import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/Story';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-story-page-edit',
  standalone: false,
  templateUrl: './story-page-edit.component.html',
  styleUrl: './story-page-edit.component.scss'
})
export class StoryPageEditComponent implements OnDestroy {
  id: number;
  stories$: Observable<Story>;
  subscriptions: Subscription[] = [];
  formGroup: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private storyService: StoryService
  ) {
    this.id = router.snapshot.params["id"];
    this.stories$ = this.storyService.getStory(this.id);

    this.formGroup = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      backgroundColor: new FormControl(),
      text: new FormArray([]),
    });

    this.loadStory();
  }

  loadStory() {
    this.subscriptions.push(this.stories$.subscribe((storyData) => {
      this.formGroup.get('title')?.setValue(storyData.title);
      this.formGroup.get('author')?.setValue(storyData.author);
      this.formGroup.get('backgroundColor')?.setValue(storyData.backgroundColor);
    })
    );
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
