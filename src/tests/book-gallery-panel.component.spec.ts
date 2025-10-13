import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookGalleryPanelComponent } from './book-gallery-panel.component';

describe('BookGalleryPanelComponent', () => {
  let component: BookGalleryPanelComponent;
  let fixture: ComponentFixture<BookGalleryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookGalleryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookGalleryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
