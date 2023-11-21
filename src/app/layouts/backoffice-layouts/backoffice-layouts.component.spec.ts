import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeLayoutsComponent } from './backoffice-layouts.component';

describe('BackofficeLayoutsComponent', () => {
  let component: BackofficeLayoutsComponent;
  let fixture: ComponentFixture<BackofficeLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackofficeLayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
