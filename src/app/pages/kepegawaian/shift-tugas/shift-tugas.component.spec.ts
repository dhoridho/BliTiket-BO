import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTugasComponent } from './shift-tugas.component';

describe('ShiftTugasComponent', () => {
  let component: ShiftTugasComponent;
  let fixture: ComponentFixture<ShiftTugasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftTugasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftTugasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
