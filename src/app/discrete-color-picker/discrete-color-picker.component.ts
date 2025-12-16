import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-discrete-color-picker',
  standalone: false,
  templateUrl: './discrete-color-picker.component.html'
})
export class DiscreteColorPickerComponent {
  @Input() colorNames!: string[];
  @Input() colorMaxValue!: number;
  @Input() colorMinValue!: number;

  @Input() formControl!: AbstractControl;

  values: number[];

  constructor() {
    this.colorNames = [
      "lime",
      "yellow",
      "indigo",
      "violet"
    ];
    this.colorMinValue = 100;
    this.colorMaxValue = 400;

    this.values = new Array((this.colorMaxValue - this.colorMinValue) / 100);

    if(this.formControl === undefined) {
      this.formControl = new FormControl<string>('');
    }
  }

  selectColor(color: string) {
    console.log('Background color is: ',color);
    this.formControl.setValue(color);
  }
}
