import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteColorPickerComponent } from '../app/discrete-color-picker/discrete-color-picker.component';

describe('DiscreteColorPickerComponent', () => {
  let component: DiscreteColorPickerComponent;
  let fixture: ComponentFixture<DiscreteColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscreteColorPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
