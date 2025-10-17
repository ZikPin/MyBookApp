import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageViewComponent } from './book-page-view.component';

describe('BookPageViewComponent', () => {
  let component: BookPageViewComponent;
  let fixture: ComponentFixture<BookPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookPageViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
