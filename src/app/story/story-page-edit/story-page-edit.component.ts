import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story, Section } from '../../models/Story';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-story-page-edit',
  standalone: false,
  templateUrl: './story-page-edit.component.html'
})
export class StoryPageEditComponent implements AfterViewInit {
  @Input({ required: true }) id!: number;
  @Output() result: EventEmitter<'saved' | 'canceled'> = new EventEmitter();
  
  storyData: Partial<Story> = {};
  formGroup: FormGroup;

  get text() {
    return this.formGroup.get('text') as FormArray;
  }

  get backgroundColor() {
    return this.formGroup.get('backgroundColor') as FormControl;
  }

  constructor(private storyService: StoryService) {
    this.formGroup = new FormGroup({
      id: new FormControl<number>(this.id),
      backgroundColor: new FormControl<string>(''),
      title: new FormControl<string>(''),
      author: new FormControl<string>(''),
      text: new FormArray([]),
    });
  }

  ngAfterViewInit(): void {
    if (this.id === undefined || this.id === -1) {
      console.warn('The id is undefined or is equal to -1');
      this.id = this.storyService.getNewId();
      this.storyData = {};
      this.loadStory(this.storyData);
    } else {
      console.log('Finding a story with id: ' + this.id);
      this.storyService.getStory(this.id).subscribe((storyData) => { 
        this.storyData = storyData;
        this.loadStory(this.storyData); 
      });
    }
  }

  loadStory(storyData: Partial<Story>) {
    // Setting title, author and background color
    this.formGroup.get('title')?.setValue(storyData.title);
    this.formGroup.get('author')?.setValue(storyData.author);
    this.formGroup.get('backgroundColor')?.setValue(storyData.backgroundColor);

    // Setting the sections
    const sectionsCount = storyData?.text?.length ? storyData.text?.length : 0;
    for (let sectionIndex = 0; sectionIndex < sectionsCount; sectionIndex++) {
      this.addSection(storyData.text?.at(sectionIndex));
    }
  }

  editStory() {
    this.formGroup.controls['id'].setValue(this.id);
    console.log("The story was edited to: ", this.formGroup.value);
    this.storyService.updateStory(this.id, this.formGroup.value).subscribe();
    this.result.emit('saved');
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
