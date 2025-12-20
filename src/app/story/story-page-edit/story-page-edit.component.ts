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

  get sections() {
    return this.formGroup.get('sections') as FormArray;
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
      sections: new FormArray([]),
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

    if (storyData.backgroundColor == undefined) {
      this.formGroup.get('backgroundColor')?.setValue('var(--p-violet-300)');
    } else {
      this.formGroup.get('backgroundColor')?.setValue(storyData.backgroundColor);
    }

    // Setting the sections
    const sectionsCount = storyData?.sections?.length ? storyData.sections?.length : 0;
    for (let sectionIndex = 0; sectionIndex < sectionsCount; sectionIndex++) {
      this.addSection(storyData.sections?.at(sectionIndex));
    }
  }

  editStory() {
    this.formGroup.controls['id'].setValue(this.id);
    console.log("The story was edited to: ", this.formGroup.value);
    
    if (this.storyService.storyExists(this.id)) {
      this.storyService.updateStory(this.id, this.formGroup.value).subscribe();
    } else {
      this.storyService.addStory(this.formGroup.value).subscribe();
    }
    
    this.result.emit('saved');
  }

  addSection(section?: Section) {
    console.log(section)
    if (section) {
      this.sections.push(new FormGroup({
        section_title: new FormControl(section.section_title),
        section_body: new FormControl(section.section_body)
      }));
    }
    else {
      this.sections.push(new FormGroup({
        section_title: new FormControl(''),
        section_body: new FormControl('')
      }));
    }
  }

  removeSection(index: number) {
    console.log("Removing section at index: " + index);
    console.log(this.sections.at(index).value);
    this.sections.removeAt(index);
    console.log(this.sections.value);
  }
}
