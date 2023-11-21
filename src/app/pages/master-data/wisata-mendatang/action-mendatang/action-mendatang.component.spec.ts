import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMendatangComponent } from './action-mendatang.component';

describe('ActionMendatangComponent', () => {
  let component: ActionMendatangComponent;
  let fixture: ComponentFixture<ActionMendatangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionMendatangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMendatangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
