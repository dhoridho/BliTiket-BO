import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewAcaraComponent } from './image-preview-acara.component';

describe('ImagePreviewAcaraComponent', () => {
  let component: ImagePreviewAcaraComponent;
  let fixture: ComponentFixture<ImagePreviewAcaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePreviewAcaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewAcaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
