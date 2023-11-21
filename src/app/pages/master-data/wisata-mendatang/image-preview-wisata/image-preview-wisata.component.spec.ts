import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewWisataComponent } from './image-preview-wisata.component';

describe('ImagePreviewWisataComponent', () => {
  let component: ImagePreviewWisataComponent;
  let fixture: ComponentFixture<ImagePreviewWisataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePreviewWisataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
