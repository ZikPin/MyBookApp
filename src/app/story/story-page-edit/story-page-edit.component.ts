import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story, Section } from '../../models/Story';
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
  addStoryDialogVisible: boolean = false;

  get text() {
    return this.formGroup.get('text') as FormArray;
  }

  get backgroundColor() {
    return this.formGroup.get('backgroundColor') as FormControl;
  }

  constructor(
    private router: ActivatedRoute,
    private storyService: StoryService
  ) {
    this.id = router.snapshot.params["id"];
    this.stories$ = this.storyService.getStory(this.id);

    this.formGroup = new FormGroup({
      id: new FormControl<number>(this.id),
      backgroundColor: new FormControl<string>(''),
      title: new FormControl<string>(''),
      author: new FormControl<string>(''),
      text: new FormArray([]),
    });


    this.loadStory();
  }

  loadStory() {
    this.subscriptions.push(this.stories$.subscribe((storyData) => {
      // Setting title, author and background color
      this.formGroup.get('title')?.setValue(storyData.title);
      this.formGroup.get('author')?.setValue(storyData.author);
      this.formGroup.get('backgroundColor')?.setValue(storyData.backgroundColor);

      // Setting the sections
      const sectionsCount = storyData?.text?.length ? storyData?.text?.length : 0;
      for (let sectionIndex = 0; sectionIndex < sectionsCount; sectionIndex++) {
        this.addSection(storyData.text?.at(sectionIndex));
      }
    })
    );
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  editStory() {
    this.formGroup.controls['id'].setValue(this.id);
    console.log("The story was edited to: ", this.formGroup.value);
    this.storyService.updateStory(this.id, this.formGroup.value).subscribe();
    this.addStoryDialogVisible = false;
  }

  addSection(section?: Section) {
    if (section) {
      this.text.push(new FormGroup({
        title: new FormControl(section.title),
        body: new FormControl(section.body)
      }));
    }
    else {
      this.text.push(new FormGroup({
        title: new FormControl(''),
        body: new FormControl('')
      }));
    }
  }

  removeSection(index: number) {
    console.log("Removing section at index: " + index);
    console.log(this.text.at(index).value);
    this.text.removeAt(index);
    console.log(this.text.value);
  }
}
