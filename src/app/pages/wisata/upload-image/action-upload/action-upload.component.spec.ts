import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUploadComponent } from './action-upload.component';

describe('ActionUploadComponent', () => {
  let component: ActionUploadComponent;
  let fixture: ComponentFixture<ActionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
