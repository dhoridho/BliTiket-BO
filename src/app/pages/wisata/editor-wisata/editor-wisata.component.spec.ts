import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWisataComponent } from './editor-wisata.component';

describe('EditorWisataComponent', () => {
  let component: EditorWisataComponent;
  let fixture: ComponentFixture<EditorWisataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorWisataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWisataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
