import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPendapatanComponent } from './action-pendapatan.component';

describe('ActionPendapatanComponent', () => {
  let component: ActionPendapatanComponent;
  let fixture: ComponentFixture<ActionPendapatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPendapatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPendapatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
